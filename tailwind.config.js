/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-color': '#d93632',
        'secondary-color': '#d97877',
        'gray': '#f5f5f5'
      },
      fontFamily: {
        'bebas': 'Bebas Neue',
        'source': 'Source Sans Pro'
      }
    },
  },
  plugins: [],
}

