import pytest
from utils.rag_chain import setup_rag_chain

def test_rag_chain():
    rag = setup_rag_chain()
    response = rag.run("What are ways to reduce carbon footprint?")
    assert len(response) > 0
    assert "reduce" in response.lower()  # Basic content check