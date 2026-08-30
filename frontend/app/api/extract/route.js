import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
];

export async function POST(request) {
  try {
    // ==========================================
    // GET UPLOADED FILES
    // ==========================================

    const formData = await request.formData();

    const questionPaper = formData.get("questionPaper");
    const answerSheet = formData.get("answerSheet");

    if (!questionPaper || !answerSheet) {
      return Response.json(
        {
          success: false,
          error:
            "Both question paper and answer sheet are required.",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // CHECK FILE OBJECTS
    // ==========================================

    if (!(questionPaper instanceof File)) {
      return Response.json(
        {
          success: false,
          error: "Invalid question paper file.",
        },
        { status: 400 }
      );
    }

    if (!(answerSheet instanceof File)) {
      return Response.json(
        {
          success: false,
          error: "Invalid answer sheet file.",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // CHECK FILE TYPES
    // ==========================================

    if (!ALLOWED_TYPES.includes(questionPaper.type)) {
      return Response.json(
        {
          success: false,
          error:
            "Question paper must be PDF, PNG, JPG, JPEG, or WEBP.",
        },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(answerSheet.type)) {
      return Response.json(
        {
          success: false,
          error:
            "Answer sheet must be PDF, PNG, JPG, JPEG, or WEBP.",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // CHECK FILE SIZE
    // ==========================================

    if (questionPaper.size > MAX_FILE_SIZE) {
      return Response.json(
        {
          success: false,
          error:
            "Question paper must be smaller than 10MB.",
        },
        { status: 400 }
      );
    }

    if (answerSheet.size > MAX_FILE_SIZE) {
      return Response.json(
        {
          success: false,
          error:
            "Answer sheet must be smaller than 10MB.",
        },
        { status: 400 }
      );
    }

    console.log("Question Paper:", {
      name: questionPaper.name,
      type: questionPaper.type,
      size: questionPaper.size,
    });

    console.log("Answer Sheet:", {
      name: answerSheet.name,
      type: answerSheet.type,
      size: answerSheet.size,
    });

    // ==========================================
    // CONVERT FILES TO BASE64
    // ==========================================

    const questionPaperBuffer = Buffer.from(
      await questionPaper.arrayBuffer()
    );

    const answerSheetBuffer = Buffer.from(
      await answerSheet.arrayBuffer()
    );

    const questionPaperBase64 =
      questionPaperBuffer.toString("base64");

    const answerSheetBase64 =
      answerSheetBuffer.toString("base64");

    // ==========================================
    // CREATE GEMINI CONTENT
    // ==========================================

    const questionPaperContent =
      questionPaper.type === "application/pdf"
        ? {
            type: "document",
            data: questionPaperBase64,
            mime_type: "application/pdf",
          }
        : {
            type: "image",
            data: questionPaperBase64,
            mime_type: questionPaper.type,
          };

    const answerSheetContent =
      answerSheet.type === "application/pdf"
        ? {
            type: "document",
            data: answerSheetBase64,
            mime_type: "application/pdf",
          }
        : {
            type: "image",
            data: answerSheetBase64,
            mime_type: answerSheet.type,
          };

    // ==========================================
    // PROMPT
    // ==========================================

    const prompt = `
You are an AI assessment extraction and answer mapping system.

You have TWO documents:

1. QUESTION PAPER
2. STUDENT ANSWER SHEET

Analyze both documents together.

QUESTION PAPER REQUIREMENTS:

- Extract every question.
- Preserve the original printed numbering.
- Preserve the original printed order.
- Treat labelled sub-parts as separate questions.
- For example, 11(a) and 11(b) are separate questions.
- Do not invent questions.

ANSWER SHEET REQUIREMENTS:

- Analyze the complete answer sheet.
- Identify every student answer.
- Answers may be written out of order.
- Determine which question each answer belongs to.
- Answers may continue across multiple pages.
- Identify unanswered questions.
- Identify answers that cannot confidently be matched.
- Do not invent answers.
- Do not invent question numbers.

For every answer, identify its location on the answer sheet.

Return ONLY valid JSON.

Use this structure:

{
  "questions": [
    {
      "number": "1",
      "text": "Question text",
      "order": 1
    }
  ],
  "answers": [
    {
      "questionNumber": "1",
      "text": "Student answer",
      "status": "answered",
      "confidence": 0.95,
      "regions": [
        {
          "page": 1,
          "bbox": {
            "x": 100,
            "y": 200,
            "width": 500,
            "height": 150
          }
        }
      ]
    }
  ],
  "unansweredQuestions": [
    {
      "questionNumber": "4"
    }
  ],
  "unmatchedAnswers": [
    {
      "text": "Unmatched answer",
      "confidence": 0.30,
      "regions": [
        {
          "page": 2,
          "bbox": {
            "x": 100,
            "y": 300,
            "width": 500,
            "height": 200
          }
        }
      ]
    }
  ]
}

For an answer spanning multiple pages, return multiple regions.

If an answer cannot be confidently mapped, put it in unmatchedAnswers.

Return JSON only.
`;

    // ==========================================
    // SEND BOTH FILES TO GEMINI
    // ==========================================

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",

      input: [
        {
          type: "text",
          text: prompt,
        },

        questionPaperContent,

        answerSheetContent,
      ],
    });

    // ==========================================
    // GET GEMINI RESPONSE
    // ==========================================

    const output = interaction.output_text;

    console.log("Gemini response received.");

    // ==========================================
    // CLEAN JSON
    // ==========================================

    const cleanedOutput = output
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let result;

    try {
      result = JSON.parse(cleanedOutput);
    } catch (parseError) {
      console.error(
        "Gemini returned invalid JSON:",
        output
      );

      return Response.json(
        {
          success: false,
          error: "Gemini returned invalid JSON.",
          raw: output,
        },
        { status: 500 }
      );
    }

    // ==========================================
    // SUCCESS
    // ==========================================

    return Response.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Gemini extraction error:", error);

    return Response.json(
      {
        success: false,
        error:
          error?.message ||
          "Failed to process assessment.",
      },
      { status: 500 }
    );
  }
}