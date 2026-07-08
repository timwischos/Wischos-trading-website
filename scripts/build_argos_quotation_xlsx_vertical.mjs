import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputPath = "docs/quotations/argos-promo-wgs001-wgs002-quotation.xlsx";
const previewDir = ".output/argos-quotation-xlsx-preview-vertical";

const palette = {
  ink: "#171717",
  muted: "#646464",
  line: "#DED8D1",
  paper: "#FBFAF8",
  copper: "#B87333",
  soft: "#F3EEE8",
  white: "#FFFDFB",
};

const quoteNo = "WG-ARGOS-20260602-01";
const quoteDate = "2 June 2026";
const customer = "Argos Promo, New Zealand";
const validity = "14 days, subject to freight space";

const sets = [
  {
    sku: "WGS-001-3",
    name: "The Desk Starter",
    description:
      "Entry-tier desk gift set for daily desk visibility: writing, opening mail, and branded page marking.",
    fob: 10.8,
    cif: 14.8,
    dap: 19.8,
    quantity: 100,
    components: [
      {
        sku: "WP-102",
        name: "Executive Dual-Head Metal Pen",
        details: [
          "Function: Inkless tip + rollerball writing end",
          "Material: Aluminium alloy body with gunmetal finish",
          "Size / Weight: approx. 144 x 10mm | 23.3g",
          "Logo: Pen body or clip, by laser marking, UV print, or pad print",
        ],
      },
      {
        sku: "WP-203",
        name: "Executive Zinc Alloy Letter Opener",
        details: [
          "Function: Desk letter opener for envelopes and documents",
          "Material: Zinc alloy with high-gloss electroplating",
          "Size / Weight: approx. 230mm total length | 74g",
          "Logo: Flat handle surface, laser etching or screen print",
        ],
      },
      {
        sku: "WP-205",
        name: "Precision Custom Metal Bookmark",
        details: [
          "Function: Rigid page marker and flat desk-visible brand surface",
          "Material: Brass, stainless steel, or zinc alloy by final brief",
          "Size / Weight: approx. 120-150mm | around 20g",
          "Logo: Laser engraving, chemical etching, or profile cutting",
        ],
      },
    ],
  },
  {
    sku: "WGS-002-3",
    name: "The Mechanical Desk",
    description:
      "Executive desk gift set built around three tactile actions: writing, opening mail, and holding a device.",
    fob: 26.8,
    cif: 32.8,
    dap: 39.8,
    quantity: 100,
    components: [
      {
        sku: "WP-101",
        name: "Brass Crown Bolt-Action Pen",
        details: [
          "Function: One-handed bolt-action pen with G2 refill",
          "Material: Brass details, aluminium body, stainless steel clip",
          "Size / Weight: approx. 138 x 10mm | 28g",
          "Logo: Pen body, clip, or tail crown depending on artwork",
        ],
      },
      {
        sku: "WP-204",
        name: "Propeller Spinning Letter Opener",
        details: [
          "Function: Letter opener with visible propeller spin mechanism",
          "Material: Zinc alloy, matte brushed electroplated silver finish",
          "Size / Weight: approx. 187 x 19 x 4mm | 85g",
          "Logo: Flat blade surface or propeller face",
        ],
      },
      {
        sku: "WP-208",
        name: "Precision Folding Aluminium Device Stand",
        details: [
          "Function: Folding stand for phone or tablet desk use",
          "Material: Anodised aluminium alloy with silicone contact pads",
          "Size / Weight: approx. 182 x 60 x 18mm folded | 150g",
          "Logo: Flat aluminium base panel, laser marking",
        ],
      },
    ],
  },
];

function cellFromRange(address) {
  return address.split(":")[0];
}

function merge(sheet, address, value = "") {
  const range = sheet.getRange(address);
  range.merge();
  if (value !== "") {
    sheet.getRange(cellFromRange(address)).values = [[value]];
  }
  return range;
}

function style(range, options = {}) {
  range.format = {
    fill: options.fill ?? palette.paper,
    font: {
      name: "Arial",
      size: options.size ?? 10,
      color: options.color ?? palette.ink,
      bold: options.bold ?? false,
      italic: options.italic ?? false,
    },
    horizontalAlignment: options.align ?? "left",
    verticalAlignment: options.valign ?? "center",
    wrapText: options.wrap ?? true,
    borders: options.borders ?? undefined,
  };
}

function bordered(range, options = {}) {
  style(range, {
    ...options,
    borders: { preset: "all", style: "thin", color: palette.line },
  });
}

function setRowHeight(sheet, row, height) {
  sheet.getRange(`A${row}:L${row}`).format.rowHeight = height;
}

function setRows(sheet, from, to, height) {
  for (let row = from; row <= to; row += 1) {
    setRowHeight(sheet, row, height);
  }
}

function setWidths(sheet) {
  const widths = [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11];
  widths.forEach((width, index) => {
    const col = String.fromCharCode(65 + index);
    sheet.getRange(`${col}1:${col}100`).format.columnWidth = width;
  });
}

function sectionTitle(sheet, row, title) {
  merge(sheet, `A${row}:A${row}`, "");
  style(sheet.getRange(`A${row}:A${row}`), { fill: palette.copper, borders: undefined });
  merge(sheet, `B${row}:L${row}`, title);
  style(sheet.getRange(`B${row}:L${row}`), {
    fill: palette.paper,
    bold: true,
    size: 11,
    color: palette.ink,
    borders: undefined,
  });
  setRowHeight(sheet, row, 23);
}

function priceFormula(unit, qty) {
  return `="USD "&TEXT(${unit},"0.00")&" / set"&CHAR(10)&"USD "&TEXT(${unit}*${qty},"#,##0")&" total"`;
}

function setHeadFormula(unit) {
  return `="Distributor reference"&CHAR(10)&"USD "&TEXT(${unit},"0.00")&CHAR(10)&"per set FOB China"`;
}

function writeInfoBlock(sheet, address, label, value) {
  merge(sheet, address);
  bordered(sheet.getRange(address), { fill: palette.paper, size: 9, color: palette.muted, valign: "top" });
  const topLeft = cellFromRange(address);
  sheet.getRange(topLeft).values = [[`${label}\n${value}`]];
  sheet.getRange(topLeft).format = {
    fill: palette.paper,
    font: { name: "Arial", size: 10, color: palette.ink, bold: true },
    verticalAlignment: "center",
    wrapText: true,
    borders: { preset: "all", style: "thin", color: palette.line },
  };
}

function writePriceSummary(sheet) {
  sectionTitle(sheet, 16, "Price Summary");

  const headers = [
    ["A18:B18", "Set"],
    ["C18:D18", "Set Name"],
    ["E18:F18", "Quantity"],
    ["G18:H18", "FOB China"],
    ["I18:J18", "CIF Auckland Port"],
    ["K18:L18", "DAP Auckland Metro"],
  ];
  for (const [address, text] of headers) {
    merge(sheet, address, text);
    bordered(sheet.getRange(address), { fill: palette.soft, bold: true, size: 9, color: "#3A332D", align: "center" });
  }

  sets.forEach((set, idx) => {
    const row = 19 + idx;
    const summaryCells = [
      [`A${row}:B${row}`, set.sku],
      [`C${row}:D${row}`, set.name],
      [`E${row}:F${row}`, `${set.quantity} sets`],
    ];
    for (const [address, text] of summaryCells) {
      merge(sheet, address, text);
      bordered(sheet.getRange(address), { fill: palette.white, bold: address.startsWith("A"), size: 10, align: "left" });
    }

    const priceCells = [
      [`G${row}:H${row}`, priceFormula(set.fob, set.quantity)],
      [`I${row}:J${row}`, priceFormula(set.cif, set.quantity)],
      [`K${row}:L${row}`, priceFormula(set.dap, set.quantity)],
    ];
    for (const [address, formula] of priceCells) {
      merge(sheet, address);
      sheet.getRange(cellFromRange(address)).formulas = [[formula]];
      bordered(sheet.getRange(address), { fill: palette.white, bold: true, size: 10, align: "right" });
    }
    setRowHeight(sheet, row, 43);
  });
}

function writeComponentCard(sheet, startRow, startCol, endCol, component) {
  const codeAddress = `${startCol}${startRow}:${endCol}${startRow}`;
  const nameAddress = `${startCol}${startRow + 1}:${endCol}${startRow + 2}`;
  const detailAddress = `${startCol}${startRow + 3}:${endCol}${startRow + 9}`;

  merge(sheet, codeAddress, component.sku);
  bordered(sheet.getRange(codeAddress), { fill: palette.white, bold: true, color: palette.copper, size: 9, valign: "top" });

  merge(sheet, nameAddress, component.name);
  bordered(sheet.getRange(nameAddress), { fill: palette.white, bold: true, size: 11, valign: "top" });

  merge(sheet, detailAddress, component.details.map((detail) => `- ${detail}`).join("\n"));
  bordered(sheet.getRange(detailAddress), { fill: palette.white, size: 9, color: palette.ink, valign: "top" });
}

function writeSetCard(sheet, startRow, set) {
  merge(sheet, `A${startRow}:I${startRow + 3}`);
  sheet.getRange(`A${startRow}`).values = [[`${set.sku}\n${set.name}\n${set.description}`]];
  bordered(sheet.getRange(`A${startRow}:I${startRow + 3}`), { fill: "#FFFDFB", size: 11, valign: "center" });
  sheet.getRange(`A${startRow}`).format.font = { name: "Arial", size: 12, color: palette.ink, bold: true };

  merge(sheet, `J${startRow}:L${startRow + 3}`);
  sheet.getRange(`J${startRow}`).formulas = [[setHeadFormula(set.fob)]];
  bordered(sheet.getRange(`J${startRow}:L${startRow + 3}`), { fill: "#FFFDFB", bold: true, size: 11, align: "right", valign: "center" });
  setRows(sheet, startRow, startRow + 3, 24);

  const componentRow = startRow + 5;
  writeComponentCard(sheet, componentRow, "A", "D", set.components[0]);
  writeComponentCard(sheet, componentRow, "E", "H", set.components[1]);
  writeComponentCard(sheet, componentRow, "I", "L", set.components[2]);
  setRows(sheet, componentRow, componentRow + 9, 23);
}

function writeNoteBox(sheet, address, title, bullets) {
  merge(sheet, address);
  const text = `${title}\n${bullets.map((item) => `- ${item}`).join("\n")}`;
  sheet.getRange(cellFromRange(address)).values = [[text]];
  bordered(sheet.getRange(address), { fill: palette.white, size: 9, valign: "top" });
  sheet.getRange(cellFromRange(address)).format.font = {
    name: "Arial",
    size: 9,
    color: palette.ink,
    bold: false,
  };
}

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("Quotation");
sheet.showGridLines = false;
setWidths(sheet);

style(sheet.getRange("A1:L92"), { fill: palette.paper, size: 10, borders: undefined });

merge(sheet, "A1:F3", "Wischos Gift\nChina-based sourcing partner for custom metal corporate gift sets\nwischosgift.com | johnlui@wischosgift.com");
style(sheet.getRange("A1:F3"), { fill: palette.paper, bold: true, size: 12, valign: "top" });
sheet.getRange("A1").format.font = { name: "Arial", size: 16, color: palette.ink, bold: true };

merge(sheet, "H1:L4", `Quotation No.  ${quoteNo}\nDate  ${quoteDate}\nPrepared for  ${customer}\nValidity  ${validity}`);
style(sheet.getRange("H1:L4"), { fill: palette.paper, size: 10, color: palette.muted, align: "right", valign: "top" });
setRows(sheet, 1, 4, 20);
style(sheet.getRange("A5:L5"), { fill: palette.line, borders: undefined });
setRowHeight(sheet, 5, 3);

merge(sheet, "A7:L8", "Quotation for Custom Metal Gift Sets");
style(sheet.getRange("A7:L8"), { fill: palette.paper, size: 23, color: palette.ink, valign: "center" });
setRows(sheet, 7, 8, 28);

merge(
  sheet,
  "A10:L11",
  "Distributor reference pricing for two custom metal gift set configurations at 100 sets. Each set is designed as a starting point: component finishes, logo placement, and box details can be adjusted after artwork and packaging requirements are confirmed.",
);
style(sheet.getRange("A10:L11"), { fill: palette.paper, size: 10, color: palette.muted, valign: "top" });
setRows(sheet, 10, 11, 23);

writeInfoBlock(sheet, "A13:C14", "Quantity", "100 sets per design");
writeInfoBlock(sheet, "D13:F14", "Currency", "USD");
writeInfoBlock(sheet, "G13:I14", "Lead Time", "25-35 days after approval");
writeInfoBlock(sheet, "J13:L14", "Destination", "Auckland, New Zealand");
setRows(sheet, 13, 14, 27);

writePriceSummary(sheet);

writeSetCard(sheet, 23, sets[0]);
writeSetCard(sheet, 41, sets[1]);

sectionTitle(sheet, 59, "Quotation Notes");
writeNoteBox(sheet, "A61:F69", "Included Assumptions", [
  "Standard logo marking on each component, one standard position per item.",
  "Standard set packaging with EVA insert; final box structure and artwork subject to approval.",
  "Production starts after artwork, sample direction, and deposit are confirmed.",
  "Component colours and finishes are subject to supplier availability at order confirmation.",
]);
writeNoteBox(sheet, "G61:L69", "Freight and Tax Notes", [
  "CIF Auckland includes estimated sea freight and insurance to Auckland port only.",
  "DAP Auckland metro is duties and taxes unpaid. NZ GST, duty, customs clearance, inspection, storage, and remote-area delivery are excluded.",
  "DAP pricing is subject to confirmed carton size, gross weight, delivery address, and freight validity.",
  "For Wellington, Christchurch, or non-metro delivery, inland delivery may be requoted.",
]);
writeNoteBox(sheet, "A71:F78", "Optional Upgrades", [
  "Magnetic rigid box, drawer rigid box, soft-touch lamination, printed liner, foil stamping, or debossed box logo.",
  "Additional logo position, full-colour UV printing, Pantone print matching, or custom bookmark silhouette.",
  "Reference sample or custom pre-production sample can be quoted separately after project direction is confirmed.",
]);
writeNoteBox(sheet, "G71:L78", "Payment Terms", [
  "50% deposit to start production, 50% balance before shipment unless otherwise agreed.",
  "Bank fees and any destination charges not listed in this quotation are for buyer's account.",
  "Quotation is valid for 14 days and may change if freight rates, material costs, or exchange conditions move significantly.",
]);
setRows(sheet, 61, 78, 23);

style(sheet.getRange("A81:L81"), { fill: palette.line, borders: undefined });
setRowHeight(sheet, 81, 3);
merge(sheet, "A83:F85", "Wischos Gift Trading Co.\nCustom metal gift set sourcing and set development from China.");
style(sheet.getRange("A83:F85"), { fill: palette.paper, size: 10, color: palette.ink, valign: "top" });
merge(sheet, "H83:L85", "wischosgift.com\njohnlui@wischosgift.com");
style(sheet.getRange("H83:L85"), { fill: palette.paper, size: 10, color: palette.ink, align: "right", valign: "top" });
setRows(sheet, 83, 85, 20);

const check = await workbook.inspect({
  kind: "table",
  range: "Quotation!A1:L24",
  include: "values,formulas",
  tableMaxRows: 24,
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
const preview = await workbook.render({
  sheetName: "Quotation",
  autoCrop: "all",
  scale: 1,
  format: "png",
});
const previewBytes = new Uint8Array(await preview.arrayBuffer());
await fs.writeFile(`${previewDir}/Quotation.png`, previewBytes);

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);
console.log(`saved ${outputPath}`);
