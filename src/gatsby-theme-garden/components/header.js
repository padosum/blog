import React from "react";
import { Link } from "gatsby";

import useSiteMetadata from "gatsby-theme-garden/src/use-site-metadata";
import DarkModeToggle from "gatsby-theme-garden/src/components/dark-mode-toggle";
import GraphButton from "gatsby-theme-garden/src/components/graph-button";
import RandomButton from "gatsby-theme-garden/src/components/random-button";
import { Search } from "gatsby-theme-garden/src/components/search";

import "gatsby-theme-garden/src/components/header.css";

const Header = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <header>
      <Link to="/">
        <h3>{siteMetadata.title}</h3>
      </Link>
      <div className="controls">
        <Search />
        <GraphButton />
        <DarkModeToggle />
        <RandomButton />
      </div>
    </header>
  );
};

export default Header;
