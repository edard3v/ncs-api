# Elimina la carpeta de migraciones
rm -rf src/db/migrations

# Genera una nueva migración
deno -A --node-modules-dir npm:drizzle-kit generate