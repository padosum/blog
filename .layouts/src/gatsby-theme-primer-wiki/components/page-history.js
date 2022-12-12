import { StyledOcticon, Link, Box } from "@primer/components";
import { PencilIcon } from "@primer/octicons-react";
import React from "react";
import LastUpdated from "./last-updated";
import useThemeConfig from "gatsby-theme-primer-wiki/src/use-theme-config";

function PageHistory({ editUrl, created, lastUpdated }) {
  const data = useThemeConfig();

  return editUrl || lastUpdated ? (
    <Box
      borderStyle="solid"
      borderColor="border.primary"
      borderWidth={0}
      borderTopWidth={1}
      borderRadius={0}
      py={2}
    >
      <Box
        display="flex"
        flexWrap="wrap"
        flexDirection="column"
        textAlign="right"
      >
        {editUrl ? (
          <Link mb="1" href={editUrl} fontSize={1}>
            <StyledOcticon icon={PencilIcon} mr={2} />
            {data.editUrlText}
          </Link>
        ) : null}
        {lastUpdated && (
          <LastUpdated
            created={created}
            lastUpdated={lastUpdated}
          ></LastUpdated>
        )}
      </Box>
    </Box>
  ) : null;
}

PageHistory.defaultProps = {
  contributors: [],
};

export default PageHistory;
