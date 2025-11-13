# Guía de Despliegue / Deployment Guide

## 🚀 Despliegue a Producción

### Paso 1: Instalar Dependencias (si no lo has hecho)

```bash
npm install
```

### Paso 2: Configurar Variables de Entorno

Antes de desplegar, necesitas configurar las variables de entorno en Cloudflare Workers:

```bash
# Configurar las variables de Vapi (para alex.html)
npx wrangler secret put VAPI_ASSISTANT_ID
# Cuando te pida el valor, pega: fabb1f08-48b5-4635-ae21-40b2f9bac8ed

npx wrangler secret put VAPI_PUBLIC_KEY
# Cuando te pida el valor, pega: 4b14f51b-da4e-4656-8fd4-1e0dc53044b8
```

**Nota:** Si prefieres instalar wrangler globalmente, puedes hacerlo con:
```bash
npm install -g wrangler
```
Luego podrás usar `wrangler` directamente sin `npx`.

### Paso 3: Desplegar

```bash
npm run deploy
# o
wrangler deploy
```

### Paso 4: Verificar

1. Visita tu sitio en producción
2. Navega a `/alex.html`
3. Abre la consola del navegador (F12)
4. Verifica que no hay errores y que el widget se carga correctamente

## 🔧 Desarrollo Local

Para desarrollo local, el archivo `public/assets/js/vapi-config.js` se usará como fallback.

**Importante:** Este archivo está en `.gitignore` y NO se sube a producción. En producción, las variables de entorno se inyectan automáticamente por el Worker.

## 📝 Variables de Entorno Disponibles

- `VAPI_ASSISTANT_ID` - ID del asistente de Vapi
- `VAPI_PUBLIC_KEY` - Clave pública de Vapi
- `ANAM_API_KEY` - Clave API de Anam.ai (si la usas)

## 🔒 Seguridad

- ✅ Las claves NO están en el código fuente
- ✅ Las claves NO están en el repositorio Git
- ✅ Las claves se inyectan dinámicamente en producción
- ✅ Solo se exponen en el HTML cuando se sirve la página

## ❓ Troubleshooting

**El widget no aparece:**
1. Verifica que las variables de entorno están configuradas: `npx wrangler secret list`
2. Revisa la consola del navegador para errores
3. Verifica que el script de Vapi se carga correctamente

**Error "VAPI_CONFIG not found":**
- En producción: Verifica que `VAPI_ASSISTANT_ID` y `VAPI_PUBLIC_KEY` están configuradas
- En desarrollo local: Asegúrate de que `vapi-config.js` existe y tiene los valores correctos

