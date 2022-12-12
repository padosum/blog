// https://github.com/simurai/duotone-dark-earth-syntax
const duotoneEarthTheme = {
  plain: {
    color: "#bd987f",
    backgroundColor: "#322d29",
  },
  styles: [
    {
      types: ["prolog", "doctype", "cdata"],
      style: {
        color: "#6a5f58",
        fontStyle: "italic",
      },
    },
    {
      types: ["doctype"],
      style: {
        color: "#705e51",
      },
    },
    {
      types: ["comment"],
      style: {
        color: "#705e51",
        fontStyle: "italic",
      },
    },
    {
      types: ["punctuation", "bracket", "brace"],
      style: {
        color: "#564b43",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ["tag", "operator", "number"],
      style: {
        color: "#bfa05a",
      },
    },
    {
      types: ["function"],
      style: {
        color: "#88786d",
      },
    },

    {
      types: ["property"],
      style: {
        color: "#98755d",
      },
    },
    {
      types: ["tag-id", "selector", "atrule-id"],
      style: {
        color: "#fff3eb",
      },
    },
    {
      types: ["attr-name"],
      style: {
        color: "#a48774",
      },
    },
    {
      types: [
        "boolean",
        "string",
        "entity",
        "url",
        "symbol",
        "number",
        "attr-value",
        "keyword",
        "control",
        "directive",
        "unit",
        "statement",
        "regex",
        "atrule",
      ],
      style: {
        color: "#fcc440",
      },
    },
    {
      types: ["placeholder"],
      style: {
        color: "#fcc440",
      },
    },
    {
      types: ["variable"],
      style: {
        color: "#98755d",
      },
    },
    {
      types: ["deleted"],
      style: {
        textDecoration: "line-through",
      },
    },
    {
      types: ["inserted"],
      style: {
        borderBottom: "1px dotted #fff3eb",
        textDecoration: "none",
      },
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic",
      },
    },
    {
      types: ["important", "bold"],
      style: {
        fontWeight: "bold",
      },
    },
    {
      types: ["important"],
      style: {
        color: "#a48774",
      },
    },

    {
      types: ["entity"],
      style: {
        cursor: "help",
      },
    },
    {
      types: ["function-call"],
      style: {
        color: "#ffdac2",
      },
    },
    {
      types: ["constant"],
      style: {
        color: "#fecb52",
      },
    },
  ],
};
export default duotoneEarthTheme;
