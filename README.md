# 🏥 Herramienta Clínica: Medicamentos Peligrosos (NIOSH)

Consulta rápida y confiable de medicamentos peligrosos (Grupos 2 y 3) según NIOSH, con recomendaciones de preparación en Cabina de Seguridad Biológica.

**🚀 Demo en vivo**: [https://soker90.github.io/medicamentos-peligrosos-niosh](https://soker90.github.io/medicamentos-peligrosos-niosh)

---

## 📊 Fuente de Datos

Esta herramienta utiliza datos oficiales extraídos directamente del documento **NIOSH List of Hazardous Drugs in Healthcare Settings, 2024**.

- **Documento oficial**: [NIOSH 2025-103 PDF](https://www.cdc.gov/niosh/docs/2025-103/pdfs/2025-103.pdf)
- **Organismo**: CDC/NIOSH (Centers for Disease Control and Prevention)
- **Última actualización del documento**: 2024
- **Última extracción de datos**: Marzo 2026
- **Próxima actualización automática**: Primer día del mes siguiente (vía GitHub Actions)

### Proceso de Extracción

Los datos se obtienen mediante un proceso automatizado que:
1. Descarga el PDF oficial desde los servidores del CDC
2. Extrae el texto usando `pdftotext` (poppler-utils)
3. Parsea la "Tabla 2" con medicamentos que cumplen criterios NIOSH
4. Clasifica cada medicamento según la columna "Only Developmental and/or Reproductive Hazard":
   - **No** → Grupo 2 (antineoplásticos con riesgo carcinogénico)
   - **Yes** → Grupo 3 (solo riesgos reproductivos/del desarrollo)
5. Genera `docs/data.json` con 130 medicamentos estructurados

Este proceso se ejecuta automáticamente cada mes mediante GitHub Actions para mantener los datos actualizados.

## ✨ Características

- 📋 **Base de datos de 130 medicamentos** extraídos del documento oficial NIOSH 2025-103
- 🔍 **Búsqueda inteligente** con autocompletado
- 📊 **Vista de tabla completa** con filtrado por grupo
- 🎨 **Interfaz visual intuitiva**:
  - Grupo 2 (amarillo): Antineoplásticos → Cabina obligatoria
  - Grupo 3 (naranja): Riesgos reproductivos → Evaluar caso
- ♿ **Accesibilidad**: ARIA labels, búsqueda normalizada (sin acentos)
- 🚀 **Actualizaciones automáticas** vía GitHub Actions (primer día del mes)

## 📁 Estructura del Proyecto

```
.
├── docs/                        # GitHub Pages (aplicación web)
│   ├── index.html               # Interfaz clínica
│   ├── app.js                   # Lógica de búsqueda y tabla
│   ├── style.css                # Estilos responsivos
│   └── data.json                # Base de datos (130 registros)
├── scripts/
│   └── update_data.js           # Extractor de datos (PDF → JSON)
├── .github/
│   └── workflows/
│       └── updater.yml          # CI/CD automática (mensual)
├── package.json                 # Configuración del proyecto
├── README.md                    # Este archivo
└── ESTADO.md                    # Estado actual del proyecto
```

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18+
- `pdftotext` (para actualizaciones): `sudo apt-get install poppler-utils`

### Instalación
```bash
git clone https://github.com/usuario/herramienta-farmacia.git
cd herramienta-farmacia
npm install
```

### Generar datos (opcional)
```bash
npm run update
```

Este comando descarga el PDF oficial de NIOSH y genera `docs/data.json`.

### Servir localmente
```bash
python3 -m http.server 8000 --directory docs
# O con Node.js:
npx serve -s docs
```

Abre http://localhost:8000 en tu navegador.

### VeEstadísticas de Datos

- **Total de medicamentos**: 130
  - **Grupo 2**: 46 (antineoplásticos, riesgo carcinogénico)
  - **Grupo 3**: 84 (riesgos reproductivos/del desarrollo)
- **Fuente oficial**: NIOSH 2025-103
- **Actualización automática**: Mensual (primer día del mes a las 04:00 UTC)
- **Formato**: JSON estructuradoctions)
- **Total**: 130 medicamentos
  - Grupo 2: 46 (antineoplásticos)
  - Grupo 3: 84 (riesgos reproductivos/del desarrollo)

## 🔄 Cómo Funcionan las Actualizaciones

**Automático en GitHub:**
1. GitHub Actions ejecuta el primer día de cada mes a las 04:00 UTC
2. Descarga el PDF oficial de NIOSH
3. Extrae los medicamentos usando `pdftotext` y regex
4. Genera `public/data.json`
5. Auto-commit si hay cambios

**Localmente:**
```bash
npm run update
```

## 🎯 Uso

### Búsqueda Individual
1. Escribe el nombre del medicamento en el buscador
2. Selecciona de las sugerencias (autocompletado)
3. Haz clic en "Consultar"
4. Obtén la clasificación y recomendación al instante

### Ver Tabla Completa
1. Haz clic en "Ver tabla completa"
2. Filtra por "Grupo 2", "Grupo 3" o "Todos"
3. Explora todos los 130 medicamentos
4. Los colores indican el grupo al que pertenece

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Backend**: Node.js (actualización de datos)
- **PDF**: `pdftotext` (poppler-utils)
- **CI/CD**: GitHub Actions
- **Fuente**: NIOSH PDF oficial

## 📝 Estructura de Datos

Cada medicamento en `docs/data.json`:
```json
{
  "nombre": "abacavir",
  "grupo": "2",
  "mensaje": "Recomendación: preparar y manipular en Cabina de Seguridad Biológica según protocolo del centro."
}
```

## 🔐 Privacidad

- ✅ Aplicación completamente estática
- ✅ Sin servidor backend
- ✅ Sin base de datos remota
- ✅ Datos públicos de NIOSH
- ✅ Puede ejecutarse offline (excepto actualizaciones)

## 📜 Licencia

Este proyecto utiliza datos públicos de NIOSH. Consulta los términos de uso de NIOSH para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:
1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/improvement`)
3. Commit tus cambios (`git commit -am 'Add feature'`)
4. Push a la rama (`git push origin feature/improvement`)
5. Abre un Pull Request

## 📞 Soporte

Si encuentras medicamentos faltantes o datos incorrectos:
1. Verifica con el [PDF oficial de NIOSH](https://www.cdc.gov/niosh/docs/2025-103/pdfs/2025-103.pdf)
2. Abre un issue en GitHub
3. Incluye el nombre del medicamento y referencias de la fuente oficial

---

## 📅 Información de Actualización

| Campo | Valor |
|-------|-------|
| **Última actualización de datos** | Marzo 2026 |
| **Documento NIOSH usado** | [2025-103 PDF](https://www.cdc.gov/niosh/docs/2025-103/pdfs/2025-103.pdf) |
| **Fecha del documento oficial** | 2024 |
| **Próxima actualización automática** | 1 de Abril 2026, 04:00 UTC |
| **Frecuencia de actualización** | Mensual (primer día del mes) |
| **Estado del proyecto** | ✅ Producción |
| **GitHub Pages** | [https://soker90.github.io/medicamentos-peligrosos-niosh](https://soker90.github.io/medicamentos-peligrosos-niosh) |

### Características del Proyecto

✨ **Interfaz de usuario**
- Búsqueda inteligente con autocompletado en tiempo real
- Vista de tabla completa con 130 medicamentos
- Filtrado dinámico por grupo (Grupo 2 / Grupo 3 / Todos)
- Diseño responsive para móviles, tablets y escritorio
- Accesibilidad WCAG con ARIA labels
- Búsqueda normalizada (insensible a acentos y mayúsculas)

🎨 **Codificación visual**
- Grupo 2: Fondo amarillo (#fff4bf) - Antineoplásticos con riesgo carcinogénico
- Grupo 3: Fondo naranja (#ffe0c7) - Riesgos reproductivos/del desarrollo
- Mensajes diferenciados por tipo de riesgo

🔄 **Automatización**
- Actualización mensual automática mediante GitHub Actions
- Extracción inteligente de PDF oficial usando `pdftotext`
- Parser robusto para tablas multi-línea
- Auto-commit y despliegue en GitHub Pages

🛠️ **Stack técnico**
- Frontend: HTML5 + CSS3 + JavaScript vanilla (sin frameworks)
- Backend: Node.js 18+ (solo para actualización de datos)
- Extracción de datos: `pdftotext` (poppler-utils) + regex
- CI/CD: GitHub Actions
- Hosting: GitHub Pages (gratuito)
- Sin base de datos externa (aplicación completamente estática)

📊 **Fuente de datos confiable**
- Documento oficial del CDC/NIOSH actualizado anualmente
- Extracción automatizada sin intervención manual
- 130 medicamentos clasificados según criterios oficiales
- Trazabilidad completa hacia la fuente original

---

**Desarrollado por**: [soker90](https://github.com/soker90)  
**Licencia**: MIT  
**Contribuciones**: Bienvenidas vía Pull Request
