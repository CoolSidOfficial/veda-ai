# VedaAI — AI Assessment Extraction & Answer Mapping

## What We Are Building

VedaAI takes two inputs:

1. A question paper
2. A student's handwritten answer sheet

The system then determines:

- What questions are present
- What the student answered
- Which answer belongs to which question
- Which questions were not answered
- Which answers could not be confidently mapped
- Where each answer physically exists on the answer sheet

The final result is shown in a teacher-friendly interface where selecting a question highlights its answer directly on the answer sheet.

---

# Our Core Logic

We intentionally divide the system into two major responsibilities:

```text
Documents
    ↓
Gemini
    ↓
Understand the documents
    ↓
Structured JSON
    ↓
Frontend
    ↓
Visualize the result