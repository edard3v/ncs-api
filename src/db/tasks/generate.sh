# Elimina la carpeta de migraciones
rm -rf src/db/migrations

# Elimina la db
rm -rf src/db/ncs.db

# Genera una nueva migración
deno -A --node-modules-dir npm:drizzle-kit generate