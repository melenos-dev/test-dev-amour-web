// Ecoute des modifications du panier, en s'inspirant de la méthode utilisée par le thème actif : Dawn
subscribe(PUB_SUB_EVENTS.cartUpdate, function (event) {
  const cart = event.cartData;
  checkCartTotal(cart);
});

const GIFT_VARIANT_ID = 56548496114013; // ID du variant du produit cadeau
let isGiftInStock = false; // Tester globalement la dispo du produit cadeau

// Vérifier le total du panier et ajouter/retirer le cadeau
async function checkCartTotal(cart) {
  isGiftInStock = await isGiftAvailable();

  if (!cart || !Array.isArray(cart.items)) {
    // Si l'user vient d'ajouter un produit au panier, cart vaut uniquement ce produit. Nous devons donc rechercher le panier manuellement
    try {
      const response = await fetch("/cart.js");
      cart = await response.json();
    } catch (error) {
      console.error("Erreur lors de la récupération du panier:", error);
      return;
    }
  }

  const totalPriceInEuros = cart.total_price / 100;

  const giftItem = cart.items.find(
    (item) => item.variant_id === GIFT_VARIANT_ID
  );
  if (totalPriceInEuros >= 100 && !giftItem && isGiftInStock) {
    // Vérifie que le panier soit plus grand que 99e et que le cadeau est dispànible avant d'ajouter le cadeau au panier.
    await addGiftToCart();
  } else if (
    (totalPriceInEuros < 100 && giftItem) ||
    (giftItem && !isGiftInStock)
  ) {
    await removeGiftFromCart();
  }

  updateCartDrawer(); // Met à jour le panier en temps réel
}

// Utilisation du même debounce que Shopify si necessaire
const debouncedCheckCartTotal = debounce(
  (cart) => checkCartTotal(cart),
  ON_CHANGE_DEBOUNCE_TIMER
);

// Ajouter le produit cadeau au panier
const addGiftToCart = async () => {
  await fetch("/cart/add.js", {
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
    .catch((error) =>
      console.error("Erreur lors de l'ajout du produit cadeau :", error)
    );
};

// Supprimer le cadeau du panier
const removeGiftFromCart = async () => {
  await fetch("/cart/change.js", {
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
    .catch((error) => {
      console.error("Erreur lors du retrait du produit cadeau :", error);
    });
};

// Mettre à jour le drawer avec le produit cadeau
async function updateCartDrawer() {
  const res = await fetch("/?section_id=cart-drawer"); // Utilisation de la méthode AJAX de Shopify pour récupérer la section à jour
  const text = await res.text();
  const html = document.createElement("div");
  html.innerHTML = text;

  const newBox = html.querySelector("cart-drawer");
  const giftNotification = newBox.querySelector(".cadeau");

  if (giftNotification) {
    if (isGiftInStock) {
      // Gestion de la promo du cadeau en fonction de sa disponibilité
      giftNotification.classList.add("available");
    } else {
      giftNotification.classList.remove("available");
    }
  }

  document.querySelector("cart-drawer").innerHTML = newBox.innerHTML;
}

async function isGiftAvailable() {
  try {
    const response = await fetch("/products/maison-de-campagne-offerte.js"); // Remplace "cadeau" par le handle du produit
    const product = await response.json();

    return product.variants.some((variant) => variant.available);
  } catch (error) {
    console.error("Erreur lors de la récupération du stock :", error);
    return false; // En cas d'erreur, considérer le cadeau indisponible
  }
}

const firstInitialization = async () => {
  isGiftInStock = await isGiftAvailable(); // Vérifier la disponibilité du cadeau
  await updateCartDrawer();
};

firstInitialization();
