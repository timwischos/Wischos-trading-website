import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = path.resolve("../../outputs/wgs_packaging_pricing_20260610");
const outputPath = path.join(outputDir, "Wischos_WGS_packaging_pricing_carton_comparison_2026-06-10.xlsx");

const sets = [
  {
    set: "WGS-001-3",
    name: "The Desk Starter",
    boxSize: "285 x 165 x 40",
    evaSize: "270 x 150 x 25",
    boxType: "Drawer rigid box",
    boxMin: 1.8,
    boxMax: 2.8,
    evaMin: 0.55,
    evaMax: 0.9,
    toolingMin: 100,
    toolingMax: 180,
    cartonShareMin: 0.06,
    cartonShareMax: 0.1,
    unitMin: 2.6,
    unitMax: 4.1,
    flexibleQty: 24,
    flexibleCarton: "610 x 520 x 180",
    flexibleGross: "15-16kg",
    unifiedQty: 30,
    unifiedGross: "18-20kg",
  },
  {
    set: "WGS-002-3",
    name: "The Mechanical Desk",
    boxSize: "295 x 230 x 50",
    evaSize: "275 x 210 x 30",
    boxType: "Magnetic rigid box",
    boxMin: 2.4,
    boxMax: 3.8,
    evaMin: 0.75,
    evaMax: 1.2,
    toolingMin: 120,
    toolingMax: 220,
    cartonShareMin: 0.1,
    cartonShareMax: 0.18,
    unitMin: 3.45,
    unitMax: 5.5,
    flexibleQty: 12,
    flexibleCarton: "610 x 520 x 180",
    flexibleGross: "13-14.5kg",
    unifiedQty: 16,
    unifiedGross: "16-18kg",
  },
  {
    set: "WGS-003-3",
    name: "The Pocket Three",
    boxSize: "200 x 190 x 38",
    evaSize: "180 x 165 x 22",
    boxType: "Small magnetic rigid box",
    boxMin: 1.2,
    boxMax: 2.0,
    evaMin: 0.35,
    evaMax: 0.65,
    toolingMin: 80,
    toolingMax: 150,
    cartonShareMin: 0.05,
    cartonShareMax: 0.08,
    unitMin: 1.75,
    unitMax: 2.95,
    flexibleQty: 24,
    flexibleCarton: "610 x 420 x 180",
    flexibleGross: "11-13kg",
    unifiedQty: 36,
    unifiedGross: "17-20kg",
  },
  {
    set: "WGS-004-3",
    name: "The Field EDC",
    boxSize: "240 x 180 x 45",
    evaSize: "220 x 160 x 28",
    boxType: "Drawer rigid box",
    boxMin: 1.6,
    boxMax: 2.7,
    evaMin: 0.5,
    evaMax: 0.85,
    toolingMin: 100,
    toolingMax: 180,
    cartonShareMin: 0.06,
    cartonShareMax: 0.1,
    unitMin: 2.35,
    unitMax: 3.95,
    flexibleQty: 24,
    flexibleCarton: "610 x 520 x 210",
    flexibleGross: "14-16.5kg",
    unifiedQty: 28,
    unifiedGross: "17-19.5kg",
  },
  {
    set: "WGS-005-3",
    name: "The Morning Ritual",
    boxSize: "255 x 205 x 75",
    evaSize: "235 x 185 x 55",
    boxType: "Magnetic rigid box",
    boxMin: 2.6,
    boxMax: 4.3,
    evaMin: 0.85,
    evaMax: 1.45,
    toolingMin: 150,
    toolingMax: 260,
    cartonShareMin: 0.12,
    cartonShareMax: 0.2,
    unitMin: 3.85,
    unitMax: 6.35,
    flexibleQty: 12,
    flexibleCarton: "540 x 440 x 250",
    flexibleGross: "11.5-13kg",
    unifiedQty: 16,
    unifiedGross: "15-18kg",
  },
  {
    set: "WGS-006-3",
    name: "The First Day",
    boxSize: "330 x 230 x 105",
    evaSize: "310 x 210 x 85",
    boxType: "Rigid lid gift box",
    boxMin: 4.0,
    boxMax: 6.5,
    evaMin: 1.3,
    evaMax: 2.3,
    toolingMin: 180,
    toolingMax: 320,
    cartonShareMin: 0.3,
    cartonShareMax: 0.5,
    unitMin: 6.0,
    unitMax: 9.6,
    flexibleQty: 6,
    flexibleCarton: "480 x 360 x 340",
    flexibleGross: "12-14.5kg",
    unifiedQty: 6,
    unifiedGross: "13-15kg",
  },
  {
    set: "WGS-007-3",
    name: "The Thinking Desk",
    boxSize: "280 x 230 x 115",
    evaSize: "260 x 210 x 95",
    boxType: "Magnetic rigid box",
    boxMin: 3.8,
    boxMax: 6.3,
    evaMin: 1.4,
    evaMax: 2.4,
    toolingMin: 180,
    toolingMax: 320,
    cartonShareMin: 0.25,
    cartonShareMax: 0.45,
    unitMin: 5.8,
    unitMax: 9.4,
    flexibleQty: 8,
    flexibleCarton: "590 x 490 x 255",
    flexibleGross: "13-15.5kg",
    unifiedQty: 8,
    unifiedGross: "14-16kg",
  },
  {
    set: "WGS-008-4",
    name: "The Quartet",
    boxSize: "360 x 290 x 90",
    evaSize: "340 x 270 x 70",
    boxType: "Large magnetic rigid box",
    boxMin: 5.0,
    boxMax: 8.2,
    evaMin: 1.6,
    evaMax: 2.8,
    toolingMin: 220,
    toolingMax: 380,
    cartonShareMin: 0.32,
    cartonShareMax: 0.55,
    unitMin: 7.3,
    unitMax: 12.0,
    flexibleQty: 6,
    flexibleCarton: "610 x 390 x 300",
    flexibleGross: "13.5-15.5kg",
    unifiedQty: 6,
    unifiedGross: "14-16kg",
  },
];

const evaSlots = [
  ["WGS-001-3", "WP-102 Executive Dual-Head Metal Pen", "144 x 10 x 10", "150 x 16 x 12", "Confirmed by user"],
  ["WGS-001-3", "WP-203 Executive Zinc Alloy Letter Opener", "230 x 28 x 15 est.", "240 x 28 x 16", "Thickness uses 15mm estimate"],
  ["WGS-001-3", "WP-205 Precision Custom Metal Bookmark", "105 x 35 x 3 est.", "112 x 42 x 5", "User wrote 10.5mm x 35mm; interpreted as 105mm x 35mm"],
  ["WGS-002-3", "WP-204 Propeller Spinning Letter Opener", "190 x 24.5 x 21", "200 x 34 x 23", "Confirmed by user"],
  ["WGS-002-3", "WP-208 Precision Folding Aluminium Device Stand", "181.5 x 58 x 21", "192 x 68 x 24", "From user reference drawing"],
  ["WGS-002-3", "WP-101 Brass Crown Bolt-Action Pen", "138 x 10 x 10", "146 x 18 x 13", "Confirmed by user"],
  ["WGS-003-3", "WP-302 Industrial Brass Key Organizer", "87 x 28 x 8 est.", "96 x 38 x 10", "Width/thickness needs sample measurement"],
  ["WGS-003-3", "WP-303 Industrial Stainless Steel Money Clip", "60 x 25 x 8 est.", "70 x 35 x 10", "Length/width estimated"],
  ["WGS-003-3", "WP-304 Titanium Anti-Static EDC Comb", "100 x 35 x 3 est.", "110 x 45 x 6", "Width/thickness estimated"],
  ["WGS-004-3", "WP-103 Tactical Stainless Steel Pen", "152 x 14 x 14", "162 x 22 x 16", "Project spec"],
  ["WGS-004-3", "WP-305 Industrial Mini EDC Pry Bar", "70 x 20 x 6 est.", "80 x 30 x 8", "Width/thickness needs sample measurement"],
  ["WGS-004-3", "WP-307 EDC Folding Metal Scissors", "90 x 25 x 12 est.", "100 x 35 x 14", "Folded size used for packaging"],
  ["WGS-005-3", "WP-101 Brass Crown Bolt-Action Pen", "138 x 10 x 10", "146 x 18 x 13", "Same as WGS-002"],
  ["WGS-005-3", "WP-402 Pure Titanium Capsule Bottle 150ml", "128 x 51 x 51", "138 x 62 x 55", "Project spec"],
  ["WGS-005-3", "WP-308 Titanium EDC Keychain", "53 x 26 x 5", "63 x 36 x 8", "Project spec"],
  ["WGS-006-3", "WP-301 RFID Aluminum Wallet & Badge Holder", "95 x 60 x 10.5", "105 x 70 x 14", "Project spec"],
  ["WGS-006-3", "WP-104 6-in-1 Precision Metal Tool Pen", "149 x 10 x 10", "158 x 18 x 13", "Project spec"],
  ["WGS-006-3", "WP-202 Precision Aluminum Pen Holder", "100 x 100 x 80", "112 x 112 x 82", "Lay-flat vs semi-upright should be sampled"],
  ["WGS-007-3", "WP-105 Artisan Brass Rollerball", "140 x 9 x 9", "150 x 18 x 12", "Product copy"],
  ["WGS-007-3", "WP-206 Precision Kinetic Brass Spinning Top", "Dia. 40 x 40", "Dia. 48 x 42", "Uses standard 30g version"],
  ["WGS-007-3", "WP-407 Double-Wall Stainless Steel Desk Cup", "98 x 82 x 82", "108 x 92 x 95", "Product copy"],
  ["WGS-008-4", "WP-106 Solid Brass Ballpoint Pen", "156 x 7 x 7", "166 x 16 x 10", "Conflicting project record; 156mm used"],
  ["WGS-008-4", "WP-408 Titanium Tea Infuser Business Cup", "210 x 65 x 65", "222 x 76 x 70", "Product copy"],
  ["WGS-008-4", "WP-208 Precision Folding Aluminium Device Stand", "181.5 x 58 x 21", "192 x 68 x 24", "Same as WGS-002"],
  ["WGS-008-4", "WP-309 Slim Push Stainless Steel Business Card Case", "103 x 60 x 10 est.", "114 x 70 x 14", "Thickness estimated"],
];

const flexibleCartons = [
  ["WGS-001-3", "285 x 165 x 40", "2 x 3 x 4 layers", 24, "610 x 520 x 180", 0.057, 11.4, "15-16kg", 1.3, 2.2, 0.05, 0.09],
  ["WGS-002-3", "295 x 230 x 50", "2 x 2 x 3 layers", 12, "610 x 520 x 180", 0.057, 11.4, "13-14.5kg", 1.3, 2.2, 0.11, 0.18],
  ["WGS-003-3", "200 x 190 x 38", "3 x 2 x 4 layers", 24, "610 x 420 x 180", 0.046, 9.2, "11-13kg", 1.1, 1.8, 0.05, 0.08],
  ["WGS-004-3", "240 x 180 x 45", "3 x 2 x 4 layers", 24, "610 x 520 x 210", 0.067, 13.3, "14-16.5kg", 1.4, 2.4, 0.06, 0.1],
  ["WGS-005-3", "255 x 205 x 75", "2 x 2 x 3 layers", 12, "540 x 440 x 250", 0.059, 11.9, "11.5-13kg", 1.4, 2.3, 0.12, 0.19],
  ["WGS-006-3", "330 x 230 x 105", "1 x 2 x 3 layers", 6, "480 x 360 x 340", 0.059, 11.8, "12-14.5kg", 1.6, 2.6, 0.27, 0.43],
  ["WGS-007-3", "280 x 230 x 115", "2 x 2 x 2 layers", 8, "590 x 490 x 255", 0.074, 14.7, "13-15.5kg", 1.7, 2.8, 0.21, 0.35],
  ["WGS-008-4", "360 x 290 x 90", "1 x 2 x 3 layers", 6, "610 x 390 x 300", 0.071, 14.3, "13.5-15.5kg", 1.8, 3.0, 0.3, 0.5],
];

const unifiedCartons = [
  ["WGS-001-3", 30, "2 x 3 x 5 layers", "18-20kg", "Medium", "Good weight ceiling; more could fit by volume but not recommended by weight"],
  ["WGS-002-3", 16, "2 x 2 x 4 layers", "16-18kg", "Medium", "Needs void fill above/around boxes"],
  ["WGS-003-3", 36, "3 x 2 x 6 layers", "17-20kg", "Medium", "Good for sea freight; volume waste remains acceptable"],
  ["WGS-004-3", 28, "2 x 2 x 7 layers", "17-19.5kg", "Medium-low", "28 sets is safer than 30 after clearance"],
  ["WGS-005-3", 16, "2 x 2 x 4 layers", "15-18kg", "Good", "Good fit and reasonable carton count"],
  ["WGS-006-3", 6, "1 x 2 x 3 layers", "13-15kg", "Medium-low", "Limited by gift box height"],
  ["WGS-007-3", 8, "2 x 2 x 2 layers", "14-16kg", "Medium", "Limited by cup height and gift box height"],
  ["WGS-008-4", 6, "1 x 2 x 3 layers", "14-16kg", "Medium", "Good protective space, but high dimensional weight"],
];

const tieredCartons = [
  ["Flat / Standard", "610 x 520 x 210", "WGS-001 / WGS-002 / WGS-003 / WGS-004", "Keeps thin sets from paying too much volumetric weight"],
  ["Medium Deep", "610 x 520 x 260", "WGS-005 / WGS-007", "Handles bottle/cup-height sets without using the tallest carton"],
  ["Tall / Large", "610 x 520 x 340", "WGS-006 / WGS-008", "Needed for the thick pen holder set and large four-piece set"],
];

const sources = [
  ["Made-in-China magnetic gift box", "https://www.made-in-china.com/products-search/hot-china-products/Magnetic_Gift_Box.html", "Broad listing ranges; low lead-in prices require MOQ/material confirmation"],
  ["Made-in-China EVA foam", "https://www.made-in-china.com/products-search/hot-china-products/EVA_Foam.html", "Used as China supplier material/custom foam benchmark"],
  ["Made-in-China corrugated carton", "https://www.made-in-china.com/products-search/hot-china-products/Corrugated_Carton_Box.html", "Used as China supplier carton benchmark"],
  ["Uline magnetic gift boxes", "https://www.uline.com/BL_3337/Magnetic-Gift-Boxes", "US stock-packaging benchmark; generally higher than China custom factory pricing"],
  ["Uline deluxe gift boxes", "https://www.uline.com/BL_5625/Deluxe-Gift-Boxes", "Rigid presentation box benchmark"],
  ["Uline plank foam", "https://www.uline.com/BL_868/Plank-Foam", "US foam sheet benchmark"],
  ["Uline corrugated cartons", "https://www.uline.com/Product/GuidedNav?R=20%3B1&t=184360", "US corrugated carton benchmark"],
];

const workbook = Workbook.create();

const theme = {
  navy: "#1F2937",
  slate: "#334155",
  teal: "#0F766E",
  mint: "#DDEFE9",
  pale: "#F6F8FA",
  line: "#D7DEE8",
  amber: "#F7E5B7",
  white: "#FFFFFF",
};

function setTitle(sheet, title, subtitle, endCol = "J") {
  sheet.showGridLines = false;
  const titleRange = sheet.getRange(`A1:${endCol}1`);
  titleRange.merge();
  titleRange.values = [[title]];
  titleRange.format = {
    fill: theme.navy,
    font: { bold: true, color: theme.white, size: 16 },
    horizontalAlignment: "center",
    verticalAlignment: "center",
  };
  titleRange.format.rowHeightPx = 34;

  const subtitleRange = sheet.getRange(`A2:${endCol}2`);
  subtitleRange.merge();
  subtitleRange.values = [[subtitle]];
  subtitleRange.format = {
    fill: theme.pale,
    font: { color: theme.slate, size: 10 },
    horizontalAlignment: "left",
    verticalAlignment: "center",
    wrapText: true,
  };
  subtitleRange.format.rowHeightPx = 34;
}

function styleTable(sheet, rangeAddress) {
  const range = sheet.getRange(rangeAddress);
  range.format.borders = { preset: "all", style: "thin", color: theme.line };
  range.format.font = { size: 10, color: "#111827" };
  const header = range.getRow(0);
  header.format = {
    fill: theme.teal,
    font: { bold: true, color: theme.white, size: 10 },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    wrapText: true,
  };
  header.format.rowHeightPx = 34;
}

function writeTable(sheet, startCell, headers, rows, tableName) {
  const startCol = startCell.match(/[A-Z]+/)[0];
  const startRow = Number(startCell.match(/\d+/)[0]);
  const colCount = headers.length;
  const rowCount = rows.length + 1;
  const endCol = colName(colIndex(startCol) + colCount - 1);
  const endRow = startRow + rowCount - 1;
  const range = `${startCell}:${endCol}${endRow}`;
  sheet.getRange(range).values = [headers, ...rows];
  styleTable(sheet, range);
  const table = sheet.tables.add(range, true, tableName);
  table.style = "TableStyleMedium2";
  table.showFilterButton = true;
  return range;
}

function colIndex(col) {
  let n = 0;
  for (const ch of col) n = n * 26 + ch.charCodeAt(0) - 64;
  return n;
}

function colName(n) {
  let s = "";
  while (n > 0) {
    const rem = (n - 1) % 26;
    s = String.fromCharCode(65 + rem) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

function setWidths(sheet, widths) {
  for (const [col, width] of Object.entries(widths)) {
    sheet.getRange(`${col}:${col}`).format.columnWidthPx = width;
  }
}

const overview = workbook.worksheets.add("总览");
setTitle(
  overview,
  "Wischos WGS Packaging Pricing & Carton Summary",
  "Pricing ranges are reference estimates for RFQ. Unit packaging cost excludes products and excludes EVA tooling amortization.",
  "N",
);

const overviewHeaders = [
  "Set",
  "Name",
  "Gift box size mm",
  "EVA size mm",
  "Box type",
  "Unit pack min $",
  "Unit pack max $",
  "Midpoint $",
  "EVA tooling $",
  "Flexible sets/ctn",
  "Flexible carton mm",
  "Flexible gross",
  "Unified sets/ctn",
  "Unified gross",
];
const overviewRows = sets.map((s) => [
  s.set,
  s.name,
  s.boxSize,
  s.evaSize,
  s.boxType,
  s.unitMin,
  s.unitMax,
  (s.unitMin + s.unitMax) / 2,
  `${s.toolingMin}-${s.toolingMax}`,
  s.flexibleQty,
  s.flexibleCarton,
  s.flexibleGross,
  s.unifiedQty,
  s.unifiedGross,
]);
writeTable(overview, "A4", overviewHeaders, overviewRows, "OverviewTable");
overview.getRange("F5:H12").format.numberFormat = "$0.00";
overview.getRange("A4:N12").format.wrapText = true;
overview.freezePanes.freezeRows(4);
setWidths(overview, {
  A: 95,
  B: 140,
  C: 118,
  D: 118,
  E: 145,
  F: 88,
  G: 88,
  H: 85,
  I: 95,
  J: 90,
  K: 118,
  L: 96,
  M: 90,
  N: 92,
});

overview.getRange("A15:D15").merge();
overview.getRange("A15:D15").values = [["Recommendation"]];
overview.getRange("A15:D15").format = {
  fill: theme.amber,
  font: { bold: true, color: "#713F12", size: 11 },
};
overview.getRange("A16:D20").values = [
  ["Best for air/express", "Flexible carton plan", "Lowest dimensional-weight waste", ""],
  ["Best compromise", "Tiered carton plan", "3 carton sizes, simpler procurement", ""],
  ["Best for warehouse/sea freight", "Unified 610 x 520 x 340mm", "Simple but volumetric weight is about 21.6kg", ""],
  ["Quote buffer", "Add 8-12%", "Until samples confirm EVA density, logo process, and packed gross weight", ""],
  ["EVA tooling", "Do not amortize at first", "Keep mold fee visible in supplier comparison", ""],
];
overview.getRange("A16:D20").format = {
  fill: "#FFF8E6",
  font: { size: 10, color: "#111827" },
  wrapText: true,
};
overview.getRange("A15:D20").format.borders = { preset: "all", style: "thin", color: "#E6C76E" };

overview.getRange("F15:G15").values = [["Set", "Midpoint unit packaging $"]];
overview.getRange("F16:G23").values = sets.map((s) => [s.set, (s.unitMin + s.unitMax) / 2]);
overview.getRange("F15:G23").format.borders = { preset: "all", style: "thin", color: theme.line };
overview.getRange("F15:G15").format = { fill: theme.teal, font: { bold: true, color: theme.white } };
overview.getRange("G16:G23").format.numberFormat = "$0.00";
const chart = overview.charts.add("bar", overview.getRange("F15:G23"));
chart.title = "Estimated Unit Packaging Cost Midpoint";
chart.hasLegend = false;
chart.xAxis = { axisType: "textAxis" };
chart.yAxis = { numberFormatCode: "$0.00" };
chart.setPosition("I15", "N30");

const pricing = workbook.worksheets.add("包装报价");
setTitle(pricing, "Gift Box + EVA Pricing Reference", "Unit packaging cost includes gift box, EVA insert, carton share, and small packing materials. Tooling/mold is separate.", "N");
const pricingHeaders = [
  "Set",
  "Name",
  "Gift box outer size mm",
  "EVA board size mm",
  "Box type",
  "Gift box min $",
  "Gift box max $",
  "EVA min $",
  "EVA max $",
  "EVA tooling min $",
  "EVA tooling max $",
  "Carton share min $",
  "Carton share max $",
  "Unit packaging min $",
  "Unit packaging max $",
  "Midpoint $",
];
const pricingRows = sets.map((s) => [
  s.set,
  s.name,
  s.boxSize,
  s.evaSize,
  s.boxType,
  s.boxMin,
  s.boxMax,
  s.evaMin,
  s.evaMax,
  s.toolingMin,
  s.toolingMax,
  s.cartonShareMin,
  s.cartonShareMax,
  s.unitMin,
  s.unitMax,
  (s.unitMin + s.unitMax) / 2,
]);
writeTable(pricing, "A4", pricingHeaders, pricingRows, "PricingTable");
pricing.getRange("F5:I12").format.numberFormat = "$0.00";
pricing.getRange("J5:K12").format.numberFormat = "$0";
pricing.getRange("L5:P12").format.numberFormat = "$0.00";
pricing.getRange("A4:P12").format.wrapText = true;
pricing.freezePanes.freezeRows(4);
setWidths(pricing, {
  A: 95,
  B: 135,
  C: 120,
  D: 115,
  E: 145,
  F: 82,
  G: 82,
  H: 78,
  I: 78,
  J: 95,
  K: 95,
  L: 96,
  M: 96,
  N: 100,
  O: 100,
  P: 85,
});

const eva = workbook.worksheets.add("EVA开槽");
setTitle(eva, "EVA Slot / Tooling Size Reference", "Slot sizes include clearance for metal products and pickup handling. Items marked estimated should be confirmed before tooling.", "E");
writeTable(eva, "A4", ["Set", "Item", "Product calculation size mm", "Recommended EVA slot mm", "Note"], evaSlots, "EvaSlotTable");
eva.getRange("A4:E29").format.wrapText = true;
eva.freezePanes.freezeRows(4);
setWidths(eva, { A: 95, B: 275, C: 165, D: 165, E: 300 });

const flex = workbook.worksheets.add("灵活外箱");
setTitle(flex, "Flexible Export Carton Plan", "Different carton sizes per set. Best for air/express, smaller mixed orders, and lower dimensional-weight waste.", "L");
writeTable(
  flex,
  "A4",
  [
    "Set",
    "Gift box size mm",
    "Packing layout",
    "Sets/carton",
    "Carton size mm",
    "CBM/carton",
    "Dim weight /5000 kg",
    "Gross weight/carton",
    "Carton min $",
    "Carton max $",
    "Carton cost/set min $",
    "Carton cost/set max $",
  ],
  flexibleCartons,
  "FlexibleCartonTable",
);
flex.getRange("F5:F12").format.numberFormat = "0.000";
flex.getRange("G5:G12").format.numberFormat = "0.0";
flex.getRange("I5:L12").format.numberFormat = "$0.00";
flex.getRange("A4:L12").format.wrapText = true;
flex.freezePanes.freezeRows(4);
setWidths(flex, { A: 95, B: 120, C: 130, D: 85, E: 125, F: 85, G: 100, H: 110, I: 82, J: 82, K: 105, L: 105 });

const unified = workbook.worksheets.add("统一外箱");
setTitle(unified, "Unified Export Carton Plan", "One carton size: 610 x 520 x 340mm. CBM: 0.108. Dimensional weight: about 21.6kg by /5000.", "F");
writeTable(
  unified,
  "A4",
  ["Set", "Suggested sets/carton", "Practical layout", "Estimated gross weight", "Space utilization", "Notes"],
  unifiedCartons,
  "UnifiedCartonTable",
);
unified.getRange("A4:F12").format.wrapText = true;
unified.freezePanes.freezeRows(4);
setWidths(unified, { A: 95, B: 115, C: 135, D: 125, E: 120, F: 360 });

unified.getRange("A15:D15").merge();
unified.getRange("A15:D15").values = [["Tiered carton alternative"]];
unified.getRange("A15:D15").format = { fill: theme.amber, font: { bold: true, color: "#713F12" } };
writeTable(unified, "A16", ["Carton tier", "Size mm", "Recommended sets", "Why"], tieredCartons, "TieredCartonTable");
unified.getRange("A16:D19").format.wrapText = true;

const notes = workbook.worksheets.add("询价说明");
setTitle(notes, "Assumptions, Sources, and Supplier RFQ Checklist", "Use this sheet when sending quotation requests to packaging factories.", "D");
notes.getRange("A4:D4").values = [["Topic", "Detail", "Impact", "Action"]];
notes.getRange("A5:D14").values = [
  ["Currency", "USD. Quick RMB estimate can multiply by about 7.2.", "Exchange rate may change.", "Use actual rate at PO confirmation."],
  ["Gift box", "Custom black rigid box with Wischos branding.", "Foil/deboss/UV affects unit price.", "Ask supplier to quote process separately."],
  ["EVA", "Black flocked EVA, 38-45 kg/m3.", "Density and flocking affect cost and protection.", "Confirm density and sample compression."],
  ["Tooling", "EVA tooling/mold fee kept separate.", "Tooling may be refundable after bulk order.", "Ask refund threshold and ownership."],
  ["Carton", "5-layer corrugated export carton assumed.", "ECT/bursting strength affects price.", "Confirm carton mark and gross weight limit."],
  ["MOQ", "Prices vary sharply by 500 / 1,000 / 3,000 sets.", "Small orders pay higher unit box price.", "Request all three breaks."],
  ["Air freight", "Flexible carton plan is more efficient.", "Lower dimensional-weight waste.", "Use flexible or tiered carton plan."],
  ["Sea freight", "Unified carton is acceptable.", "Warehouse handling is simpler.", "Use only when volume waste is acceptable."],
  ["Sample check", "Measure product size and packed gross weight.", "Avoid wrong EVA tooling.", "Confirm before mass production."],
  ["Quote buffer", "Add 8-12% until physical samples are confirmed.", "Protects against material/process drift.", "Remove buffer after final supplier quote."],
];
styleTable(notes, "A4:D14");
notes.getRange("A4:D14").format.wrapText = true;
setWidths(notes, { A: 125, B: 340, C: 260, D: 280 });

notes.getRange("A17:C17").values = [["Source", "URL", "Use in estimate"]];
notes.getRange("A18:C24").values = sources;
styleTable(notes, "A17:C24");
notes.getRange("A17:C24").format.wrapText = true;
notes.getRange("B18:B24").format.font = { color: "#1155CC", underline: true, size: 10 };
notes.freezePanes.freezeRows(4);

for (const sheetName of ["总览", "包装报价", "EVA开槽", "灵活外箱", "统一外箱", "询价说明"]) {
  const sheet = workbook.worksheets.getItem(sheetName);
  const used = sheet.getUsedRange();
  used.format.verticalAlignment = "center";
}

await fs.mkdir(outputDir, { recursive: true });

const previewSheets = ["总览", "包装报价", "EVA开槽", "灵活外箱", "统一外箱", "询价说明"];
for (const sheetName of previewSheets) {
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 1, format: "png" });
  await fs.writeFile(
    path.join(outputDir, `preview_${sheetName}.png`),
    new Uint8Array(await preview.arrayBuffer()),
  );
}

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "formula error scan",
});
console.log(errors.ndjson);

const overviewCheck = await workbook.inspect({
  kind: "table",
  range: "总览!A1:N20",
  include: "values,formulas",
  tableMaxRows: 20,
  tableMaxCols: 14,
});
console.log(overviewCheck.ndjson);

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);
console.log(outputPath);
