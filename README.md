# Test Developpeur Ecommerce - l'amour du web

Ce projet est un test technique visant à démontrer mes compétences en développement Shopify, en particulier sur la personnalisation avancée du panier avec Ajax, et la gestion de stocks et de réductions automatiques.

## Contexte et Objectifs

L'objectif de ce projet est de personnaliser le panier sur Shopify en utilisant Ajax pour une expérience utilisateur fluide et réactive. Ce test met l'accent sur :

- La maîtrise de Shopify et de son architecture.
- L'utilisation d'Ajax pour des mises à jour dynamiques du panier.
- Les échanges des automatismes back-end, notamment avec Shopify Flow.
- L'aspect collaboratif et maintenable en utilisant Github avec une histoire de commits claire et structurée.

### Structure du projet

Le projet est organisé comme suit :

├── assets/ # Fichiers JS, CSS et images
├── config/ # Configuration Shopify
├── docs/ # Les documentations de chaque exercice
├── layout/ # Layout principal du thème
├── locales/ # Traductions et localisations
├── sections/ # Sections réutilisables dans le thème
├── snippets/ # Extraits de code (inclure des composants)
└── templates/ # Modèles de pages (index, produit, panier, etc.)

#### Installation et utilisation en Local

----- Prérequis : -----

- Avoir installé globalement GitHub, Node.js et Shopify CLI

1. **Téléchargement du dépot GitHub**  
   Ouvrir un terminal et naviguer vers le dossier désiré. Puis lancer les commandes suivantes :

   - git clone https://github.com/melenos-dev/test-dev-amour-web.git
   - cd test-dev-amour-web

2. **Lancer le thème en mode développement**
   Un mot de passe a été créé pour vous via Theme Access, et les identifiants se trouvent dans shopify.theme.toml. Ainsi, pour créér votre environnement local, il vous suffit de lancer cette commande :

   - shopify theme dev --environment amourweb
   - En cas de besoin, le mot de passe de la boutique est : amourduweb

##### Documentation Détaillée

Chaque exercice a sa propre documentation :

- [Exercice 1 : Personnalisation du cart drawer avec seuils promotionnels et ajout automatique d'un cadeau en temps réel](docs/exercice-1.md)
- [Exercice 2 : Automatisation de la gestion de stocks via Shopify Flow](docs/exercice-2.md)
- [Exercice 3 : Utilisation de Shopify CLI et gestion de version](docs/exercice-3.md)
- [Exercice 4 : Réduction automatique de 10 % sur une collection](docs/exercice-4.md)

###### Bonnes Pratiques

- **Commentaires de Code** : Le code est documenté avec des commentaires clairs expliquant la logique métier et les fonctions complexes.
- **Gestion de Branches** : Chaque fonctionnalité a été développée dans une branche dédiée (ex: `feature/cart-drawer-ajax`).
- **Revue de Code** : Le code a été testé et relu avant d'être fusionné dans la branche `main`.
- **Versionning** : Utilisation de tags pour marquer les versions stables (ex: `v1.1.0` pour la personnalisation du panier).
- **Partage facile de l'environnement de développement** : Utilisation de `Theme Access` afin de simplifier la procédure de partage.
- **Utilisation de GitHub Action** : A chaque push sur main, utilisation de Shopify CLI pour mettre en ligne les modifications.

Développé par Ducret Yann.  
Pour toute question, contactez-moi sur [yanndweb@gmail.com].
