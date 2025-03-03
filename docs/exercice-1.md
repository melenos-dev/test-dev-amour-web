# Personnalisation du cart drawer avec seuils promotionnels et ajout automatique d'un cadeau en temps réel

## Contexte

Thème de base Dawn. Nous sommes dans un environnement de développement et le but est d'ajouter des seuils promotionnels et un cadeau en temps réel.

Exemple :

-   si total < 50 € : « Plus que [50 – total] € pour bénéficier de la livraison
    gratuite. »
-   si total < 100 € : « Plus que [100 – total] € pour recevoir un cadeau
    offert. »
-   une fois le seuil atteint, masquer ou remplacer les messages par un
    message de félicitations.

### Méthode de récupération du total du panier

-   [Ajout d'un fichier](../assets/custom-drawer-events.js), permettant de capturer les modifications de panier et récupérer l'objet cart à jour, à l'aide de la méthode `subscribe()`, déjà utilisée par le thème.

#### Logique de calcul et d'affichage

-   [Logique visible directement dans](../snippets/cart-drawer.liquid), préférant écrire le moins de JS possible, la globale cart suffisant largement à implémenter ces affichages en temps réel.

##### Procédure d'ajout du produit cadeau

-   Récupération de l'objet `cart` fournit par `subscribe(PUB_SUB_EVENTS.cartUpdate)`.
-   Test du prix total pour savoir s'il est plus grand ou égal à 100€.
-   Utilisation de `l'API Ajax` vers `/cart/add.js` ou `/cart/change.js`, en fonction du résultat (ajout/suppression du cadeau).
-   Mise à jour de la section du drawer, toujours avec la même API. J'ai préféré mettre à jour la section entière plutot qu'ajouter manuellement le cadeau dans la section, pour avoir la certitude d'une cohérence des données `back/front`. J'ai hésité à utiliser `renderContents()`, mais le résultat est le même.

###### Test en local

[Suivre les instructions du README.md général](../README.md)
