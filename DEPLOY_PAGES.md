# Despliegue en Cloudflare Pages

Si tu sitio está en **Cloudflare Pages** (no Workers), sigue estos pasos:

## Solución Rápida: Subir el archivo de configuración

El archivo `vapi-config.js` ya tiene los valores correctos. Solo necesitas subirlo a producción:

### Opción A: Forzar commit del archivo (más fácil)

```bash
# Forzar el commit del archivo (aunque esté en .gitignore)
git add -f public/assets/js/vapi-config.js
git commit -m "Add vapi config for production"
git push
```

Luego, en Cloudflare Pages, el archivo se desplegará automáticamente.

### Opción B: Subir manualmente

1. Ve a Cloudflare Pages → tu proyecto
2. Ve a **Deployments** → **Upload assets**
3. Sube el archivo `public/assets/js/vapi-config.js` a la ruta `assets/js/vapi-config.js`

## Opción Alternativa: Conectar el Worker al dominio

Si prefieres usar el Worker (más seguro, pero más complejo):

1. Ve al dashboard de Cloudflare: https://dash.cloudflare.com
2. Ve a **Workers & Pages** → Selecciona **amavis-home-site**
3. Ve a la pestaña **Settings** → **Domains & Routes**
4. Haz clic en **Add Custom Domain**
5. Ingresa: `amavis.ai`
6. Cloudflare configurará automáticamente el DNS

**Nota:** Esto hará que TODO el sitio pase por el Worker, no solo alex.html.

## Verificar

Después de desplegar, visita `https://amavis.ai/alex.html` y verifica que:
- El widget aparece
- No hay errores en la consola (F12)
- Puedes interactuar con el agente

