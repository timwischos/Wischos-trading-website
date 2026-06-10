import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputPath = "docs/quotations/argos-promo-wgs001-wgs002-quotation.xlsx";
const previewDir = ".output/argos-quotation-xlsx-preview";

const palette = {
  ink: "#171717",
  muted: "#646464",
  copper: "#B87333",
  surface: "#FBFAF8",
  soft: "#F3EEE8",
  line: "#DED8D1",
  input: "#FFF2CC",
  formula: "#F7F7F7",
  white: "#FFFFFF",
};

function styleTitle(range) {
  range.format = {
    fill: palette.ink,
    font: { name: "Arial", size: 18, color: "#FFFFFF", bold: true },
    horizontalAlignment: "left",
    verticalAlignment: "center",
  };
}

function styleSection(range) {
  range.format = {
    fill: palette.soft,
    font: { name: "Arial", size: 11, color: palette.ink, bold: true },
    horizontalAlignment: "left",
    verticalAlignment: "center",
    borders: { preset: "outside", style: "thin", color: palette.line },
  };
}

function styleHeader(range) {
  range.format = {
    fill: palette.soft,
    font: { name: "Arial", size: 10, color: palette.ink, bold: true },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    wrapText: true,
    borders: { preset: "all", style: "thin", color: palette.line },
  };
}

function styleBody(range) {
  range.format = {
    fill: palette.white,
    font: { name: "Arial", size: 10, color: palette.ink },
    verticalAlignment: "center",
    wrapText: true,
    borders: { preset: "all", style: "thin", color: palette.line },
  };
}

function styleInput(range) {
  range.format = {
    fill: palette.input,
    font: { name: "Arial", size: 10, color: palette.ink, bold: true },
    horizontalAlignment: "right",
    verticalAlignment: "center",
    borders: { preset: "all", style: "thin", color: palette.line },
  };
}

function styleFormula(range) {
  range.format = {
    fill: palette.formula,
    font: { name: "Arial", size: 10, color: palette.ink, bold: true },
    horizontalAlignment: "right",
    verticalAlignment: "center",
    borders: { preset: "all", style: "thin", color: palette.line },
  };
}

function setWidths(sheet, widths) {
  widths.forEach((width, index) => {
    const col = String.fromCharCode(65 + index);
    sheet.getRange(`${col}1:${col}120`).format.columnWidth = width;
  });
}

function setRowHeights(sheet, rows) {
  for (const [row, height] of Object.entries(rows)) {
    sheet.getRange(`A${row}:K${row}`).format.rowHeight = height;
  }
}

const workbook = Workbook.create();
const quote = workbook.worksheets.add("Quotation");
const components = workbook.worksheets.add("Components");
const terms = workbook.worksheets.add("Terms");

for (const sheet of [quote, components, terms]) {
  sheet.showGridLines = false;
}

// Quotation sheet
setWidths(quote, [15, 24, 11, 15, 15, 15, 15, 15, 15, 20, 20]);
quote.getRange("A1:K1").merge();
quote.getRange("A1").values = [["WISCHOS GIFT - EDITABLE QUOTATION"]];
styleTitle(quote.getRange("A1:K1"));
setRowHeights(quote, { 1: 30, 3: 24, 10: 25, 18: 24, 25: 24 });

quote.getRange("A2:K2").merge();
quote.getRange("A2").values = [[
  "Customer-ready Excel version. Yellow cells are editable inputs; grey total cells are formula-driven.",
]];
quote.getRange("A2:K2").format = {
  fill: palette.surface,
  font: { name: "Arial", size: 10, color: palette.muted, italic: true },
};

quote.getRange("A4:B8").values = [
  ["Quotation No.", "WG-ARGOS-20260602-01"],
  ["Date", "2 June 2026"],
  ["Prepared for", "Argos Promo, New Zealand"],
  ["Validity", "14 days, subject to freight space"],
  ["Contact", "inquiries@wischosgift.com"],
];
quote.getRange("D4:E8").values = [
  ["Quantity basis", "100 sets per design"],
  ["Currency", "USD"],
  ["Lead time", "25-35 days after approval"],
  ["Destination", "Auckland, New Zealand"],
  ["Website", "wischosgift.com"],
];
styleBody(quote.getRange("A4:E8"));
quote.getRange("A4:A8").format.fill = palette.soft;
quote.getRange("D4:D8").format.fill = palette.soft;
quote.getRange("B4:B8").format.fill = palette.input;
quote.getRange("E4:E8").format.fill = palette.input;

quote.getRange("A10:K10").merge();
quote.getRange("A10").values = [["PRICE SUMMARY"]];
styleSection(quote.getRange("A10:K10"));

quote.getRange("A11:K11").values = [[
  "Set",
  "Set Name",
  "Quantity",
  "FOB / Set",
  "FOB Total",
  "CIF Auckland / Set",
  "CIF Total",
  "DAP Auckland / Set",
  "DAP Total",
  "Packaging Basis",
  "Notes",
]];
styleHeader(quote.getRange("A11:K11"));

quote.getRange("A12:K13").values = [
  [
    "WGS-001-3",
    "The Desk Starter",
    100,
    10.8,
    "",
    14.8,
    "",
    19.8,
    "",
    "Standard set packaging with EVA insert",
    "Entry-tier desk gift set; component finishes and box details adjustable.",
  ],
  [
    "WGS-002-3",
    "The Mechanical Desk",
    100,
    26.8,
    "",
    32.8,
    "",
    39.8,
    "",
    "Standard set packaging with EVA insert",
    "Executive desk set with bolt-action pen, propeller opener, and aluminium stand.",
  ],
];
quote.getRange("E12:E13").formulas = [["=C12*D12"], ["=C13*D13"]];
quote.getRange("G12:G13").formulas = [["=C12*F12"], ["=C13*F13"]];
quote.getRange("I12:I13").formulas = [["=C12*H12"], ["=C13*H13"]];
styleBody(quote.getRange("A12:K13"));
for (const range of ["C12:D13", "F12:F13", "H12:H13"]) {
  styleInput(quote.getRange(range));
}
for (const range of ["E12:E13", "G12:G13", "I12:I13"]) {
  styleFormula(quote.getRange(range));
}
quote.getRange("C12:I13").format.numberFormat = "$#,##0.00";
quote.getRange("C12:C13").format.numberFormat = "0";
quote.getRange("A12:B13").format.font = { name: "Arial", size: 10, color: palette.ink, bold: true };

quote.getRange("A16:C16").values = [["Editable input", "Formula total", "Text / terms"]];
quote.getRange("A16").format.fill = palette.input;
quote.getRange("B16").format.fill = palette.formula;
quote.getRange("C16").format.fill = palette.white;
quote.getRange("A16:C16").format = {
  font: { name: "Arial", size: 9, color: palette.ink, bold: true },
  borders: { preset: "all", style: "thin", color: palette.line },
  horizontalAlignment: "center",
};

quote.getRange("A18:K18").merge();
quote.getRange("A18").values = [["CUSTOMER-FACING DESCRIPTION"]];
styleSection(quote.getRange("A18:K18"));
quote.getRange("A19:K23").values = [
  ["WGS-001-3", "The Desk Starter", "Entry-tier desk gift set for daily desk visibility: writing, opening mail, and branded page marking.", "", "", "", "", "", "", "", ""],
  ["", "Components", "WP-102 Executive Dual-Head Metal Pen; WP-203 Executive Zinc Alloy Letter Opener; WP-205 Precision Custom Metal Bookmark.", "", "", "", "", "", "", "", ""],
  ["WGS-002-3", "The Mechanical Desk", "Executive desk gift set built around three tactile actions: writing, opening mail, and holding a device.", "", "", "", "", "", "", "", ""],
  ["", "Components", "WP-101 Brass Crown Bolt-Action Pen; WP-204 Propeller Spinning Letter Opener; WP-208 Precision Folding Aluminium Device Stand.", "", "", "", "", "", "", "", ""],
  ["Freight note", "", "CIF Auckland includes estimated sea freight and insurance to Auckland port only. DAP Auckland metro is duties and taxes unpaid.", "", "", "", "", "", "", "", ""],
];
quote.getRange("A19:A23").format = {
  fill: palette.soft,
  font: { name: "Arial", size: 10, color: palette.copper, bold: true },
  borders: { preset: "all", style: "thin", color: palette.line },
  verticalAlignment: "center",
};
quote.getRange("B19:K23").format = {
  fill: palette.white,
  font: { name: "Arial", size: 10, color: palette.ink },
  wrapText: true,
  verticalAlignment: "center",
  borders: { preset: "all", style: "thin", color: palette.line },
};
quote.getRange("C19:K23").merge(true);

quote.freezePanes.freezeRows(11);

// Components sheet
setWidths(components, [13, 13, 34, 34, 40, 24, 38, 30]);
components.getRange("A1:H1").merge();
components.getRange("A1").values = [["COMPONENT DETAILS"]];
styleTitle(components.getRange("A1:H1"));
components.getRange("A3:H3").values = [[
  "Set",
  "SKU",
  "Product Name",
  "Function",
  "Material",
  "Size / Weight",
  "Logo / Branding",
  "Editable Notes",
]];
styleHeader(components.getRange("A3:H3"));
components.getRange("A4:H9").values = [
  [
    "WGS-001-3",
    "WP-102",
    "Executive Dual-Head Metal Pen",
    "Inkless tip + rollerball writing end",
    "Gunmetal electroplated aluminium body",
    "Approx. 144 x 10mm | 23.3g",
    "Pen body or clip; laser marking, UV print, or pad print",
    "Edit if final sample spec changes",
  ],
  [
    "WGS-001-3",
    "WP-203",
    "Executive Zinc Alloy Letter Opener",
    "Desk letter opener for envelopes and documents",
    "Zinc alloy with high-gloss electroplating",
    "Approx. 230mm total length | 74g",
    "Flat handle surface; laser etching or screen print",
    "Includes reference laser setup in current quote",
  ],
  [
    "WGS-001-3",
    "WP-205",
    "Precision Custom Metal Bookmark",
    "Rigid page marker and flat desk-visible brand surface",
    "Brass, stainless steel, or zinc alloy by final brief",
    "Approx. 120-150mm | around 20g",
    "Laser engraving, chemical etching, or profile cutting",
    "Material affects final cost",
  ],
  [
    "WGS-002-3",
    "WP-101",
    "Brass Crown Bolt-Action Pen",
    "One-handed bolt-action pen with G2 refill",
    "Brass details, aluminium body, stainless steel clip",
    "Approx. 138 x 10mm | 28g",
    "Pen body, clip, or tail crown depending on artwork",
    "Main perceived-value component",
  ],
  [
    "WGS-002-3",
    "WP-204",
    "Propeller Spinning Letter Opener",
    "Letter opener with visible propeller spin mechanism",
    "Zinc alloy, matte brushed electroplated silver finish",
    "Approx. 187 x 19 x 4mm | 85g",
    "Flat blade surface or propeller face",
    "Mechanical desk feature",
  ],
  [
    "WGS-002-3",
    "WP-208",
    "Precision Folding Aluminium Device Stand",
    "Folding stand for phone or tablet desk use",
    "Anodised aluminium alloy with silicone contact pads",
    "Approx. 182 x 60 x 18mm folded | 150g",
    "Flat aluminium base panel; laser marking",
    "Size to confirm against final supplier carton",
  ],
];
styleBody(components.getRange("A4:H9"));
components.getRange("A4:B9").format = {
  fill: palette.soft,
  font: { name: "Arial", size: 10, color: palette.ink, bold: true },
  borders: { preset: "all", style: "thin", color: palette.line },
  verticalAlignment: "center",
};
components.getRange("H4:H9").format.fill = palette.input;
components.freezePanes.freezeRows(3);

// Terms sheet
setWidths(terms, [25, 120]);
terms.getRange("A1:B1").merge();
terms.getRange("A1").values = [["QUOTATION TERMS"]];
styleTitle(terms.getRange("A1:B1"));
terms.getRange("A3:B3").values = [["Section", "Text"]];
styleHeader(terms.getRange("A3:B3"));
terms.getRange("A4:B15").values = [
  ["Included Assumptions", "Standard logo marking on each component, one standard position per item."],
  ["Included Assumptions", "Standard set packaging with EVA insert; final box structure and artwork subject to approval."],
  ["Included Assumptions", "Production starts after artwork, sample direction, and deposit are confirmed."],
  ["Included Assumptions", "Component colours and finishes are subject to supplier availability at order confirmation."],
  ["Freight and Tax Notes", "CIF Auckland includes estimated sea freight and insurance to Auckland port only."],
  ["Freight and Tax Notes", "DAP Auckland metro is duties and taxes unpaid. NZ GST, duty, customs clearance, inspection, storage, and remote-area delivery are excluded."],
  ["Freight and Tax Notes", "DAP pricing is subject to confirmed carton size, gross weight, delivery address, and freight validity."],
  ["Freight and Tax Notes", "For Wellington, Christchurch, or non-metro delivery, inland delivery may be requoted."],
  ["Optional Upgrades", "Magnetic rigid box, drawer rigid box, soft-touch lamination, printed liner, foil stamping, or debossed box logo."],
  ["Optional Upgrades", "Additional logo position, full-colour UV printing, Pantone print matching, or custom bookmark silhouette."],
  ["Payment Terms", "50% deposit to start production, 50% balance before shipment unless otherwise agreed."],
  ["Payment Terms", "Quotation is valid for 14 days and may change if freight rates, material costs, or exchange conditions move significantly."],
];
styleBody(terms.getRange("A4:B15"));
terms.getRange("A4:A15").format = {
  fill: palette.soft,
  font: { name: "Arial", size: 10, color: palette.ink, bold: true },
  borders: { preset: "all", style: "thin", color: palette.line },
  verticalAlignment: "center",
};
terms.getRange("B4:B15").format.fill = palette.input;
terms.freezePanes.freezeRows(3);

// Compact verification before export
const check = await workbook.inspect({
  kind: "table",
  range: "Quotation!A10:K13",
  include: "values,formulas",
  tableMaxRows: 10,
  tableMaxCols: 12,
});
console.log(check.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
});
console.log(errors.ndjson);

await fs.mkdir(previewDir, { recursive: true });
for (const sheetName of ["Quotation", "Components", "Terms"]) {
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 1, format: "png" });
  const previewBytes = new Uint8Array(await preview.arrayBuffer());
  await fs.writeFile(`${previewDir}/${sheetName}.png`, previewBytes);
}

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);
console.log(`saved ${outputPath}`);
