const theme = {
  fonts: {
    normal: "NeoDunggeunmo",
    mono: "NeoDunggeunmo Code",
  },
  colorSchemes: {
    light: {
      colors: {
        auto: {
          white: "#f7f3ee",
        },
        header: {
          bg: "hsl(36, 37%, 92%)",
          text: "hsl(31, 45%, 20%)",
        },
        bg: {
          primary: "#f7f3ee",
          alt: "hsl(36, 37%, 92%)",
          title: "#00007f",
        },
        text: {
          primary: "hsl(31, 45%, 20%)",
          link: "hsl(43, 100%, 42%)",
          placeholder: "hsl(34, 37%, 70%)",
          neutralMuted: "rgba(175,184,193,0.2)",
        },
        border: {
          primary: "hsl(36, 37%, 83%)",
        },
        gray: ["hsl(35, 35%, 90%)"],
      },
    },
    dark: {
      colors: {
        bg: {
          primary: "hsl(27, 14%, 15%)",
        },
        text: {
          primary: "#ffffff",
          neutralMuted: "rgba(110,118,129,0.4)",
        },

        gray: ["hsl(27, 15%, 12%)"],
      },
    },
  },
};

export default theme;
