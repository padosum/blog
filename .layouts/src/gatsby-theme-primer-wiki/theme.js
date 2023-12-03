const theme = {
  fonts: {
    normal: 'NeoDunggeunmo',
    mono: 'NeoDunggeunmo Code',
  },
  colorSchemes: {
    light: {
      colors: {
        auto: {
          white: '#fbfdfc',
          gray: ['#0ac266', '#1f5c7a', '#1f5c7a'],
        },
        header: {
          bg: '#fbfdfc',
          text: '#1f5c7a',
          border: '#0ac266',
        },
        bg: {
          primary: '#fbfdfc',
          alt: 'rgba(255, 255, 255, 0.07)',
          title: '#00007f',
        },
        headerSearch: {
          bg: 'hsl(99, 59%, 70%, 0.5)',
        },
        text: {
          primary: '#2c293d',
          link: 'hsl(251, 13%, 31%)',
          placeholder: 'hsl(251, 13%, 31%)',
          neutralMuted: 'rgba(175,184,193,0.2)',
          alt: '#fbfdfc',
          secondary: '#1f5c7a',
        },
        border: {
          primary: 'hsl(251, 13%, 31%)',
        },
        gray: ['#0ac266'],
      },
    },
    dark: {
      colors: {
        auto: {
          white: '#000000',
          gray: ['#0ac266'],
        },
        header: {
          text: '#a5e085',
          border: '#0ac266',
        },
        bg: {
          primary: '#121212',
        },
        headerSearch: {
          bg: 'hsl(99, 59%, 70%, 0.5)',
        },
        text: {
          primary: '#fbfdfc',
          secondary: '#a5e085',
          placeholder: '#ede0de',
          neutralMuted: 'rgba(110,118,129,0.4)',
          alt: '#fbfdfc',
        },
        gray: ['#0ac266'],
      },
    },
  },
}

export default theme
