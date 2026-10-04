# Cahier des charges — RMTS

## Vision

RMTS est une plateforme de gestion et de traçabilité restaurant couvrant:

`Table -> QR -> Menu -> Commande -> Cuisine -> Addition -> Paiement -> Audit`

## Rôles

- CUSTOMER
- SERVER
- KITCHEN
- CASHIER
- MANAGER
- OWNER

## Exigences fonctionnelles majeures

1. Multi-restaurant avec isolation stricte des données.
2. QR code table sécurisé (token non prédictible).
3. Session de table cumulative (commandes additionnelles).
4. Interface cuisine en temps réel.
5. Caisse avec paiements partiels et reçus.
6. Audit des actions sensibles.
7. Daily audit (comparaison temporelle).
8. Détection d'anomalies (signal, pas verdict de fraude).
9. Dashboard manager et dashboard owner.
10. Notifications internes + architecture WhatsApp.

## Exigences sécurité

- Authentification robuste.
- RBAC et permissions serveur.
- Protection IDOR/BOLA.
- Validation stricte des entrées.
- Traçabilité financière et historique immuable.
