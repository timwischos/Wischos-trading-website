import fitz

doc = fitz.open("Wischos_Gift_Catalog.pdf")

for i in range(len(doc)):
    page = doc[i]
    blocks = page.get_text("blocks")
    for b in blocks:
        text = b[4].lower()
        if "moq" in text or "price" in text or "fob" in text or "$" in text:
            print(f"Page {i+1}: {b[:4]} - {repr(b[4])}")
