# template_deno

- Fije variables de entorno, tome como ejemplo .example.env
- Fije la ruta local en drizzle.config.ts e ignorarla modificando .gitignore
- Ajusta o cambia `template` en generate.sh
- Genera una nueva migración con `deno run generate`
- Push la migración a la db local con `deno run migrate` y si desea a la db remota `deno run remote:migrate`
- `deno run dev`
