const withPWA = require('next-pwa')
 
module.exports = withPWA({
  pwa: {
    //dest: 'public',
    //sw: 'OneSignalSDKWorker.js',
    disable: true
  }
})