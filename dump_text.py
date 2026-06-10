import fitz
import sys

doc = fitz.open("Wischos_Gift_Catalog.pdf")

with open("pdf_text_dump.txt", "w", encoding="utf-8") as f:
    for i in range(len(doc)):
        f.write(f"--- PAGE {i+1} ---\n")
        f.write(doc[i].get_text())
