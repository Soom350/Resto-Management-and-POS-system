# RMTS — DEVELOPMENT PLAN (PHASE 0)

## 1) Portée de cette phase

Cette phase établit la fondation technique du projet RMTS, sans implémenter les fonctionnalités métier avancées (commandes, paiements, audit, etc.).  
Objectif: disposer d’un monorepo prêt pour le développement incrémental, avec environnement Docker fonctionnel, structure claire et plan d’exécution fiable.

---

## 2) Analyse des exigences et contradictions détectées

### 2.1 Contradictions / divergences

1. **Statuts de commande différents selon les documents**
   - Cahier: `CRÉÉE -> REÇUE -> ACCEPTÉE -> EN PRÉPARATION -> PRÊTE -> SERVIE -> EN ATTENTE DE PAIEMENT -> PAYÉE -> CLÔTURÉE`.
   - Architecture: `PENDING, ACCEPTED, PREPARING, READY, SERVED, CANCEL_REQUESTED, CANCELLED, PAYMENT_PENDING, PAID, CLOSED`.
   - **Décision**: utiliser les enums techniques de l’architecture (`PENDING`, `ACCEPTED`, etc.) et documenter un mapping UI lisible.

2. **Modèle utilisateur**
   - Cahier simplifie parfois avec `users.restaurant_id`.
   - Architecture définit correctement `users` + `restaurant_users` (multi-restaurant).
   - **Décision**: adopter `restaurant_users` comme vérité de conception (multi-tenancy robuste).

3. **Source “documents de vérité” dans le dépôt**
   - Les fichiers actuels du repo sont des placeholders, alors que les documents fournis (upload) sont détaillés.
   - **Décision**: considérer les documents uploadés comme référence immédiate pour l’implémentation, puis aligner progressivement la documentation versionnée.

4. **Owner app**
   - Cahier: React Native possible.
   - Architecture: V1 web responsive, React Native ensuite.
   - **Décision**: V1 sur `owner-web` (Next.js), architecture mobile native prévue en évolution.

5. **WhatsApp**
   - Cahier: évoque intégration progressive.
   - Prompt maître: impose architecture WhatsApp dans le scope global.
   - **Décision**: architecture + provider mock dès la fondation logicielle, provider réel activable par variables d’environnement.

6. **Routes de reçu**
   - Prompt: `/receipt/:id` (page publique).
   - Architecture API: `/api/v1/public/receipts/verify/:token`.
   - **Décision**: conserver les deux usages, avec séparation:
     - frontend public: `/receipt/:id` (ou token),
     - backend: endpoint de vérification sécurisé.

### 2.2 Ambiguïtés à lever (spécification interne)

1. Politique de **remises** (niveau commande / session / item).
2. Gestion de **taxes/service charges** (activables par restaurant).
3. Définition exacte de **paiement partiel** et clôture auto.
4. Modèle de **session client public** (identifiant anonyme par table/session).
5. Politique de **rétention** et d’immutabilité audit (DB + export externe).
6. Politique de **suppression logique** uniforme (champ `deleted_at` vs `status`).

---

## 3) Architecture générale retenue

- **Monorepo** `pnpm` + `turbo`.
- **Backend**: NestJS + TypeScript + Prisma + PostgreSQL + Socket.IO.
- **Frontends**:
  - `customer-web` (mobile-first QR/menu/commande),
  - `restaurant-web` (kitchen/cashier/manager),
  - `owner-web` (vision multi-restaurants).
- **Infra**: Docker Compose (PostgreSQL, Redis, Nginx).
- **Sécurité**: JWT court + refresh rotatif, validation stricte, RBAC, tenant isolation.

---

## 4) Structure finale du repository

```text
rmts/
├── apps/
│   ├── api/
│   ├── customer-web/
│   ├── restaurant-web/
│   └── owner-web/
├── packages/
│   ├── shared/
│   ├── types/
│   ├── validation/
│   ├── ui/
│   └── config/
├── prisma/
├── docs/
├── scripts/
├── docker/
├── tests/
├── DEVELOPMENT_PLAN.md
├── .env.example
├── docker-compose.yml
├── package.json
└── README.md
```

---

## 5) Modules backend prévus

1. `auth`
2. `users`
3. `restaurants`
4. `tables` (+ QR)
5. `menu` (catégories, produits, options)
6. `sessions`
7. `orders`
8. `kitchen`
9. `payments`
10. `receipts`
11. `cash-register`
12. `audit`
13. `daily-audit`
14. `analytics`
15. `notifications`
16. `whatsapp`
17. `websocket`
18. `security`

---

## 6) Base de données (cible fonctionnelle)

Tables cœur:
- `users`
- `restaurants`
- `restaurant_users`
- `tables`
- `categories`
- `menu_items`
- `menu_item_options`
- `table_sessions`
- `orders`
- `order_items`
- `payments`
- `receipts`
- `cash_registers`
- `cash_movements`
- `audit_logs`
- `daily_audits`
- `notifications`

Compléments recommandés:
- `idempotency_keys`
- `anomalies`
- `refresh_tokens`
- `password_reset_tokens`

Principes:
- UUID partout,
- FKs + index composés,
- contraintes d’unicité par tenant,
- soft delete sur ressources éditoriales,
- transactions SQL sur commandes/paiements/clôtures.

---

## 7) API (orientation V1)

- Préfixe: `/api/v1`.
- Format de réponse unifié (`success`, `data`, `error`, `requestId`).
- Public:
  - QR table lookup,
  - création/récupération de session de table,
  - lecture menu public,
  - commandes client en session.
- Privé:
  - endpoints restaurant/cuisine/caisse/manager/owner protégés par Auth + RBAC + tenant scope.

---

## 8) Frontends

### 8.1 customer-web
- Routes: `/t/[qrToken]`, `/menu`, `/cart`, `/orders`, `/bill`.
- Mobile-first, latence faible, UX simple.

### 8.2 restaurant-web
- Sections: dashboard, kitchen, cashier, tables, menu, audit, settings.
- Utilisation Socket.IO client.

### 8.3 owner-web
- Vue consolidée multi-restaurants.
- Filtres global/single restaurant.

---

## 9) WebSocket

Rooms:
- `restaurant:{restaurantId}`
- `restaurant:{restaurantId}:kitchen`
- `restaurant:{restaurantId}:cashier`
- `table:{tableId}`
- `session:{sessionId}`
- `user:{userId}`

Events:
- `order.created`
- `order.status_changed`
- `session.order_added`
- `payment.completed`
- `table.available`
- `anomaly.detected`

Règle: WebSocket notifie, PostgreSQL confirme l’état de vérité.

---

## 10) Authentification & RBAC

- Login/logout/refresh/changement mot de passe.
- Hash mots de passe: Argon2id.
- Rotation refresh token.
- Architecture MFA (activation progressive).
- Vérification systématique:
  1. identité authentifiée,
  2. rôle,
  3. permission,
  4. appartenance restaurant,
  5. ownership ressource.

---

## 11) Sécurité (cible)

- Validation DTO stricte.
- Rate limiting (Redis).
- CORS explicite.
- Headers via Helmet + Nginx.
- Protection IDOR/BOLA, élévation privilège.
- Request ID global.
- Paiements idempotents.
- Audit append-only.

---

## 12) Stratégie de tests

- **Unit**: services métier critiques.
- **Integration**: API + PostgreSQL transactionnel.
- **E2E**: parcours complet QR -> commande -> cuisine -> paiement -> reçu -> audit.
- **Security**: IDOR, cross-tenant, duplication paiement, manipulation prix.

---

## 13) Docker / Déploiement

- `docker compose up`:
  - `postgres`
  - `redis`
  - `nginx`
- Config `.env` unique, variables claires par domaine.
- Déploiement cible: Nginx reverse proxy, API Nest, apps Next, PostgreSQL managé possible.

---

## 14) Ordre exact de développement

1. **PHASE 0** — Fondation monorepo + Docker + env + plan (ce livrable)
2. **PHASE 1** — Schéma Prisma complet + migrations + seed réaliste
3. **PHASE 2** — Auth (login/logout/refresh/password/MFA architecture)
4. **PHASE 3** — RBAC + permission matrix + guards
5. **PHASE 4** — Multi-tenancy enforcement complet
6. **PHASE 5** — Tables + QR sécurisé + session publique
7. **PHASE 6** — Menu/catégories/options + recalcul prix backend
8. **PHASE 7** — Customer app (menu/panier/commande/suivi/addition)
9. **PHASE 8** — Order lifecycle + snapshots + annulations
10. **PHASE 9** — Kitchen real-time
11. **PHASE 10** — WebSocket rooms/events finaux
12. **PHASE 11** — Commandes supplémentaires cumulatives
13. **PHASE 12** — Cashier app + fermeture session
14. **PHASE 13** — Paiements + idempotence + remboursements
15. **PHASE 14** — Reçus + vérification publique
16. **PHASE 15** — Cash register + écarts
17. **PHASE 16** — Audit log immuable
18. **PHASE 17** — Daily audit + comparaison temporelle
19. **PHASE 18** — Anomaly engine
20. **PHASE 19** — Manager dashboard complet
21. **PHASE 20** — Owner dashboard multi-restaurants
22. **PHASE 21** — Notifications + WhatsApp provider/mock
23. **PHASE 22** — Security hardening complet
24. **PHASE 23** — Suite de tests (unit/int/e2e/security) élargie
25. **PHASE 24** — Documentation finale + déploiement

---

## 15) Checklist des fonctionnalités (suivi)

- [x] Plan de développement consolidé
- [x] Analyse contradictions + décisions d’architecture
- [x] Fondation monorepo (apps/packages/docs/prisma/docker/tests)
- [x] Docker Compose avec PostgreSQL/Redis/Nginx
- [x] Variables d’environnement de base
- [x] README d’amorçage
- [ ] Prisma schema complet + migrations
- [ ] Auth + RBAC + multi-tenant guards
- [ ] QR/tables/menu/commandes/paiements/reçus
- [ ] Audit + daily audit + anomalies
- [ ] Notifications WhatsApp
- [ ] Tests complets + CI/CD

