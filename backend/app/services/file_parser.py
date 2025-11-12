import io
import os
from typing import Optional

def parse_bytes(file_bytes: bytes, filename: str) -> str:
    """Return extracted text from file bytes based on extension.

    Supports PDF and DOCX. Falls back to decoding as utf-8 text.
    """
    name = (filename or "").lower()
    ext = None
    if "." in name:
        ext = name.rsplit(".", 1)[1]

    # Try DOCX
    if ext == "docx":
        try:
            from docx import Document

            f = io.BytesIO(file_bytes)
            doc = Document(f)
            paragraphs = [p.text for p in doc.paragraphs]
            return "\n".join(paragraphs)
        except Exception:
            pass

    # Try PDF via PyMuPDF (fitz)
    if ext == "pdf":
        try:
            import fitz  # PyMuPDF

            doc = fitz.open(stream=file_bytes, filetype="pdf")
            text = []
            for page in doc:
                text.append(page.get_text())
            return "\n".join(text)
        except Exception:
            pass

    # Fallback: try pdfminer.six (slower) if available
    try:
        from pdfminer.high_level import extract_text_to_fp

        if ext == "pdf":
            output = io.StringIO()
            extract_text_to_fp(io.BytesIO(file_bytes), output)
            return output.getvalue()
    except Exception:
        pass

    # Final fallback: try to decode as utf-8 text
    try:
        return file_bytes.decode("utf-8")
    except Exception:
        # Give up — return empty string
        return ""
