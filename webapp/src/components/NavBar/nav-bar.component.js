import React, { useEffect, useState, Fragment } from "react";
import { Navigation, Toolbar, HamburgerButton, MobileNavigation } from "./children";
import { NavLogo } from "./nav-bar.style";

type Props = {
  t: Function,
  navigation: Array<Object>,
  toolbar: Array<React.Node>,
  sticky?: boolean
};

const NavBar = (props: Props) => {
  const { navigation, toolbar, sticky, t } = props;
  const [isOpenMobile, setOpenMobile] = useState(false);
  const [profileOptions, setProfileOption] = useState([]);
  const componentElement = React.createRef();

  const setNavFixed = () => {
    if (componentElement) {
      const navHeight = componentElement.clientHeight;
      const content = document.getElementsByClassName("contentApp");
      if (content.length > 0) {
        content[0].style["padding-top"] = `${navHeight}px`;
      }
    }
  };

  const onComponentResize = () => {
    setNavFixed();
    window.addEventListener("resize", () => {
      setNavFixed();

      if (window.innerWidth >= 1024 && isOpenMobile) {
        setOpenMobile(false);
      }
    });
  };

  const getUserProfileOptions = () => {
    const profile = toolbar ? toolbar.filter((bar) => bar.id !== "language") : [];
    setProfileOption(profile);
  };

  useEffect(() => {
    if (sticky) {
      onComponentResize();
    }

    getUserProfileOptions();
  }, [props, isOpenMobile]);

  const toggleMobileMenu = () => {
    setOpenMobile(!isOpenMobile);
  };

  //<img src="/img/radarin.png" alt="inrupt" />
  return (
    <header role="navigation" className="header header__desktop fixed" ref={componentElement}>
      <section className="header-wrap">
        <div className="logo-block">
        <NavLogo data-testid="nav-bar-logo">
          <img src="/img/radarin.png" className="logo-img" alt="inrupt" width="auto" />
        </NavLogo>
        </div>

        {isOpenMobile ? (
          <MobileNavigation
            navigation={navigation}
            toolbar={toolbar}
            isOpenMobile={isOpenMobile}
            toggleMobileMenu={toggleMobileMenu}
            t={t}
          >
            <Navigation navigation={navigation} />
            <Toolbar toolbar={profileOptions} open customClass="profile-list" />
          </MobileNavigation>
        ) : (
          <Fragment>
            {navigation && <Navigation navigation={navigation} />}
            {toolbar && <Toolbar toolbar={toolbar} />}
          </Fragment>
        )}
        <HamburgerButton toggleMobileMenu={toggleMobileMenu} />
      </section>
    </header>
  );
};

NavBar.defaultProps = {
  sticky: true
};

export default NavBar;
