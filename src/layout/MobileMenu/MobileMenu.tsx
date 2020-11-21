import React, { Fragment, useState } from "react";
import { observer, useObserver } from "mobx-react";

import { Slider } from "react-burgers";
import { UserBox } from "../Header/Components/UserBox";
import { useThemeStore } from "../../stores/ThemeStore";

const useThemeData = () => {
  const { themeStore } = useThemeStore();

  return useObserver(() => ({
    toggleMobileSmall: themeStore.toggleMobileSmall,
    toggleMobileSidebar: themeStore.toggleMobileSidebar,
  }));
};

export const AppMobileMenu = observer(() => {
  const { toggleMobileSidebar, toggleMobileSmall } = useThemeData();
  const [isActive, setIsActive] = useState(false);

  return (
    <Fragment>
      <div className="app-header__mobile-menu">
        <div onClick={toggleMobileSidebar}>
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
      <div className="app-header__menu">
        <span onClick={toggleMobileSmall}>
          <UserBox />
        </span>
      </div>
    </Fragment>
  );
});
