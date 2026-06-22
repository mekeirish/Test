self.addEventListener('push', event => {
    const data = event.data ? event.data.text() : 'Nouvelle alerte';
    event.waitUntil(
        self.registration.showNotification('Mon Alerte PWA', {
            body: data,
            icon: './icon.png'
        })
    );
});
