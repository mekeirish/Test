const PREFIX="Test-";
const CACHE="Test-v1795510062925";
const ASSETS=['./','./index.html','./manifest.json','./icon.png','./icon-192.png'];
self.addEventListener('install',e=>{
self.skipWaiting();
e.waitUntil(caches.open(CACHE).then(c=>Promise.all(ASSETS.map(a=>c.add(a).catch(()=>null)))));
});
self.addEventListener('activate',e=>{
e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
const req=e.request;
if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
const net=req.mode==='navigate'?fetch(req,{cache:'no-cache'}):fetch(req);
e.respondWith(net.then(res=>{if(res&&res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return res;}).catch(()=>caches.match(req).then(r=>r||caches.match('./index.html'))));
});
self.addEventListener('push',e=>{
let d={};
try{d=e.data?e.data.json():{};}catch(err){d={body:e.data?e.data.text():''};}
e.waitUntil(self.registration.showNotification(d.title||"Test",{body:d.body||'',icon:'./icon.png',badge:'./badge.png',tag:d.tag||'app',renotify:true,data:{url:d.url||'./'}}));
});
self.addEventListener('notificationclick',e=>{
e.notification.close();
const target=new URL((e.notification.data&&e.notification.data.url)||'./',self.location.href).href;
e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{for(const w of list){if(w.url.startsWith(self.registration.scope)&&'focus' in w)return w.focus();}return self.clients.openWindow(target);}));
});