const theme = {
  fonts: {
    normal: 'NeoDunggeunmo',
    mono: 'NeoDunggeunmo Code',
  },
  colorSchemes: {
    light: {
      colors: {
        auto: {
          white: '#ede0de',
        },
        header: {
          bg: '#0ac266',
          text: '#1f5c7a',
        },
        bg: {
          primary: '#fbfdfc',
          alt: 'rgba(255, 255, 255, 0.07)',
          title: '#00007f',
        },
        text: {
          primary: '#2c293d',
          link: 'hsl(251, 13%, 31%)',
          placeholder: 'hsl(251, 13%, 31%)',
          neutralMuted: 'rgba(175,184,193,0.2)',
          alt: '#fbfdfc',
        },
        border: {
          primary: 'hsl(251, 13%, 31%)',
        },
        gray: ['#0ac266'],
      },
    },
    dark: {
      colors: {
        bg: {
          primary: 'hsl(27, 14%, 15%)',
        },
        text: {
          primary: '#ffffff',
          neutralMuted: 'rgba(110,118,129,0.4)',
        },

        gray: ['hsl(27, 15%, 12%)'],
      },
    },
  },
}

export default theme
