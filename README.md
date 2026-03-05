# Herramienta Clinica: Medicamentos Peligrosos (Grupo 2 y 3)

Web estatica para consultar si un medicamento pertenece a los Grupos 2 o 3 y mostrar la recomendacion de preparacion en Cabina de Seguridad Biologica.

## Estructura

- `public/index.html`
- `public/style.css`
- `public/app.js`
- `public/data.json`
- `scripts/update_data.js`
- `.github/workflows/updater.yml`

## Inicializacion

1. Instala dependencias:
   `npm install`
2. Actualiza la base de datos desde CSV:
   `npm run update`
3. Sirve la carpeta `public` localmente (ejemplo):
   `npx serve public`

## Despliegue en GitHub Pages

1. Sube el repositorio a GitHub.
2. Activa **Settings > Pages** y selecciona **GitHub Actions** como source.
3. Ejecuta el workflow `updater.yml` manualmente o espera al cron mensual.

## Nota de fuente de datos

El script usa como fuente oficial el documento NIOSH 2025-103:
`https://www.cdc.gov/niosh/docs/2025-103/pdfs/2025-103.pdf`

Si en el futuro INSST publica un CSV estructurado y estable, puedes adaptar el parser manteniendo el mismo formato de salida en `public/data.json`.
