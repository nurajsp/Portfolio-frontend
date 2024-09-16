// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true }, // Merged devtools configuration
  css: [
    'bootstrap/dist/css/bootstrap.min.css' // Include Bootstrap CSS
  ],
  plugins: [
    { src: '~/plugins/bootstrap.js', mode: 'client' } // Include Bootstrap JS as a plugin
  ]
});
 
