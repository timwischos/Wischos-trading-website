"""
Rename product folders and files to match website display names.
Run with: python3 scripts/rename-products.py
"""
import os
import re

BASE = "/mnt/d/Project/Wischos trading website/public/products"

MAPPING = [
    ("Aluminium-Metal-Mouse-pad-01",                              "professional-aluminum-desk-mat"),
    ("Aluminium-Metal-pen-holder-01",                             "precision-aluminum-pen-holder"),
    ("Badge-holder-card-holder-with-metal-clip",                  "rfid-aluminum-wallet-badge-holder"),
    ("Bolt-action-pen-01",                                        "brass-crown-bolt-action-pen"),
    ("EDC-Carbon-Fibre-Magnetic-Fidget-Sticks-01",                "carbon-fiber-magnetic-fidget-stick"),
    ("Key-chain-organizer-holder-01",                             "industrial-brass-key-organizer"),
    ("Letter-opener-01",                                          "executive-zinc-alloy-letter-opener"),
    ("Letter-opener-02",                                          "propeller-spinning-letter-opener"),
    ("Metal-Multifunctional-Tool-Ballpoint-Pen-01",               "6-in-1-precision-metal-tool-pen"),
    ("Precision-brass-spinning-01",                               "precision-brass-spinning-top"),
    ("Tactical-Stainless-Steel-pen-01",                           "tactical-stainless-steel-pen"),
    ("Titanium-Anti-Static-Comb-Pocket-Multi -Tools-Comb-01",     "titanium-anti-static-edc-comb"),
    ("Titanium-water-bottle-01",                                  "pure-titanium-vacuum-insulated-bottle"),
    ("Stainless-Steel money-clip-01",                             "industrial-stainless-steel-money-clip"),
    ("Aluminum-Inkless-Pen-01",                                   "executive-dual-head-metal-pen"),
    ("Industrial-Mini-EDC-Pry-Bar-Keychain-01",                   "industrial-mini-edc-pry-bar"),
    ("Integrated-Boxed-Nail-Clipper-01",                          "executive-zinc-alloy-nail-clipper"),
    ("Metal-bookmark-01",                                         "precision-custom-metal-bookmark"),
    ("Multi-Purpose-mini-Folding-Scissors-01",                    "edc-folding-metal-scissors"),
    ("Minimalist-portale-stainless-steel-coffee-cup-01",          "weighted-vacuum-insulated-office-tumbler"),
    ("Stainless-Steel-Drink-Cup-01",                              "bamboo-groove-stainless-steel-mug"),
    ("150ml-Mini-Insulated-Titanium-Water-Bottle-01",             "pure-titanium-capsule-flask-150ml"),
    ("200ml-Pure-Titanium-Insulated-Cup-01",                      "pure-titanium-capsule-flask-200ml"),
    ("Titanium-Double-Layer-Insulated-Anti-Scalding-Water-Cup-01","ice-crystal-pure-titanium-egg-cup"),
]

# Matches: -cover.avif  -hover.avif  -detail-3.avif  -lifestyle.avif  etc.
SUFFIX_RE = re.compile(r'-(cover|hover|lifestyle|detail-\d+)\.(avif|jpg|png|webp)$', re.IGNORECASE)
CHINESE_DOCX = {'产品信息.docx', '产品描述.docx'}

errors = []

for old_name, new_name in MAPPING:
    old_path = os.path.join(BASE, old_name)
    if not os.path.isdir(old_path):
        print(f"⚠ SKIP (folder not found): {old_name}")
        continue

    print(f"\n{'='*60}")
    print(f"  {old_name}")
    print(f"→ {new_name}")

    for filename in list(os.listdir(old_path)):
        filepath = os.path.join(old_path, filename)

        # Delete Word temp files
        if filename.startswith('~$'):
            os.remove(filepath)
            print(f"  🗑  Deleted temp: {filename}")
            continue

        # Rename Chinese docx → {new_name}-product-info.docx
        if filename in CHINESE_DOCX:
            new_docx = f"{new_name}-product-info.docx"
            dst = os.path.join(old_path, new_docx)
            os.rename(filepath, dst)
            print(f"  📄 {filename} → {new_docx}")
            continue

        # Rename image files: extract suffix regardless of original prefix
        m = SUFFIX_RE.search(filename)
        if m:
            suffix = m.group(1)   # e.g. "cover", "detail-2"
            ext    = m.group(2)   # e.g. "avif"
            new_filename = f"{new_name}-{suffix}.{ext}"
            if filename != new_filename:
                dst = os.path.join(old_path, new_filename)
                try:
                    os.rename(filepath, dst)
                    print(f"  🖼  {filename} → {new_filename}")
                except Exception as e:
                    errors.append(f"{filename}: {e}")
                    print(f"  ✗  FAILED: {filename}: {e}")
        # else: skip unrecognised files silently

    # Rename the folder itself
    new_path = os.path.join(BASE, new_name)
    if old_name != new_name:
        try:
            os.rename(old_path, new_path)
            print(f"  📁 Folder renamed ✓")
        except Exception as e:
            errors.append(f"Folder {old_name}: {e}")
            print(f"  ✗  Folder rename FAILED: {e}")

print("\n" + "="*60)
if errors:
    print(f"COMPLETED WITH {len(errors)} ERROR(S):")
    for e in errors:
        print(f"  ✗ {e}")
else:
    print("ALL DONE — no errors.")
