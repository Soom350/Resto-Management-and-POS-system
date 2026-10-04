# WebSocket — RMTS

## Namespace

- `/ws`

## Rooms

- `restaurant:{restaurantId}`
- `restaurant:{restaurantId}:kitchen`
- `restaurant:{restaurantId}:cashier`
- `table:{tableId}`
- `session:{sessionId}`
- `user:{userId}`

## Événements clés

- `order.created`
- `order.status_changed`
- `session.order_added`
- `payment.completed`
- `table.available`
- `anomaly.detected`

## Règle d'architecture

Le WebSocket diffuse l'information en temps réel, mais PostgreSQL reste la source de vérité.
