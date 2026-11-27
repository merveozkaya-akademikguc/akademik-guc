const C='akademik-guc-v25',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{if(r.ok&&new URL(e.request.url).origin===location.origin){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))))});
self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(x){}
 e.waitUntil(self.registration.showNotification(d.title||'Akademik Güç',{body:d.body||'Yeni mesajınız var.',icon:'icon-192.png',badge:'icon-192.png',tag:d.tag||'mesaj',renotify:true,data:{url:d.url||'./#mesaj'}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();const u=(e.notification.data&&e.notification.data.url)||'./#mesaj',g=u.split('#')[1]||'mesaj';
 e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{
  for(const c of l){if('focus' in c){c.postMessage({go:g});return c.focus()}}
  return self.clients.openWindow(u)}))});
