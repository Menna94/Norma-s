const staticCacheName = 'site-static-v3';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/script.js',
    '/js/materialize.min.js',
    '/css/materialize.min.css',
    '/css/styles.css',
    '/img/dish.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v78/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
];

//Install SW
self.addEventListener('install', e => {
    e.waitUntil(
      caches.open(staticCacheName).then(cache => {
        console.log('caching shell assets');
        cache.addAll(assets);
      })
    );
});

//activate enent
self.addEventListener('activate', e=>{
    //console.log('SW has been ACTIVATED!');
    e.waitUntil(
        caches.keys().then(keys=>{
            return Promise.all(keys.filter( k => k !== staticCacheName).map( k => caches.delete(k)))
        })
    )
})

//fetch enent
self.addEventListener('fetch', e =>{
//    console.log('FETCH EVENT', e);
    e.respondWith(
        caches.match(e.request).then(cachResponse=>{
            return cachResponse || fetch(e.request)
        })
    )
})