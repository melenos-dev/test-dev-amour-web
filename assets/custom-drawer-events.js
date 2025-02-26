// Ecoute des modifications du panier, en s'inspirant de la méthode utilisée par le thème actif : Dawn
subscribe(PUB_SUB_EVENTS.cartUpdate, function (event) {
    const cart = event.cartData;
    checkCartTotal(cart);
});

const GIFT_VARIANT_ID = 56548496114013; // ID du variant du produit cadeau

// Vérifier le total du panier et ajouter/retirer le cadeau
function checkCartTotal(cart) {
    const totalPriceInEuros = cart.total_price / 100;
    const giftItem = cart.items.find(
        (item) => item.variant_id === GIFT_VARIANT_ID
    );
    if (totalPriceInEuros >= 100 && !giftItem) {
        addGiftToCart();
    } else if (totalPriceInEuros < 100 && giftItem) {
        removeGiftFromCart();
    }
}

// Utilisation du même debounce que Shopify si necessaire
const debouncedCheckCartTotal = debounce(
    (cart) => checkCartTotal(cart),
    ON_CHANGE_DEBOUNCE_TIMER
);

// Ajouter le produit cadeau au panier
const addGiftToCart = () => {
    fetch("/cart/add.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            items: [
                {
                    id: GIFT_VARIANT_ID,
                    quantity: 1,
                },
            ],
        }),
    })
        .then((response) => response.json())
        .then(async (data) => {
            await updateCartDrawer(); // Met à jour l'affichage du panier
        })
        .catch((error) =>
            console.error("Erreur lors de l'ajout du produit cadeau :", error)
        );
};

// Supprimer le cadeau du panier
function removeGiftFromCart() {
    fetch("/cart/change.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: GIFT_VARIANT_ID.toString(), // L'ID de la variante du produit cadeau, change ne l'accepte que en string, contrairement à add ?
            quantity: 0, // Mettre la quantité à 0 pour retirer l'article
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            updateCartDrawer(); // Met à jour l'affichage du panier
        })
        .catch((error) => {
            console.error("Erreur lors du retrait du produit cadeau :", error);
        });
}

// Mettre à jour le drawer avec le produit cadeau, en async : en cas de besoin dans d'autres contextes.
async function updateCartDrawer() {
    const res = await fetch("/?section_id=cart-drawer");
    const text = await res.text();
    const html = document.createElement("div");
    html.innerHTML = text;

    const newBox = html.querySelector("cart-drawer").innerHTML;

    document.querySelector("cart-drawer").innerHTML = newBox;
}
