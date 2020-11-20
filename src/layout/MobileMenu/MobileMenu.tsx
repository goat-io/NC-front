import React, { Fragment, useState } from "react";
import { observer, useObserver } from "mobx-react";

import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Slider } from "react-burgers";
import cx from "classnames";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useThemeStore } from "../../stores/ThemeStore";

const useThemeData = () => {
  const { themeStore } = useThemeStore();

  return useObserver(() => ({
    toggleSecondaryMenuMobile: themeStore.toggleSecondaryMenuMobile,
    activeSecondaryMenuMobile: themeStore.activeSecondaryMenuMobile,
    toggleMobileSmall: themeStore.toggleMobileSmall,
    toggleMobileSidebar: themeStore.toggleMobileSidebar,
  }));
};

export const AppMobileMenu = observer(() => {
  const {
    toggleMobileSidebar,
    toggleMobileSmall,
    activeSecondaryMenuMobile,
    toggleSecondaryMenuMobile,
  } = useThemeData();
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
          <Button
            size="sm"
            className={cx("btn-icon btn-icon-only", {
              active: activeSecondaryMenuMobile,
            })}
            color="primary"
            onClick={toggleSecondaryMenuMobile}
          >
            <div className="btn-icon-wrapper">
              <FontAwesomeIcon icon={faEllipsisV} />
            </div>
          </Button>
        </span>
      </div>
    </Fragment>
  );
});
