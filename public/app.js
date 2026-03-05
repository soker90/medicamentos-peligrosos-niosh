const DATA_URL = "./data.json";
const resultEl = document.getElementById("result");
const formEl = document.getElementById("search-form");
const inputEl = document.getElementById("med-input");
const datalistEl = document.getElementById("medications-list");
const toggleTableBtn = document.getElementById("toggle-table-btn");
const tableSection = document.getElementById("table-section");
const tableBody = document.getElementById("table-body");
const groupFilter = document.getElementById("group-filter");

let records = [];
const recordMap = new Map();

function normalize(value) {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function setResult(type, title, lines) {
  resultEl.classList.remove("result-group2", "result-group3", "result-neutral");
  resultEl.classList.add(type);
  resultEl.innerHTML = `
    <h3>${title}</h3>
    ${lines.map((line) => `<p>${line}</p>`).join("")}
  `;
}

async function loadData() {
  try {
    const response = await fetch(DATA_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`No se pudo cargar data.json (${response.status})`);
    }

    records = await response.json();
    records.forEach((item) => {
      if (item?.nombre) {
        recordMap.set(normalize(item.nombre), item);
      }
    });

    const sortedNames = [...records]
      .map((item) => item.nombre)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, "es"));

    datalistEl.innerHTML = sortedNames
      .map((name) => `<option value="${name}"></option>`)
      .join("");
  } catch (error) {
    console.error(error);
    setResult("result-neutral", "Error al cargar datos", [
      "No se pudo cargar la base de medicamentos.",
      "Verifica que exista el archivo public/data.json.",
    ]);
  }
}

function searchMedication(name) {
  const key = normalize(name);
  const match = recordMap.get(key);

  if (!match) {
    setResult("result-neutral", "Sin coincidencias", [
      `No encontramos "${name}" en la lista actual.`,
      "Prueba con otro nombre o selecciona una opción del autocompletado.",
    ]);
    return;
  }

  const isGroup2 = String(match.grupo).trim() === "2";
  const visualType = isGroup2 ? "result-group2" : "result-group3";

  setResult(visualType, `Alerta: Grupo ${match.grupo}`, [
    `Medicamento: ${match.nombre}`,
    match.mensaje,
  ]);
}

function renderTable(filteredRecords) {
  tableBody.innerHTML = filteredRecords
    .map((item) => {
      const groupClass = item.grupo === "2" ? "group-2" : "group-3";
      return `
        <tr class="${groupClass}">
          <td class="cell-nombre">${item.nombre}</td>
          <td class="cell-grupo">Grupo ${item.grupo}</td>
          <td class="cell-mensaje">${item.mensaje}</td>
        </tr>
      `;
    })
    .join("");
}

function filterAndRenderTable() {
  const filterValue = groupFilter.value;
  const filtered =
    filterValue === "all"
      ? records
      : records.filter((r) => r.grupo === filterValue);
  renderTable(filtered);
}

toggleTableBtn.addEventListener("click", () => {
  tableSection.classList.toggle("hidden");
  if (!tableSection.classList.contains("hidden")) {
    filterAndRenderTable();
    tableSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

groupFilter.addEventListener("change", filterAndRenderTable);

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = inputEl.value;
  if (!value.trim()) {
    setResult("result-neutral", "Campo obligatorio", [
      "Escribe un medicamento para realizar la consulta.",
    ]);
    return;
  }

  searchMedication(value);
});

loadData();
