import React, { Fragment } from "react";
import { observer, useObserver } from "mobx-react";

import cx from "classnames";
import { useThemeStore } from "../../stores/ThemeStore";

const useThemeData = () => {
  const { themeStore } = useThemeStore();
  return useObserver(() => ({
    enablePageTitleIcon: themeStore.enablePageTitleIcon,
    enablePageTitleSubheading: themeStore.enablePageTitleSubheading,
  }));
};

interface IPageTitle {
  heading: string;
  icon: string;
  subheading: string;
  variation?: number;
}
export const PageTitle = observer(
  ({ heading, icon, subheading, variation }: IPageTitle) => {
    const { enablePageTitleIcon, enablePageTitleSubheading } = useThemeData();
    return (
      <Fragment>
        <div className="app-page-title">
          <div className="page-title-wrapper">
            <div className="page-title-heading">
              <div
                className={cx("page-title-icon", {
                  "d-none": !enablePageTitleIcon,
                })}
              >
                <i className={icon} />
              </div>
              <div>
                {heading}
                <div
                  className={cx("page-title-subheading", {
                    "d-none": !enablePageTitleSubheading,
                  })}
                >
                  {subheading}
                </div>
              </div>
            </div>
            <div className="page-title-actions">{}</div>
          </div>
        </div>
      </Fragment>
    );
  }
);
