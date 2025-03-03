# Réduction automatique de 10 % sur une collection

- Pour identifier les produits qui sont dans la collection de promotion, j'ai bouclé sur `product.collections` afin de tester si le produit en question s'y trouve, directement dans `price.liquid`.
- La remise est calculée en fonction de la metafield `Réduction`, de cette façon :
  **1** Remise = Prix initial × (Pourcentage de réduction / 100)
  **2** Prix après remise = Prix initial - Remise
  **3** Soustraire discount_decimal de 1

Exemple :
{% assign discount_percentage = 20 %}
{% assign discount_decimal = discount_percentage | divided_by: 100 %}
{% assign discount_decimal = 20 | divided_by: 100 %}
{% assign discount_decimal = 0.20 %}
{% assign discount_multiplier = 1.0 | minus: discount_decimal %}
{% assign discount_multiplier = 1.0 | minus: 0.20 %}
{% assign discount_multiplier = 0.80 %}
