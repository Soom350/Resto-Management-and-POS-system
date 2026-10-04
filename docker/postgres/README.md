# PostgreSQL local (RMTS)

Le service PostgreSQL est démarré par `docker compose`.

Initialisation:
- extensions SQL dans `docker/postgres/init/`

Persistance:
- volume Docker nommé `rmts_postgres_data`
