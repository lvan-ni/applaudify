import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        sunrise: '#FF4B11',
        day: '#ffffff',
      },
      fontFamily: {
        josefin: ['Josefin Sans', 'sans-serif'],
        avenir: ['Avenir Next', 'sans-serif'],
      },
      fontSize: {
        '10': '10px',
        '12': '12px',
        '14': '14px',
        '16': '16px',
        '18': '18px',
        '20': '20px',
        '22': '22px',
        '24': '24px',
        '30': '30px',
        '40': '40px',
        '50': '50px',
        '60': '60px',
        '80': '80px',
        '100': '100px',
        '140': '140px',
      },
      screens: {
        // iPhone SE Portrait
        phoneSEP: '320px',

        // iPhone 14/15 Pro Portrait
        phoneP: '393px',

        // iPhone SE Landscape
        phoneSEL: '568px',

        // iPad Pro 11" Portrait
        tabletP: '834px',

        // iPhone 14/15 Pro Landscape
        phoneL: '852px',

        // iPad Pro 11" Landscape
        tabletL: '1194px',

        // MacBook Pro 14" Landscape
        laptopL: '1512px',

        // Studio Display 27" Landscape
        desktopL: '2560px',
      },
    },
  },
  plugins: [],
};

export default config;
