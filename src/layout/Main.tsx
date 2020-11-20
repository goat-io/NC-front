import { observer, useObserver } from "mobx-react";

import { MainRouter } from "../routes/MainRouter";
import React from "react";
import ResizeDetector from "react-resize-detector";
import cx from "classnames";
import { useThemeStore } from "../stores/ThemeStore";
import { withRouter } from "react-router-dom";

const useStores = () => {
  const { themeStore } = useThemeStore();
  return useObserver(() => ({
    colorScheme: themeStore.colorScheme,
    enableFixedHeader: themeStore.enableFixedHeader,
    enableFixedSidebar: themeStore.enableFixedSidebar,
    enableFixedFooter: themeStore.enableFixedFooter,
    enableClosedSidebar: themeStore.enableClosedSidebar,
    enableMobileMenu: themeStore.enableMobileMenu,
    closedSmallerSidebar: themeStore.closedSmallerSidebar,
  }));
};

const Main = observer(() => {
  let {
    colorScheme,
    enableFixedHeader,
    enableFixedSidebar,
    enableFixedFooter,
    enableClosedSidebar,
    enableMobileMenu,
    closedSmallerSidebar,
  } = useStores();

  return (
    <ResizeDetector
      handleWidth
      render={({ width }) => (
        <div
          className={cx(
            "app-container app-theme-" + colorScheme,
            { "fixed-header": enableFixedHeader },
            { "fixed-sidebar": enableFixedSidebar || width < 1250 },
            { "fixed-footer": enableFixedFooter },
            { "closed-sidebar": enableClosedSidebar || width < 1250 },
            {
              "closed-sidebar-mobile": closedSmallerSidebar || width < 1250,
            },
            { "sidebar-mobile-open": enableMobileMenu }
          )}
        >
          <MainRouter />
        </div>
      )}
    />
  );
});

export const App = withRouter(Main);
