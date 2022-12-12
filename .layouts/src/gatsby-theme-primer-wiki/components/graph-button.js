import React, { lazy, Suspense } from "react";
import { Box, Text } from "@primer/components";
const Graph = lazy(() =>
  import("gatsby-theme-primer-wiki/src/components/graph-view")
);

const GraphButton = props => {
  const { currentSlug, tagsGroups, isOpen, setIsOpen } = props;
  const hint = "Show Graph Visualisation";
  const anchorRef = React.useRef(null);
  return (
    <React.Fragment>
      <Box
        title={hint}
        aria-label={hint}
        color="header.text"
        sx={{
          border: 0,
          bg: "none",
          cursor: "pointer",
          ":hover, :hover > svg": {
            fill: "gray.0",
            color: "gray.0",
          },
          svg: {
            fill: "header.text",
          },
        }}
        display="flex"
        alignItems="center"
        ref={anchorRef}
        onClick={e => {
          setIsOpen(!isOpen);
        }}
      >
        <svg
          t="1607341341241"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
        >
          <path d="M512 512m-125.866667 0a125.866667 125.866667 0 1 0 251.733334 0 125.866667 125.866667 0 1 0-251.733334 0Z"></path>
          <path d="M512 251.733333m-72.533333 0a72.533333 72.533333 0 1 0 145.066666 0 72.533333 72.533333 0 1 0-145.066666 0Z"></path>
          <path d="M614.4 238.933333c0 4.266667 2.133333 8.533333 2.133333 12.8 0 19.2-4.266667 36.266667-12.8 51.2 81.066667 36.266667 138.666667 117.333333 138.666667 211.2C742.4 640 640 744.533333 512 744.533333s-230.4-106.666667-230.4-232.533333c0-93.866667 57.6-174.933333 138.666667-211.2-8.533333-14.933333-12.8-32-12.8-51.2 0-4.266667 0-8.533333 2.133333-12.8-110.933333 42.666667-189.866667 147.2-189.866667 273.066667 0 160 130.133333 292.266667 292.266667 292.266666S804.266667 672 804.266667 512c0-123.733333-78.933333-230.4-189.866667-273.066667z"></path>
          <path d="M168.533333 785.066667m-72.533333 0a72.533333 72.533333 0 1 0 145.066667 0 72.533333 72.533333 0 1 0-145.066667 0Z"></path>
          <path d="M896 712.533333m-61.866667 0a61.866667 61.866667 0 1 0 123.733334 0 61.866667 61.866667 0 1 0-123.733334 0Z"></path>
          <path d="M825.6 772.266667c-74.666667 89.6-187.733333 147.2-313.6 147.2-93.866667 0-181.333333-32-249.6-87.466667-10.666667 19.2-25.6 34.133333-44.8 44.8C298.666667 942.933333 401.066667 981.333333 512 981.333333c149.333333 0 281.6-70.4 366.933333-177.066666-21.333333-4.266667-40.533333-17.066667-53.333333-32zM142.933333 684.8c-25.6-53.333333-38.4-110.933333-38.4-172.8C104.533333 288 288 104.533333 512 104.533333S919.466667 288 919.466667 512c0 36.266667-6.4 72.533333-14.933334 106.666667 23.466667 2.133333 42.666667 10.666667 57.6 25.6 12.8-42.666667 19.2-87.466667 19.2-132.266667 0-258.133333-211.2-469.333333-469.333333-469.333333S42.666667 253.866667 42.666667 512c0 74.666667 17.066667 142.933333 46.933333 204.8 14.933333-14.933333 32-27.733333 53.333333-32z"></path>
        </svg>
        <Text display={["none", null, null, "inline"]} ml="2">
          {hint}
        </Text>
      </Box>
      {typeof window !== "undefined" ? (
        <Suspense fallback={null}>
          <Graph
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            currentSlug={currentSlug}
            tagsGroups={tagsGroups}
            anchorRef={anchorRef}
          />
        </Suspense>
      ) : null}
    </React.Fragment>
  );
};

export default GraphButton;
