const theme = {
  fonts: {
    normal: 'NeoDunggeunmo',
    mono: 'NeoDunggeunmo Code',
  },
  colorSchemes: {
    light: {
      colors: {
        header: {
          bg: '#808080;',
          text: '#ffffff',
        },
        auto: {
          gray: [
            '#fafbfc',
            '#f6f8fa',
            '#e1e4e8',
            '#d1d5da',
            '#959da5',
            '#6a737d',
            '#586069',
            '#e1e4e8',
            '#2f363d',
            '#24292e',
          ],
        },
        bg: {
          primary: '#008082',
          window: '#bfb8bf',
          post: 'hsla(0,0%,100%,.8)',
          tocTitle: '#808080',
          title: '#00007f',
        },
        text: {
          window: '#1b1f23',
          primary: '#24292e',
          neutralMuted: 'rgba(175,184,193,0.2)',
          h1: '#08367F',
        },
      },
    },
    dark: {
      colors: {
        bg: {
          primary: '#008082',
          window: '#bfb8bf',
          post: '#200840',
          tocTitle: '#808080',
          title: '#00007f',
        },
        text: {
          window: '#1b1f23',
          primary: '#ffffff',
          neutralMuted: 'rgba(110,118,129,0.4)',
          h1: 'hsl(78, 62%, 47%)',
        },
      },
    },
  },
};

export default theme;
