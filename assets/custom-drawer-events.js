// Ecoute des modifications du panier, en s'inspirant de la méthode utilisée par le thème actif : Dawn
subscribe(PUB_SUB_EVENTS.cartUpdate, function (event) {
    console.log(event);
});
