self.addEventListener('push', function(event) {
    const data = event.data.text();
    const options = {
        body: data,
        icon: 'icon.png'
    };
    event.waitUntil(
        self.registration.showNotification('Nouvelle Alerte', options)
    );
});