# Gastos

Registro minimalista de gastos **diarios, semanales y mensuales**. No usa base de datos ni backend:
todo se guarda en el `localStorage` del navegador, con exportación/importación en JSON para respaldo.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Zustand (`persist` sobre `localStorage`)
- Recharts (gráfica de tendencia)
- date-fns (agrupación por día/semana/mes, en español)

## Uso

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint
npm run build    # genera dist/ (sitio estático)
npm run preview
```

`dist/` es estático y se puede publicar en Vercel, Netlify o GitHub Pages sin configuración extra
(`base: './'` ya está definido en `vite.config.ts` para rutas relativas).

## Funcionalidad

- Agregar gasto: monto, categoría, nota y fecha.
- Pestañas Diario / Semanal / Mensual con total del periodo y desglose por categoría.
- Gráfica de los últimos 7 días, 8 semanas o 6 meses según la pestaña.
- Lista de movimientos del periodo con eliminación individual.
- Selector de moneda, exportar/importar respaldo JSON y borrar todo.

## Estructura

```
src/
  App.tsx              layout y composición de las vistas
  store.ts             estado + persistencia en localStorage
  types.ts
  lib/stats.ts         intervalos, totales, series y formato de moneda/fechas
  lib/backup.ts        exportar/validar/importar JSON
  lib/categories.ts    categorías y colores
  components/
```
