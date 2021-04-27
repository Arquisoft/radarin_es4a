import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { withAuthorization } from "@inrupt/solid-react-components";
import { AuthNavBar, Footer } from "@components";
import { permissionHelper } from "@utils";
import styled from "styled-components";
import axios from "axios"; 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
`;

const Content = styled.div`
  padding-top: 60px;
  flex: 1 0 auto;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
`;

const admin = "https://alvarofuente.inrupt.net/profile/card#me";

// var admin = undefined;

const PrivateLayout = ({ routes, webId, location, history, ...rest }) => {
  const { t } = useTranslation();
  const errorMessages = {
    message: t("appPermission.message"),
    title: t("notifications.error"),
    label: t("appPermission.link.label"),
    href: t("appPermission.link.href")
  };

  //const [admin, setAdmin] = useState( {} );

  /*
  function getAdmin() {
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    axios.get( apiEndPoint + "/admin").then((res) => { 
      admin = res.data.webid;
      //setAdmin(res.data.webid); 
      console.log(admin)});
  }  
  */

  useEffect(() => {
    // getAdmin();
    if (webId) {
      permissionHelper.checkPermissions(webId, errorMessages);
    }
  }, [webId]);
  
  //console.log("Justo antes del if que saca o no la vista admin\t" + admin);
  
  return (webId === admin)? (
    <React.Fragment>
      <Container>
        <Route
          {...rest}
          component={({ history }) => (
            <Content className="contentApp">
              <AuthNavBar {...{ location, webId, history }} />
              <Switch>
                {routes.map((route) => {
                  const { component: RouteComponent } = route;
                  if (route.id === "adminView") {
                    return (
                      <Route
                        key={route.id}
                        path={route.path}
                        render={(routerProps) => <RouteComponent {...routerProps} webId={webId} />}
                        webId={webId}
                        exact
                      />
                    );
                  }
                  else 
                    return null;
                })}
                <Redirect to="/adminView" />
              </Switch>
            </Content>
          )}
        />
        <Footer />
      </Container>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Container>
        <Route
          {...rest}
          component={({ history }) => (
            <Content className="contentApp">
              <AuthNavBar {...{ location, webId, history }} />
              <Switch>
                {routes.map((route) => {
                  const { component: RouteComponent } = route;
                  if (route.id !== "adminView") {
                    return (
                      <Route
                        key={route.id}
                        path={route.path}
                        render={(routerProps) => <RouteComponent {...routerProps} webId={webId} />}
                        webId={webId}
                        exact
                      />
                    );
                  }
                  else
                    return null;
                })}
                <Redirect to="/404" />
              </Switch>
            </Content>
          )}
        />
        <Footer />
      </Container>
    </React.Fragment>
  );
};

export default withAuthorization(PrivateLayout);
