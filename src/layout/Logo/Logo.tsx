import React, { Fragment, useState } from "react";
import { observer, useObserver } from "mobx-react";

import { AppMobileMenu } from "../MobileMenu/MobileMenu";
import { Slider } from "react-burgers";
import { useThemeStore } from "../../stores/ThemeStore";

const useThemeData = () => {
  const { themeStore } = useThemeStore();

  return useObserver(() => ({
    enableClosedSidebar: themeStore.enableClosedSidebar,
    enableMobileMenu: themeStore.enableMobileMenu,
    enableMobileMenuSmall: themeStore.enableMobileMenuSmall,
    toggleDrawer: themeStore.toggleDrawer,
  }));
};

export const HeaderLogo = observer(() => {
  const { toggleDrawer } = useThemeData();
  const [isActive, setIsActive] = useState(false);

  return (
    <Fragment>
      <div className="app-header__logo">
        <div className="logo-src" />
        <div className="header__pane ml-auto">
          <div onClick={toggleDrawer}>
            <Slider
              width={26}
              lineHeight={2}
              lineSpacing={5}
              color="#6c757d"
              active={isActive}
              onClick={() => setIsActive(!isActive)}
            />
          </div>
        </div>
      </div>
      <AppMobileMenu />
    </Fragment>
  );
});
