import sys
import subprocess

for i in range(18):
    try:
        # Run tesseract on each image and grep for moq or price
        out = subprocess.check_output(["tesseract", f"page_{i}.png", "stdout"], stderr=subprocess.DEVNULL)
        text = out.decode('utf-8', errors='ignore').lower()
        if "moq" in text or "price" in text or "fob" in text or "$" in text:
            print(f"Page {i+1} has matches!")
            for line in text.split('\n'):
                if "moq" in line or "price" in line or "fob" in line or "$" in line:
                    print(f"  {line}")
    except Exception as e:
        print(f"Error on page {i}: {e}")
