import { Text } from "@primer/components";
import React from "react";
import useThemeConfig from "gatsby-theme-primer-wiki/src/use-theme-config";

const CreatedText = ({ created }) => {
  return (
    <Text fontSize={1}>
      {"문서 생성"} <u>{created.replace(/\+.*$/, "")}</u>
    </Text>
  );
};

function LastUpdated({ created, lastUpdated }) {
  const primerWikiThemeConfig = useThemeConfig();
  const { lastUpdatedText, shouldShowLastUpdated } = primerWikiThemeConfig;

  const lastUpdatedString = lastUpdated.replace(/T/, " ").replace(/\..+/, "");
  if (!shouldShowLastUpdated) {
    return null;
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}>
      {created && <CreatedText created={created} />}
      {lastUpdated ? (
        <Text fontSize={1}>
          {lastUpdatedText} <u>{lastUpdatedString}</u>
        </Text>
      ) : null}
    </div>
  );
}

export default LastUpdated;
