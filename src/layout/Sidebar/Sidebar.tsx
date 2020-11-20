import React, { Fragment } from "react";
import { observer, useObserver } from "mobx-react";

import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { HeaderLogo } from "../Logo/Logo";
import PerfectScrollbar from "react-perfect-scrollbar";
import cx from "classnames";
import { useThemeStore } from "../../stores/ThemeStore";

const useStoreData = () => {
  const { themeStore } = useThemeStore();
  return useObserver(() => ({
    enableBackgroundImage: themeStore.enableBackgroundImage,
    enableSidebarShadow: themeStore.enableSidebarShadow,
    enableMobileMenu: themeStore.enableMobileMenu,
    backgroundColor: themeStore.backgroundColor,
    backgroundImage: themeStore.backgroundImage,
    backgroundImageOpacity: themeStore.backgroundImageOpacity,
    toggleMobileSidebar: themeStore.toggleMobileSidebar,
  }));
};

export const AppSidebar = observer(() => {
  const {
    backgroundColor,
    enableSidebarShadow,
    toggleMobileSidebar,
  } = useStoreData();

  return (
    <Fragment>
      <div className="sidebar-mobile-overlay" onClick={toggleMobileSidebar} />
      <CSSTransitionGroup
        component="div"
        className={cx("app-sidebar", backgroundColor, {
          "sidebar-shadow": enableSidebarShadow,
        })}
        transitionName="SidebarAnimation"
        transitionAppear={true}
        transitionAppearTimeout={1500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <HeaderLogo />
        <PerfectScrollbar>
          <div className="app-sidebar__inner"></div>
        </PerfectScrollbar>
      </CSSTransitionGroup>
    </Fragment>
  );
});
