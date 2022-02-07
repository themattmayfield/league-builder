module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        leagueBlue: '#10182F',
        leagueDark: '#1A202C'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
