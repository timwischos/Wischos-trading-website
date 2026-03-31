/**
 * Batch update: Expert Notes for all 24 products.
 * Run with: npx tsx src/server/update-expert-notes.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { eq } from 'drizzle-orm'
import { products } from './schema'

const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
const db = drizzle(sql)

type ExpertNote = { title: string; body: string }

const notes: Record<string, ExpertNote[]> = {
  // ─── PENS (WP-1xx) ────────────────────────────────────────────────────────

  'WP-101-brass-crown-bolt-action-pen': [
    {
      title: 'Why Brass for a Pen?',
      body: 'Brass (Cu 60–65%, Zn 35–40%) has a density of 8.4–8.7 g/cm³ — nearly three times that of aluminum. This is why a 28g brass pen feels substantially heavier than a 25g aluminum pen of the same size. The extra mass lowers the center of gravity, providing a self-stabilizing writing experience that reduces hand fatigue during extended sessions.',
    },
    {
      title: 'Bolt-Action Mechanism Heritage',
      body: 'The bolt-action deployment mechanism draws from precision rifle bolt design — a rotating cam that locks into position with deliberate mechanical engagement. Unlike click or twist mechanisms that rely on plastic springs (which weaken with use), the bolt-action uses metal-on-metal contact surfaces that maintain consistent feel for decades.',
    },
    {
      title: 'G2 Refill Ecosystem',
      body: 'The Parker-style G2 refill (ISO 12757-2) is the most widely available pen refill format worldwide. Over 200 manufacturers produce compatible refills in every ink type — ballpoint, gel, rollerball, and even pressurized (Fisher Space Pen). This ensures the pen remains functional anywhere in the world without proprietary consumables.',
    },
  ],

  'WP-102-executive-dual-head-metal-pen': [
    {
      title: 'How "Eternal Pencil" Technology Works',
      body: 'The inkless tip is a specially formulated metal alloy (typically a silver-bismuth or lead-free alloy). When pressed against paper, microscopic metal particles are deposited through friction — similar to how graphite works, but without the carbon structure. The resulting mark resembles an HB pencil line and is semi-permanent (erasable with a standard eraser within 24 hours, then fixed).',
    },
    {
      title: 'Gunmetal Electroplating Process',
      body: 'Gunmetal finish is achieved through a multi-layer electroplating process: copper strike (adhesion layer), nickel (hardness, 8–12μm), and a final dark alloy layer (tin-nickel or black chrome, 0.5–1μm). The total coating thickness of 10–15μm provides Vickers hardness of 500–600 HV — significantly harder than the 200 HV of the underlying aluminum, protecting against daily wear.',
    },
    {
      title: '20,000m Writing Life in Context',
      body: 'A standard wood pencil writes approximately 56km of line before complete consumption. At 20,000m (20km), one eternal pencil tip replaces roughly 35 wood pencils. The key advantage is consistency — unlike graphite that dulls and widens its line as it wears, the alloy tip maintains a consistent 0.5mm trace width throughout its entire lifespan.',
    },
  ],

  'WP-103-tactical-stainless-steel-pen': [
    {
      title: '303 vs 304 vs 316 Stainless Steel',
      body: '303 SS contains added sulfur (0.15–0.35%) for improved machinability — critical for the precision CNC turning required for pen body threads and glass breaker housing. 304 is the food-grade standard but galls (seizes) during machining. 316 adds molybdenum for marine-grade corrosion resistance. For a tactical pen, 303 delivers the optimal balance of machinability, hardness (HRC 40–45), and corrosion resistance.',
    },
    {
      title: 'Tungsten Carbide Glass Breaker Physics',
      body: 'Tungsten carbide (WC) has a Vickers hardness of 1500–2000 HV — approximately 3× harder than hardened steel and 8× harder than glass (500–700 HV). The conical tip concentrates the impact force into a point area of <1mm², creating stress concentrations of >100 MPa in tempered automotive glass — well above its 30–50 MPa fracture threshold. This is why a 100g pen can break a car window that a 5kg hammer might bounce off.',
    },
    {
      title: 'Weight as a Design Feature',
      body: 'At 102.8g, this pen is 4–5× heavier than a standard office pen (18–25g). This is intentional: the mass provides gyroscopic stability during writing, and the weight distribution (heavier at the glass breaker end) creates a natural pendulum effect that keeps the writing tip oriented downward. For emergency use, the extra mass increases impact energy (E = ½mv²) at the glass breaker tip.',
    },
  ],

  'WP-104-6-in-1-precision-metal-tool-pen': [
    {
      title: 'Spirit Level Accuracy',
      body: 'The integrated spirit level (also called a bubble level or vial level) uses a curved glass vial filled with a low-viscosity fluid (typically ethanol-based) with a single air bubble. The vial curvature is calibrated so that a 2mm bubble displacement corresponds to approximately 2° of tilt — sufficient accuracy for hanging pictures, checking desk alignment, or quick field leveling tasks.',
    },
    {
      title: 'Multi-Tool Integration Trade-offs',
      body: 'Combining six functions in a pen body requires careful diameter management. The 10mm barrel must accommodate a standard ink refill core (3.5mm), stylus conductor, screwdriver bit housing, and spirit level vial — all while maintaining structural rigidity. Zinc/aluminum alloy is chosen over pure aluminum because its higher density (6.6 vs 2.7 g/cm³) allows thinner walls at equivalent strength, maximizing internal volume.',
    },
    {
      title: 'Lacquer Finish Engineering',
      body: 'The lacquer coating (15–25μm thick) serves three functions: corrosion barrier, color carrier, and branding substrate. When laser-engraved, the laser ablates the lacquer to reveal the bare metal underneath, creating a natural two-tone contrast (colored lacquer + bright metal). This is why lacquer-finished pens produce the crispest laser-engraved logos — the contrast is built into the finishing process.',
    },
  ],

  // ─── DESK ACCESSORIES (WP-2xx) ────────────────────────────────────────────

  'WP-201-professional-aluminum-desk-mat': [
    {
      title: '5052 Aluminum: The Right Alloy for a Desk Mat',
      body: '5052-H32 aluminum has excellent formability and corrosion resistance (superior to 6061 in marine environments). Its tensile strength of 228 MPa is more than sufficient for a desk mat, while its 2.68 g/cm³ density keeps the 240×200mm pad at a manageable 320g. The magnesium content (2.2–2.8%) also provides natural antimicrobial properties — relevant for a surface that\'s touched thousands of times per day.',
    },
    {
      title: 'Sandblasting + Anodization: A Two-Step Surface',
      body: 'Sandblasting uses 80–120 grit aluminum oxide particles at 3–5 bar pressure to create a uniform micro-texture (Ra 1.6–3.2μm). This is followed by Type II anodization (15–25μm oxide layer) which converts the surface aluminum into Al₂O₃ — a ceramic harder than the underlying metal. The result is a surface that resists scratches from watches, cufflinks, and mouse feet while providing optimal optical mouse tracking.',
    },
    {
      title: 'Thermal Advantage Over Cloth Pads',
      body: 'Aluminum\'s thermal conductivity (138 W/m·K) is 500× that of cloth. This means an aluminum desk mat actively dissipates heat from your wrist and forearm, keeping the working surface 2–4°C cooler than ambient. In warm offices, this reduces palm sweating — a practical ergonomic benefit that cloth or leather pads cannot provide.',
    },
  ],

  'WP-202-precision-aluminum-pen-holder': [
    {
      title: '6061-T6: Aerospace-Grade Means Specific Things',
      body: '6061-T6 refers to a specific alloy (Al-Mg-Si) with T6 temper — meaning it was solution heat-treated at 530°C and artificially aged at 175°C. This process increases yield strength to 276 MPa (from 55 MPa in annealed state). "Aerospace-grade" isn\'t marketing — 6061-T6 is genuinely used in aircraft fuselage structures, helicopter rotor hubs, and satellite frames.',
    },
    {
      title: 'Interior Anodization: Why It Matters',
      body: 'Most pen holders only anodize the exterior (visible surface). Interior anodization adds a separate processing step — the inside of the cylinder is independently masked, blasted, and anodized. This prevents ink staining, marker bleeding, and metal-on-metal scratching when pens and tools contact the interior walls. Without it, the raw aluminum interior would develop permanent dark marks within weeks.',
    },
    {
      title: '500g Base Weight: Anti-Tip Engineering',
      body: 'A 500g base with a Φ100mm footprint creates a tipping moment resistance of approximately 245 g·cm at the rim. This means a 40g pen placed at the maximum angle will not tip the holder. Standard plastic organizers (80–150g) tip with a single heavy pen at 15° lean. The extra weight is the reason this holder stays planted — physics, not just "premium feel."',
    },
  ],

  'WP-203-executive-zinc-alloy-letter-opener': [
    {
      title: 'Zinc Alloy Die-Casting',
      body: 'This letter opener is produced via hot-chamber die-casting using Zamak 3 (Zn 96%, Al 4%) — the most widely used zinc die-casting alloy globally. Zamak 3 flows into molds at 420°C, capturing fine details (the teardrop handle curves) that would require secondary machining in brass or steel. Cycle time is 15–30 seconds per piece — this is why zinc alloy delivers premium aesthetics at accessible price points.',
    },
    {
      title: 'Electroplating Thickness & Longevity',
      body: 'The high-gloss finish is achieved through a copper-nickel-chrome triple-layer electroplating stack (Cu 10–15μm → Ni 8–12μm → Cr 0.25–0.5μm). Total thickness of 20–28μm passes the 48-hour salt spray test (ASTM B117). The chrome top layer provides the mirror reflection, the nickel provides hardness and corrosion resistance, and the copper ensures adhesion to the zinc substrate.',
    },
    {
      title: 'Three-Color Set: Plating Chemistry',
      body: 'Silver, Gold, and Rose Gold finishes all start with the same copper-nickel base. Silver adds chromium (bright chrome plating). Gold uses an alkaline non-cyanide gold electroplating bath (Au 0.1–0.5μm over nickel). Rose Gold is achieved through a copper-gold alloy plating (Cu 75%, Au 25%) — the copper content creates the warm pink hue while maintaining corrosion resistance.',
    },
  ],

  'WP-204-propeller-spinning-letter-opener': [
    {
      title: 'Bearing Mechanism: Sealed vs Open',
      body: 'The propeller uses a miniature sealed ball bearing (typically 6×3×2mm, 2RS type with rubber seals). Sealed bearings retain their pre-packed lithium grease for 5+ years of intermittent desk use — no maintenance required. Open bearings (found in cheaper fidget spinners) collect dust and lose smoothness within months. The sealed design is the difference between a professional tool and a disposable toy.',
    },
    {
      title: 'Matte Brushed Finish: Directional Texture',
      body: 'The matte brushed finish is created by running the cast zinc body across an abrasive belt (120–180 grit) in a single direction. This creates parallel micro-grooves (Ra 0.8–1.6μm) that scatter light diffusely rather than reflecting it. The practical benefit: fingerprints are virtually invisible on a brushed surface, while they\'re immediately apparent on polished or mirror-finish alternatives.',
    },
  ],

  'WP-205-precision-custom-metal-bookmark': [
    {
      title: 'Chemical Etching vs Laser Cutting: When to Use Which',
      body: 'Chemical etching (using ferric chloride solution) dissolves metal to create recessed patterns 0.01–0.3mm deep. Best for: surface logos, fine text, detailed artwork on flat surfaces. Laser cutting (1000–3000W fiber laser) physically removes metal to create through-holes or silhouette shapes. Best for: custom bookmark profiles, cutout patterns, shadow-play designs. Chemical etching preserves structural integrity; laser cutting enables shape freedom.',
    },
    {
      title: 'Enamel Fill: Adding Color to Metal',
      body: 'After chemical etching, the recessed logo area can be filled with hard enamel (vitreous glass powder fired at 800°C) or soft enamel (epoxy resin cured at 150°C). Hard enamel is flush with the metal surface and has a jewel-like quality but costs 2–3× more. Soft enamel sits slightly recessed with a visible raised metal border — the more common choice for corporate gifts at MOQ 100+.',
    },
    {
      title: 'Brass vs Stainless Steel for Bookmarks',
      body: 'Brass (8.5 g/cm³) is 8% denser than stainless steel (7.9 g/cm³), giving it slightly more "page grip" at the same thickness. Brass also develops patina — an aesthetic feature for literary/heritage brands. Stainless steel stays mirror-bright indefinitely — better for tech/modern brands. Both are equally durable; the choice is purely aesthetic positioning.',
    },
  ],

  'WP-206-precision-brass-spinning-top': [
    {
      title: 'Gyroscopic Physics: Why Brass Spins Better',
      body: 'Spin duration is proportional to the moment of inertia (I = mr²). Brass\'s high density (8.5 g/cm³) concentrates more mass at a given radius, increasing I without increasing size. A 30g brass top at Ø40mm stores approximately 40% more rotational energy than an identical aluminum top — translating directly to longer spin times and more stable precession.',
    },
    {
      title: 'Diamond Knurling: CNC Precision Grip',
      body: 'The diamond knurl pattern is cut by a pair of hardened steel knurling wheels pressed into the rotating brass workpiece on a CNC lathe. The crossing angle (typically 30°) creates a consistent grid of small pyramids that provide maximum finger friction with minimum surface damage. This is the same technique used on high-end camera lens rings and micrometer thimbles.',
    },
    {
      title: 'Living Patina: The Chemistry of Aging Brass',
      body: 'Brass tarnish is primarily cuprous oxide (Cu₂O) — a thin film that forms when copper in the alloy reacts with atmospheric oxygen and moisture. Over months of handling, areas of frequent contact develop a warm amber tone while protected areas retain their original luster, creating a unique "wear map" that makes each piece visually distinct. This is why luxury brass brands market patina as a feature, not a defect.',
    },
  ],

  'WP-207-carbon-fiber-magnetic-fidget-stick': [
    {
      title: 'Carbon Fiber: Strength-to-Weight Champion',
      body: 'Carbon fiber composite has a tensile strength of 3,500 MPa at just 1.6 g/cm³ density — giving it a specific strength 5× that of steel. In the fidget stick, the carbon fiber tubes provide the rigid structural spine while adding minimal weight, keeping the assembled 3-section piece at just 42g. The weave pattern (typically 3K twill) also provides the distinctive visual texture.',
    },
    {
      title: 'Neodymium Magnets: Silent Connection',
      body: 'The magnetic joints use N35–N42 grade neodymium magnets (NdFeB) — the strongest permanent magnet type commercially available. The brass joint housings serve as magnetic field guides, concentrating flux at the connection points for a strong hold (typically 1–2kg pull force) while minimizing stray field that could affect nearby electronics. The brass also dampens the connection impact, producing a soft "thud" rather than a sharp click.',
    },
    {
      title: 'Why Brass Joints Specifically',
      body: 'Brass is paramagnetic (not attracted to magnets) but an excellent conductor — it slows magnet movement through eddy current braking (Lenz\'s law). This creates the "controlled resistance" feeling when folding and unfolding the stick. Steel joints would stick to the magnets; aluminum would provide less damping. Brass delivers the precise tactile feedback that makes the fidget interaction satisfying rather than snappy.',
    },
  ],

  // ─── EDC ACCESSORIES (WP-3xx) ─────────────────────────────────────────────

  'WP-301-rfid-aluminum-wallet-badge-holder': [
    {
      title: 'RFID Blocking: Faraday Cage Principle',
      body: 'RFID blocking works by creating a Faraday cage — a continuous conductive enclosure that attenuates electromagnetic fields. The aluminum shell (1.5mm walls) blocks 13.56 MHz (NFC/contactless payment) and 125 kHz (access cards) signals by reflecting and absorbing the radio waves. Attenuation is typically >30 dB — meaning less than 0.1% of the signal energy penetrates the wallet.',
    },
    {
      title: 'Carbon Fiber Back Panel: Not Just Aesthetic',
      body: 'The carbon fiber composite back panel serves a structural purpose: it provides flex resistance without adding the weight of a second aluminum panel. Carbon fiber\'s flexural modulus (150 GPa) prevents the wallet from bowing under pocket pressure, while its 1.6 g/cm³ density keeps the total weight at 83g — approximately half that of an all-aluminum equivalent.',
    },
    {
      title: 'Anodized Sandblast: Two Processes, One Surface',
      body: 'The surface treatment is a sequential two-step process. First, sandblasting (100–150 grit) creates a uniform micro-texture that diffuses light (eliminating glare and fingerprint visibility). Then, Type II anodization (15–20μm) converts the textured surface aluminum into hard aluminum oxide, "freezing" the matte texture permanently. The anodized layer is integral to the metal — it cannot peel, chip, or separate.',
    },
  ],

  'WP-302-industrial-brass-key-organizer': [
    {
      title: 'Brass vs Zinc Alloy: The Corrosion Story',
      body: 'Standard keychains are typically zinc alloy with chrome or nickel plating. When the plating chips (inevitable with keys grinding against each other), the exposed zinc corrodes rapidly — forming white powdery zinc oxide. Solid brass never has this problem: even when scratched, the exposed surface simply develops a protective patina layer. No plating means nothing to chip, peel, or flake.',
    },
    {
      title: 'Wire Diameter Matters',
      body: 'The 3.0mm wire diameter is 50% thicker than standard keychain wire (2.0mm). Cross-sectional area scales with the square of diameter, so 3.0mm wire has 2.25× the cross-section of 2.0mm wire — meaning 2.25× the tensile strength and dramatically higher resistance to bending fatigue. This is the difference between hardware that opens after 6 months of pocket carry and hardware that stays closed for years.',
    },
  ],

  'WP-303-industrial-stainless-steel-money-clip': [
    {
      title: 'Spring Temper: Memory Metal',
      body: 'The clip\'s holding force comes from spring tempering — a cold-working process that permanently increases the steel\'s yield strength to 1000–1200 MPa (vs 210 MPa for annealed stainless). This "structural memory" means the clip returns to its original shape after every use. Unlike spring steel clips that lose tension (stress relaxation), stainless steel\'s austenitic crystal structure maintains spring force for decades.',
    },
    {
      title: 'PVD Gold vs Electroplated Gold',
      body: 'PVD (Physical Vapor Deposition) deposits a thin film (0.5–3μm) of titanium nitride (TiN) — which appears gold-colored — in a vacuum chamber. PVD coatings are 3–5× harder than electroplated gold (2000 HV vs 80–200 HV) and will not tarnish, fade, or wear through under normal daily handling. The trade-off: PVD cannot achieve the deep warm tone of real gold plating, appearing slightly more yellow-metallic.',
    },
  ],

  'WP-304-titanium-anti-static-edc-comb': [
    {
      title: 'Why Titanium is Anti-Static',
      body: 'Static charge builds on combs because non-conductive materials (plastic, horn) cannot dissipate the triboelectric charge generated by friction with hair. Titanium is electrically conductive (2.38×10⁶ S/m) — charge dissipates through the metal body and into the user\'s hand in milliseconds. This is the same principle behind anti-static wrist straps used in electronics manufacturing.',
    },
    {
      title: 'Titanium Biocompatibility',
      body: 'Titanium is one of only four biocompatible metals approved for surgical implants (alongside tantalum, niobium, and certain cobalt-chrome alloys). Its native oxide layer (TiO₂, 2–5nm thick) is chemically inert and prevents ion leaching. This means zero risk of nickel allergy reactions — a genuine concern with stainless steel combs, which contain 8–10% nickel.',
    },
    {
      title: 'Dual Size Strategy: 100mm vs 150mm',
      body: 'The 100mm compact size aligns with the beard comb market (growing at 7.2% CAGR globally). Beard combs are carried daily in pockets — a high-frequency brand exposure surface. The 150mm standard size serves the traditional hair comb market but also functions as a desk grooming tool. Offering both sizes lets buyers target different recipient demographics within a single order.',
    },
  ],

  'WP-305-industrial-mini-edc-pry-bar': [
    {
      title: 'Titanium vs Stainless Steel: The Weight-Strength Equation',
      body: 'Grade 5 titanium (Ti-6Al-4V) has a tensile strength of 950 MPa at 4.43 g/cm³ — a specific strength of 214 kN·m/kg. 303 stainless steel has 690 MPa at 8.0 g/cm³ — specific strength of 86 kN·m/kg. The titanium version delivers 2.5× more strength per gram. On a keychain where every gram is felt, this matters: same prying force, 45% less weight.',
    },
    {
      title: 'Pry Bar Geometry: Tapered Tip Engineering',
      body: 'The tapered pry tip follows a 15° included angle — thin enough to slide under packing tape and staple heads, but thick enough at the fulcrum point to resist bending. This geometry concentrates the user\'s hand force (typically 10–30N) into a tip area of approximately 2mm², generating 5–15 MPa of localized pressure — sufficient to separate adhesive bonds and deform thin metal staples.',
    },
  ],

  'WP-306-executive-zinc-alloy-nail-clipper': [
    {
      title: '3CR13 Steel: The Blade Sweet Spot',
      body: '3CR13 (0.30% C, 13% Cr) is a martensitic stainless steel heat-treated to HRC 52–56. It\'s harder than 2CR13 (used in budget clippers, HRC 46–50) but softer than 7CR17 (used in surgical instruments, HRC 58–62). The mid-range hardness is optimal for nail clippers: hard enough to maintain a sharp edge through hundreds of cuts, but ductile enough to resist chipping on thick toenails.',
    },
    {
      title: 'Folding Box Design: Clipping Containment',
      body: 'The enclosed zinc alloy housing captures nail clippings during use — an engineered solution to the perennial office grooming complaint. The housing acts as a deflection chamber: clippings hit the interior walls and fall to the bottom rather than scattering. This single feature makes the difference between a grooming tool that\'s acceptable in office environments and one that isn\'t.',
    },
  ],

  'WP-307-edc-folding-metal-scissors': [
    {
      title: '2CR13 Martensitic Steel: Rust-Resistant Cutting',
      body: '2CR13 (0.20% C, 13% Cr) is heat-treated to HRC 48–52 and then passivated — a chemical process (typically citric acid bath) that enhances the chromium oxide surface layer. This passivated layer provides corrosion resistance comparable to 304 austenitic steel while maintaining the hardness needed for a lasting cutting edge. Standard carbon steel scissors would develop visible rust spots within weeks of office use.',
    },
    {
      title: 'Riveted Pivot vs Spring Pivot',
      body: 'The riveted pivot (solid metal pin with precision-set tension) is mechanically simpler and more durable than spring-loaded designs. It has zero components that can fatigue or break — the pivot tension is set during manufacturing by cold-pressing the rivet to a calibrated diameter. This is why industrial scissors use riveted pivots: consistent cutting force for tens of thousands of cycles without adjustment.',
    },
    {
      title: 'Built-In Ruler: Precision Etching',
      body: 'The millimeter graduations are produced by fiber laser marking (20–50W, 1064nm wavelength) — the same process used for surgical instrument calibration marks. The laser creates a permanent oxide mark in the steel surface (color change, not material removal) that cannot be rubbed off by handling. Accuracy is typically ±0.1mm over the marked length — adequate for packaging measurements and craft work.',
    },
  ],

  // ─── DRINKWARE (WP-4xx) ───────────────────────────────────────────────────

  'WP-401-pure-titanium-vacuum-insulated-bottle': [
    {
      title: 'Pure Titanium Liner: The Health Argument',
      body: 'Standard "stainless steel" bottles use 304 SS (18% Cr, 8% Ni) or 201 SS (4% Ni). Nickel leaches at detectable levels when in contact with acidic beverages (coffee pH 4.8–5.1, orange juice pH 3.3–4.2) — a concern for nickel-sensitive individuals (affecting 10–20% of the population). Pure titanium contains zero nickel and is classified as biocompatible by ISO 10993. This isn\'t marketing — it\'s materials science.',
    },
    {
      title: 'Vacuum Insulation: The Physics',
      body: 'Double-wall vacuum insulation eliminates convective heat transfer (no air to carry heat) and reduces conductive transfer to just the thin wall connection at the rim. The remaining heat loss is primarily radiative — mitigated by the reflective metal inner surface. Total thermal conductivity drops from ~0.025 W/m·K (air gap) to <0.001 W/m·K (vacuum gap) — a 25× improvement over air-insulated double-wall designs.',
    },
    {
      title: '316 SS Exterior: Why Not Titanium Throughout?',
      body: 'A full-titanium bottle would cost 3–4× more due to titanium\'s difficulty in forming, welding, and finishing. The 316 SS exterior provides superior impact resistance (higher ductility than titanium) and accepts a wider range of surface treatments (sandblasting, crystal coating, color PVD). The critical contact surface — the interior where beverage touches metal — is pure titanium. The exterior is engineered for durability and aesthetics.',
    },
  ],

  'WP-402-pure-titanium-capsule-flask-150ml': [
    {
      title: 'Pure Titanium vs Titanium Alloy',
      body: 'This flask uses commercially pure titanium (Grade 1–2, >99% Ti) — not Ti-6Al-4V alloy. Pure titanium is softer (HRC 20 vs 36) but has superior corrosion resistance and zero aluminum content. For a drinking vessel, pure titanium is the correct choice: no aluminum leaching, no vanadium exposure, and the lower hardness actually allows better forming of the capsule profile.',
    },
    {
      title: 'Food-Grade PP Cap: Material Selection Logic',
      body: 'Polypropylene (PP) is chosen over alternatives because: HDPE leaches more readily under heat; silicone absorbs flavors over time; PTFE (Teflon) is expensive and difficult to form into threads. PP withstands boiling water (100°C, well within its 160°C continuous service temperature), is mechanically durable for daily threading, and is certified food-safe under FDA 21 CFR 177.1520 and EU 10/2011.',
    },
    {
      title: '150ml: The "Double Espresso" Capacity',
      body: 'The 150ml capacity is not arbitrary — it\'s calibrated to the standard double espresso (60ml) plus room for hot water dilution (Americano, long black). This positions the flask as a coffee ritual accessory rather than a general hydration container. For corporate gifting, this specificity creates a more compelling story than a generic "small bottle."',
    },
  ],

  'WP-403-weighted-vacuum-insulated-office-tumbler': [
    {
      title: 'SUS304 vs SUS201: The Numbers',
      body: 'SUS304 (18/8 — 18% Cr, 8% Ni) is the genuine food-grade stainless steel standard. SUS201 (17% Cr, 4% Ni, 6% Mn) is a cost-reduced alternative that substitutes manganese for nickel — resulting in significantly lower corrosion resistance and higher nickel leaching rates. Many budget tumblers use 201 and simply label it "stainless steel." The SUS304 specification is a verifiable quality claim.',
    },
    {
      title: 'Full-Wrap Sleeve Printing Technology',
      body: 'The polyester-nylon sleeve accepts dye-sublimation printing — a process where ink is vaporized at 200°C and infused into the fabric fibers (not layered on top). This produces photographic-quality, 300 DPI full-color artwork that is washable, fade-resistant, and will not crack or peel. The same technology is used for sports jersey printing. Print area coverage is effectively 100% of the visible sleeve surface.',
    },
    {
      title: 'Wide Squat Form Factor: Desk Stability Physics',
      body: 'At 8.5cm tall × 8.5cm diameter (H/D ratio = 1.0), this tumbler has the lowest center of gravity possible for its volume. Standard travel mugs (H/D ratio 2.5–3.0) are inherently tippy. The 310g base weight further lowers the CG below the midpoint. Result: this tumbler requires a lateral force of approximately 3.5N to tip — 2–3× more than a standard travel mug — making desk spills significantly less likely.',
    },
  ],

  'WP-404-bamboo-groove-stainless-steel-mug': [
    {
      title: '304 SS for Campfire Use: Temperature Safety',
      body: '304 stainless steel maintains structural integrity up to 870°C continuous service temperature — well above any campfire contact temperature (typically 300–500°C at pot height). Unlike enamel mugs that can crack if thermal-shocked (cold water into a hot mug), 304 SS handles rapid temperature changes without damage. The chromium oxide layer also prevents food-grade decomposition at cooking temperatures.',
    },
    {
      title: 'Bamboo-Groove Machining: CNC Turning',
      body: 'The bamboo-joint texture is cut directly into the steel body using a CNC lathe with a profiled cutting tool — a single-setup operation that creates the alternating groove-and-ridge pattern in one pass. This is the same technique used for machining O-ring grooves in hydraulic cylinders. The ridges provide 40–60% more grip friction than a smooth surface, eliminating the need for rubber or silicone sleeves.',
    },
    {
      title: 'Single-Wall Design: An Intentional Choice',
      body: 'This is deliberately a single-wall mug — not a vacuum-insulated tumbler. Single-wall construction allows direct heating over a flame (double-wall vessels can explode under direct heat due to trapped air expansion). It also means the mug weight is 300–500g — appropriate for outdoor carry. For camping and outdoor gifting, function trumps insulation.',
    },
  ],

  'WP-405-ice-crystal-pure-titanium-egg-cup': [
    {
      title: 'Ice-Crystal Finish: Controlled Crystallization',
      body: 'The "ice-crystal" surface is produced through a controlled oxidation process at 400–600°C in an oxygen-enriched atmosphere. At these temperatures, titanium\'s oxide layer thickens non-uniformly, creating crystal-like facets that refract light at different angles — producing the distinctive frost-like visual pattern. Each piece develops a unique crystal structure, making the finish genuinely one-of-a-kind.',
    },
    {
      title: 'Titanium Thin-Film Color: No Dye, No Paint',
      body: 'Titanium\'s anodized colors (gold, blue, purple) are structural colors — produced by light interference in the transparent oxide layer (TiO₂), not by pigment. The oxide thickness determines the color: 30nm = gold, 50nm = blue, 70nm = purple. This is the same phenomenon that creates colors in soap bubbles and oil slicks. The color cannot fade because it\'s a physical property of the oxide thickness, not a chemical dye.',
    },
    {
      title: '55g at 260ml: Titanium\'s Weight Advantage',
      body: 'Pure titanium (4.51 g/cm³) is 43% lighter than 304 stainless steel (7.93 g/cm³) at equal wall thickness. A 260ml titanium cup at 55g compares to a stainless steel equivalent at approximately 95g. This 40g difference is immediately perceptible when lifting the cup — a "lighter than expected" moment that communicates material quality to anyone who picks it up for the first time.',
    },
  ],
}

async function main() {
  let ok = 0
  let fail = 0

  for (const [id, expertNotes] of Object.entries(notes)) {
    try {
      const result = await db
        .update(products)
        .set({ expertNotes })
        .where(eq(products.id, id))

      console.log(`✓ ${id}`)
      ok++
    } catch (err) {
      console.error(`✗ ${id}:`, err)
      fail++
    }
  }

  console.log(`\nDone: ✓ ${ok} / ✗ ${fail}`)
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
