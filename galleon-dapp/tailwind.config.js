module.exports = {
  content: ['./src/**/*.{html,js,jsx,,ts,tsx}'],
  theme: {
    colors: {
      theme: '#1fb6ff',
      purple: '#7e5bef',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      yellow: '#ffc82c',
      'gray-dark': '#273444',
      gray: '#8492a6',
      'gray-light': '#d3dce6',
    },
    fontFamily: {
      display: ['Morion'],
      body: ['Wigrum'],
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
