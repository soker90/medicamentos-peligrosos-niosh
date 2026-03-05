# Estado del Proyecto: Herramienta Clínica NIOSH/INSST

## ✅ Proyecto Completado

El proyecto está **completamente funcional y listo para usar en local** con todos los datos correctos.

## 📊 Dataset

- **Total de fármacos**: 130 drogas peligrosas
- **Grupo 2** (antineoplásticos): 46 drogas
- **Grupo 3** (riesgos reproductivos/del desarrollo): 84 drogas
- **Fuente**: NIOSH 2025-103 (PDF oficial)
- **Actualización**: Mensual automática vía GitHub Actions

## Estructura del Proyecto

```
farmacia/
├── public/
│   ├── index.html          # Interfaz clínica
│   ├── app.js              # Lógica de búsqueda
│   ├── style.css           # Estilos
│   └── data.json           # Base de datos (130 registros)
├── scripts/
│   └── update_data.js      # Script que genera data.json desde PDF oficial
├── .github/
│   └── workflows/
│       └── updater.yml     # CI/CD: actualización mensual automática
├── package.json            # Configuración del proyecto
├── README.md               # Documentación
└── ESTADO.md              # Este archivo
```

## 🚀 Características

### Interfaz Clínica
- **Búsqueda rápida**: Autocomplete mientras escribes
- **Clasificación visual**: 
  - Grupo 2 (amarillo): Antineoplásticos → Cabina obligatoria
  - Grupo 3 (naranja): Riesgos reproductivos → Evaluar caso por caso
- **Normalizaacion**: Búsqueda insensible a mayúsculas y acentos
- **Sin dependencias externas**: Solo HTML/CSS/JavaScript vanilla

### Pipeline de Datos
1. **Descarga**: Script obtiene PDF oficial desde CDC/NIOSH
2. **Extracción**: `pdftotext` convierte PDF a texto limpio
3. **Parsing**: Estado máquina inteligente para drogas multi-línea
4. **Generación**: JSON estructurado con nombres, grupo y mensaje
5. **Automatización**: GitHub Actions ejecuta mensualmente (primer día del mes, 04:00 UTC)

## 📝 Campos por Droga

```json
{
  "nombre": "abacavir",
  "grupo": "2",
  "mensaje": "Recomendación: preparar y manipular en Cabina de Seguridad Biológica según protocolo del centro."
}
```

## 🏃 Uso Local

### Primera ejecución (generar data.json):
```bash
cd /hdd/Proyectos/farmacia
npm install      # Instala Node.js (sin dependencias npm)
npm run update   # Descarga PDF y genera public/data.json
```

### Servir aplicación:
```bash
cd /hdd/Proyectos/farmacia
python3 -m http.server 8000 --directory public
# Abre http://localhost:8000 en navegador
```

## 🔄 Automatización (GitHub Actions)

El archivo `.github/workflows/updater.yml` configura:
- **Trigger**: Primer día de cada mes a las 04:00 UTC
- **Pasos**:
  1. Checkout del repositorio
  2. Setup Node.js
  3. Instala `poppler-utils` (para `pdftotext`)
  4. Ejecuta `npm run update`
  5. Auto-commit si hay cambios en `public/data.json`

No requiere configuración adicional en GitHub.

## 🔧 Tecnologías

- **Frontend**: HTML5 + CSS3 + JavaScript (vanilla)
- **Backend**: Node.js 18+ (actualización de datos)
- **Extracción PDF**: `pdftotext` (poppler-utils)
- **CI/CD**: GitHub Actions
- **Fuente de datos**: NIOSH 2025-103 (oficial)

## 📌 Notas Técnicas

- **Sin npm dependencies**: El script usa solo módulos built-in de Node.js (`fs`, `path`, `child_process`) + fetch API nativa
- **pdftotext requerido**: En CI/CD se instala vía `sudo apt-get install poppler-utils`
- **Data.json cacheado**: Cliente descarga una sola vez; búsquedas son O(1) via Map normalizado

## ✨ Validación Final

```text
✓ total: 130  grupo2: 46  grupo3: 84
✓ primero: abacavir
✓ último: zonisamide
✓ Búsqueda funcional: ciclofosfamida ✓ finasterida ✓
```

---

**Proyecto completado**: `2025-01-05`  
**Estado**: ✅ Funcional en local, listo para producción  
**Próxima actualización automática**: Mes próximo, primer día a las 04:00 UTC
