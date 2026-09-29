import unittest

from app.models.documents import OfficialPdfIngestionRequest
from app.services.ingestion.pdf_ingestor import build_document_payload


class OfficialPdfIngestionRequestTests(unittest.TestCase):
    def test_accepts_url_list(self):
        payload = OfficialPdfIngestionRequest(urls=["https://example.com/document.pdf"])
        self.assertEqual(payload.urls, ["https://example.com/document.pdf"])

    def test_document_payload_uses_only_verified_document_columns(self):
        payload = build_document_payload(
            "https://example.com/document.pdf",
            "Sample PDF",
            ["Page 1\nExample text"],
            1,
        )
        allowed = {"title", "authority", "jurisdiction", "document_type", "publication_year", "language", "source_url", "description", "status"}
        self.assertTrue(set(payload).issubset(allowed))
        self.assertNotIn("content", payload)
        self.assertNotIn("metadata", payload)
        self.assertEqual(payload["source_url"], "https://example.com/document.pdf")


if __name__ == "__main__":
    unittest.main()
