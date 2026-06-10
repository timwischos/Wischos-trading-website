import fitz

doc = fitz.open("Wischos_Gift_Catalog.pdf")
print("Extracting images for OCR...")
for i in range(len(doc)):
    pix = doc[i].get_pixmap(dpi=150)
    pix.save(f"page_{i}.png")
