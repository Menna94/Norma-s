if('serviceWorker' in navigator){ //-> when service workers are supported
    navigator.serviceWorker.register('/sw.js')
    .then((reg)=> console.log('service worker is registered!', reg))
    .catch((err)=> console.log('sw is NOT registered!', err));
}