# Automatisation de la gestion de stocks via Shopify Flow

- Le flux se déclanche lors de la création d'une commande.
- Il va ensuite tester si la commande contient un produit avec le SKU `cadeau`.
- Si tel est le cas, lancer un custom code récupérant la quantité commandée du produit cadeau.
- Il va ensuite récupérer cette quantité et utiliser l'api graphQL pour ajuster la quantité du stock de `delta +Quantity-1` du produit cadeau, à l'aide de la mutation `inventoryAdjustQuantities`, afin d'empêcher l'utilisateur de commander plusieurs cadeaux et assurer un decompte fiable.
- - Payload : "delta": +QuantityOrdered-1, "inventoryItemId": "gid://shopify/InventoryItem/53642720575837", "locationId": "gid://shopify/Location/105867641181".
- Et, pour finir, tester que le produit arrive en rupture de stock. Si tel est le cas, un mail sera envoyé à l'équipe de la boutique pour les prévenir que le cadeau ne sera plus proposé dans le cart drawer.

## Explications techniques

Pour gérer le stock du produit cadeau, nous aurions pu faire un stock externe, via une api graphQL ou une metafield, mais j'ai trouvé plus judicieux de compter combien l'utilisateur a commandé de cadeaux, annuler ce compte puis décompter le stock de 1 ensuite.
Ainsi, nous utilisons le stock usuel de Shopify, et l'utilisateur n'a aucun moyen de commander plusieurs cadeaux.

Côté front, le message promotionnel du cadeau ne s'affiche uniquement si le produit cadeau est disponible.
