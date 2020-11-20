import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import React, { Fragment } from "react";

import Flag from "react-flagkit";
import city2 from "../../../assets/architectui/utils/images/dropdown-header/city2.jpg";
import { useTranslation } from "react-i18next";

export const LanguageSelection = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getCountryCode = (): string => {
    const browsersLanguage = i18n.language;
    if (browsersLanguage === "es") {
      return "ES";
    }
    return "US";
  };

  return (
    <Fragment>
      <div className="header-dots">
        <UncontrolledDropdown>
          <DropdownToggle className="p-0 mr-2" color="link">
            <div className="icon-wrapper icon-wrapper-alt rounded-circle">
              <div className="icon-wrapper-bg bg-focus" />
              <div className="language-icon">
                <Flag
                  className="mr-3 opacity-8"
                  country={getCountryCode()}
                  size={40}
                />
              </div>
            </div>
          </DropdownToggle>
          <DropdownMenu right className="rm-pointers">
            <div className="dropdown-menu-header">
              <div className="dropdown-menu-header-inner pt-4 pb-4 bg-focus">
                <div
                  className="menu-header-image opacity-05"
                  style={{
                    backgroundImage: "url(" + city2 + ")",
                  }}
                />
                <div className="menu-header-content text-center text-white">
                  <h6 className="menu-header-subtitle mt-0">
                    {t("Choose Language")}
                  </h6>
                </div>
              </div>
            </div>
            <DropdownItem header>{t("Popular Languages")}</DropdownItem>
            <DropdownItem onClick={() => changeLanguage("en")}>
              <Flag className="mr-3 opacity-8" country="US" />
              English
            </DropdownItem>
            <DropdownItem onClick={() => changeLanguage("es")}>
              <Flag className="mr-3 opacity-8" country="ES" />
              Español
            </DropdownItem>
            <DropdownItem divider />
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </Fragment>
  );
};
