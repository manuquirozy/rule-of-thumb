const config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      mobile: '375px',
      tablet: '768px',
      desktop: '1440px',
    },
    extend: {
      transitionProperty: {
        height: 'height',
      },
      backgroundImage: {
        'gradient-grey-desktop': 'linear-gradient(to right, rgba(0, 0, 0, 0.0001) 0%, #888888 15%, #666666 50%, rgba(51, 51, 51, 0.6) 71.88%)',
        'gradient-grey': 'linear-gradient(to right, rgba(0, 0, 0, 0.0001) 0%, #888888 18%, #666666 50%, rgba(51, 51, 51, 0.6) 71.88%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
