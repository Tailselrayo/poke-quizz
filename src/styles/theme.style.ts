import { MantineTheme } from '@mantine/core';

const theme: any = {
  globalStyles: (t: MantineTheme) => ({
    body: {
      userSelect: 'none',
      overflowX: 'hidden',
    },
    '.text-shadow': {
      textShadow: `
      -2px -2px black, 2px -2px black, 2px 2px black, -2px 2px black,
      -2px 4px black, 0px 4px black, 2px 4px black,
      -2px 6px black, 0px 6px black, 2px 6px black,
      -2px 8px black, 0px 8px black, 2px 8px black
      `,
    },
    '.border': {
      border: `8px solid ${t.colors.white[0]}`,
    },
    ".pointer": {
      cursor: "pointer",
    },
    '.mantine-Modal-body': {
      height: '100%',
    },
    '.mantine-Modal-overlay': {
      opacity: 0.85,
    },
    '.mantine-Modal-inner': {
      padding: 0,
      display: 'flex',
      alignItems: 'center',
    },
    '.mantine-Button-root': {
      minHeight: '113px',
      border: '4px solid rgba(0, 0, 0, 0.5)',
      boxShadow: '0px -8px 0px 0px rgba(0, 0, 0, 0.5) inset',
    },
    '.mantine-Button-root:disabled': {
      border: '4px solid rgba(0, 0, 0, 0.5)',
      boxShadow: '0px -8px 0px 0px rgba(0, 0, 0, 0.5) inset',
    },
    '.mantine-Button-label': {
      padding: 5,
      whiteSpace: 'break-spaces',
    },
    '.mantine-Checkbox-label': {
      color: t.colors.white[0],
    },
    '.mantine-Input-input': {
      backgroundColor: 'transparent',
      color: t.colors.white[0],
      border: 0,
      fontSize: t.fontSizes.md,
      padding: `${t.spacing.lg}px ${t.spacing.sm}px`,
    },
    '.mantine-Input-input:focus': {
      border: 0,
    },
  }),
  components: {
    Text: {
      defaultProps: {
        fz: 'sm',
        color: 'white',
      },
    },
    Button: {
      defaultProps: {
        fz: 'md',
        radius: 'md',
        className: 'text-shadow',
      },
    },
  },
  headings: {
    fontFamily: 'Gilroy',
  },
  ...{
    fontFamily: 'Gilroy',
    primaryShade: 0,
    colors: {
      white: ['#FFFFFF'],
      yellow: ['#FFDE5A'],
      red: ['#B02C58', '#872C45', '#E94368'],
      green: ['#2CA189', '#1C876F', '#6A974F'],
      blue: ['#51B4FC', '#391C68'],
      indigo: ['#A16DF5'],
      purple: ['#8357A0', '#5D3F87', '#784187', '#C13FEF'],
      black: ['#222222'],
      /* Theme */
      primary: ['#51B4FC'],
      secondary: ['#E94368'],
      tertiary: ['#C13FEF'],
    },
    radius: { xs: 7.7, sm: 11, md: 16, lg: 26, xl: 999 },
    /* As the Figma frames are 580x328, every value should be doubled.  */
    spacing: { xs: 8, sm: 18, md: 40, lg: 60, xl: 100 },
    fontSizes: { xs: 16, sm: 28, md: 40, lg: 50, xl: 100 },
  },
};

export default theme;
