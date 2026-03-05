# 🏥 Herramienta Clínica: Medicamentos Peligrosos (NIOSH)

Consulta rápida y confiable de medicamentos peligrosos (Grupos 2 y 3) según NIOSH, con recomendaciones de preparación en Cabina de Seguridad Biológica.

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
├── public/
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

Este comando descarga el PDF oficial de NIOSH y genera `public/data.json`.

### Servir localmente
```bash
python3 -m http.server 8000 --directory public
# O con Node.js:
npx serve -s public
```

Abre http://localhost:8000 en tu navegador.

## 📊 Datos

- **Fuente**: NIOSH List of Hazardous Drugs in Healthcare Settings 2024
- **Documento oficial**: [NIOSH 2025-103 PDF](https://www.cdc.gov/niosh/docs/2025-103/pdfs/2025-103.pdf)
- **Actualización**: Automática mensualmente (GitHub Actions)
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

Cada medicamento en `public/data.json`:
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

**Última actualización**: Marzo 2026  
**Estado**: ✅ Funcional y producción-ready  
**Próxima actualización automática**: Primer día del próximo mes
