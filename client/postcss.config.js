const tailwindcss = require('tailwindcss');
module.exports = {
  plugins: [tailwindcss('./app/tailwind.config.js'), require('autoprefixer')],
};
