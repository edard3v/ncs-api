# NCS

- Fije variables de entorno, tome como ejemplo .example.env
- Fije la ruta local en drizzle.config.ts
- Genera una nueva migración con `deno run generate`
- Push la migración a la db local con `deno run migrate` y si desea a la db remota cambie en .env ENV de local a production
- `deno run dev`

# Actualizar dependencias

Esto fuerza a Deno a recachear todas las dependencias importadas desde ese archivo.

- deno cache --reload src/main.ts
