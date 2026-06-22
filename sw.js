self.addEventListener('push', function(event) {
    const data = event.data ? event.data.text() : 'Nouvelle notification';
    event.waitUntil(
        self.registration.showNotification('Alerte Système', {
            body: data,
            icon: './icon.png' // Assurez-vous d'avoir une image icon.png ou supprimez cette ligne
        })
    );
});