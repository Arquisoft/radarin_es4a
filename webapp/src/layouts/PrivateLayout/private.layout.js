import React, { useEffect/*, useState */} from "react";
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

var admin = "https://uo271397.inrupt.net/profile/card#me";
const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000/api";
//axios.get( apiEndPoint + "/admin").then((res) => { admin = res.data.webid; });



const PrivateLayout = ({ routes, webId, location, history, ...rest }) => {
  const { t } = useTranslation();
  const errorMessages = {
    message: t("appPermission.message"),
    title: t("notifications.error"),
    label: t("appPermission.link.label"),
    href: t("appPermission.link.href")
  };

  var ban = null;
  axios.get( apiEndPoint + "/isBanned", {webid : webId}).then((res) => { ban = res.data; });

  useEffect(() => {
    if (webId) {
      permissionHelper.checkPermissions(webId, errorMessages);
    }
  }, [webId]);
  
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
  ) : (ban === null)? (
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
              </Switch>
            </Content>
          )}
        />
        <Footer />
      </Container>
    </React.Fragment>
  ): <Redirect to="/403" />;
};

export default withAuthorization(PrivateLayout);
