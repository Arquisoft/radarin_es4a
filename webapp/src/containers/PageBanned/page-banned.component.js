/* eslint-disable constructor-super */
import React from "react";
import { useTranslation } from "react-i18next";
import { PageBannedWrapper, PageBannedContent } from "./page-banned.style";

/**
 * A React component page that is displayed when there"s no valid route. Users can click the button
 * to get back to the home/welcome page.
 */
const PageBanned = () => {
  const { t } = useTranslation();
  return (
    <PageBannedWrapper>
      <PageBannedContent>
        <img src="/img/403.svg" alt="403" />
        <h3> {t("banned.title")} </h3>
        <p> {t("banned.content")}</p>
      </PageBannedContent>
    </PageBannedWrapper>
  );
};

export default PageBanned;
