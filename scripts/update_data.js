const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const SOURCE_URL =
  "https://www.cdc.gov/niosh/docs/2025-103/pdfs/2025-103.pdf";
const OUTPUT_FILE = path.resolve(__dirname, "../docs/data.json");
const TABLE_END_MARKER = "Changes to the Placement of Drugs From the 2016 List";

function isSkippableLine(line) {
  return (
    line.length === 0 ||
    /^\d+$/.test(line) ||
    line.startsWith("Table 2") ||
    line.includes("(Continued)") ||
    line.startsWith("Biologics License") ||
    line.startsWith("Application") ||
    line.startsWith("or Reproductive Hazard") ||
    line === "Drug" ||
    line === "AHFS Classification" ||
    line === "AHFS Classifcation" ||
    line === "\u2020" ||
    line === "\u2020\u2020" ||
    line.includes("carcinogenic to humans") ||
    line.startsWith("classifed by NTP") ||
    line.startsWith("classified by NTP") ||
    line.startsWith("as Group") ||
    line.startsWith("also have adverse") ||
    line.startsWith("adverse developmental") ||
    line.startsWith("MSHI, are not")
  );
}

function isAhfsLine(line) {
  return /^(NA|\d{1,2}:)/.test(line);
}

function isYesNoLine(line) {
  return /^(Yes|No)([\u2020]+)?$/i.test(line);
}

function buildMessage(group) {
  if (group === "2") {
    return "Recomendación: preparar y manipular en Cabina de Seguridad Biológica según protocolo del centro.";
  }

  return "Recomendación: evaluar manipulación en Cabina de Seguridad Biológica y aplicar medidas de protección establecidas.";
}

async function downloadAndParsePdf() {
  const response = await fetch(SOURCE_URL);
  if (!response.ok || !response.body) {
    throw new Error(`No se pudo descargar la fuente oficial (${response.status})`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "niosh-"));
  const pdfPath = path.join(tmpDir, "source.pdf");
  const txtPath = path.join(tmpDir, "source.txt");

  fs.writeFileSync(pdfPath, buffer);
  execFileSync("pdftotext", [pdfPath, txtPath]);

  const allLines = fs
    .readFileSync(txtPath, "utf8")
    .split(/\r?\n/)
    .map((line) => String(line || "").trim());

  const tableStartIndex = allLines.findIndex((line) =>
    line.includes("Table 2. Drugs that meet the NIOSH")
  );
  if (tableStartIndex === -1) {
    throw new Error("No se encontró Table 2 en la fuente oficial.");
  }

  const firstDrugIndex = allLines.findIndex(
    (line, idx) => idx > tableStartIndex && line.toLowerCase() === "abacavir"
  );
  if (firstDrugIndex === -1) {
    throw new Error("No se pudo detectar el inicio del listado de fármacos.");
  }

  const tableEndIndex = allLines.findIndex(
    (line, idx) => idx > firstDrugIndex && line.includes(TABLE_END_MARKER)
  );

  const lines = allLines.slice(
    firstDrugIndex,
    tableEndIndex === -1 ? allLines.length : tableEndIndex
  );

  const rows = [];
  let i = 0;

  while (i < lines.length) {
    while (
      i < lines.length &&
      (isSkippableLine(lines[i]) || isAhfsLine(lines[i]) || isYesNoLine(lines[i]))
    ) {
      i += 1;
    }

    if (i >= lines.length) {
      break;
    }

    let nombre = lines[i];
    i += 1;

    while (
      i < lines.length &&
      !isSkippableLine(lines[i]) &&
      !isAhfsLine(lines[i]) &&
      !isYesNoLine(lines[i])
    ) {
      nombre += ` ${lines[i]}`;
      i += 1;
    }

    while (i < lines.length && !isYesNoLine(lines[i])) {
      i += 1;
    }
    if (i >= lines.length) {
      break;
    }
    i += 1;

    while (i < lines.length && !isYesNoLine(lines[i])) {
      i += 1;
    }
    if (i >= lines.length) {
      break;
    }

    const reproductiveFlag = lines[i];
    i += 1;

    const normalizedName = nombre.replace(/\s+/g, " ").trim();
    if (
      !normalizedName ||
      isSkippableLine(normalizedName) ||
      normalizedName === "AHFS Classifcation"
    ) {
      continue;
    }

    const group = reproductiveFlag.toLowerCase().startsWith("yes") ? "3" : "2";
    rows.push({
      nombre: normalizedName,
      grupo: group,
      mensaje: buildMessage(group),
    });
  }

  const dedupedMap = new Map();
  rows.forEach((row) => {
    dedupedMap.set(row.nombre.toLowerCase(), row);
  });

  return [...dedupedMap.values()];
}

async function run() {
  try {
    const data = await downloadAndParsePdf();

    data.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));

    fs.writeFileSync(OUTPUT_FILE, `${JSON.stringify(data, null, 2)}\n`, "utf8");
    console.log(`public/data.json actualizado con ${data.length} registros.`);
  } catch (error) {
    console.error("Error al actualizar datos:", error.message);
    process.exit(1);
  }
}

run();
