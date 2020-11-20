import React, { Fragment } from "react";
import { observer, useObserver } from "mobx-react";

import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { HeaderLogo } from "../Logo/Logo";
import { LanguageSelection } from "./Components/LanguageSelection";
import { UserBox } from "./Components/UserBox";
import cx from "classnames";
import { useThemeStore } from "../../stores/ThemeStore";

const useThemeData = () => {
  const { themeStore } = useThemeStore();
  return useObserver(() => ({
    headerBackgroundColor: themeStore.headerBackgroundColor,
    enableMobileMenuSmall: themeStore.enableMobileMenuSmall,
    enableHeaderShadow: themeStore.enableHeaderShadow,
  }));
};

export const Header = observer(() => {
  let {
    headerBackgroundColor,
    enableMobileMenuSmall,
    enableHeaderShadow,
  } = useThemeData();

  return (
    <Fragment>
      <CSSTransitionGroup
        component="div"
        className={cx("app-header", headerBackgroundColor, {
          "header-shadow": enableHeaderShadow,
        })}
        transitionName="HeaderAnimation"
        transitionAppear={true}
        transitionAppearTimeout={1500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <HeaderLogo />

        <div
          className={cx("app-header__content", {
            "header-mobile-open": enableMobileMenuSmall,
          })}
        >
          <div className="app-header-right">
            <LanguageSelection />
            <UserBox />
          </div>
        </div>
      </CSSTransitionGroup>
    </Fragment>
  );
});
