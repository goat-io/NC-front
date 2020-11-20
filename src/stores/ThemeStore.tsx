import React from "react";
import { types } from "mobx-state-tree";

export const ThemeStore = types
  .model("ThemeStore", {
    drawerOpen: false,
    active: false,
    mobile: false,
    mobileSmall: true,
    activeSecondaryMenuMobile: true,
    openLeft: false,
    openRight: false,
    openRightDeviceStatus: false,
    relativeWidth: false,
    width: 280,
    noTouchOpen: false,
    noTouchClose: false,
    enableClosedSidebar: false,
    enableFixedHeader: true,
    enableFixedFooter: true,
    enableFixedSidebar: true,
    colorScheme: "white",
    enableMobileMenu: false,
    closedSmallerSidebar: false,
    backgroundColor: "",
    headerBackgroundColor: "bg-royal header-text-light header-shadow",
    enableMobileMenuSmall: "",
    enableBackgroundImage: true,
    enableHeaderShadow: true,
    enableSidebarShadow: true,
    backgroundImage: "",
    backgroundImageOpacity: "opacity-06",
    enablePageTitleIcon: true,
    enablePageTitleSubheading: true,
    enablePageTabsAlt: false,
    selectedTab: types.maybe(types.union(types.string, types.number)),
  })
  .actions((self) => ({
    toggleDrawer() {
      self.drawerOpen = !self.drawerOpen;
      self.enableClosedSidebar = !self.enableClosedSidebar;
    },
    toggleMobileSidebar() {
      self.mobile = !self.mobile;
    },
    toggleMobileSmall() {
      self.mobileSmall = !self.mobileSmall;
    },
    toggleSecondaryMenuMobile() {
      self.activeSecondaryMenuMobile = !self.activeSecondaryMenuMobile;
    }
  }))

export const themeContext = React.createContext({
  themeStore: ThemeStore.create(),
});

export const useThemeStore = () => React.useContext(themeContext);
