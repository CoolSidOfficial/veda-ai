import { GoogleGenAI } from "@google/genai";

import {
  GEMINI_MODELS,
  MAX_FILE_SIZE,
  ALLOWED_TYPES,
} from "../../config/ai";

import {
  ASSESSMENT_EXTRACTION_PROMPT,
} from "../../prompts/assessmentExtraction";

export const runtime = "nodejs";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function isRetryableGeminiError(error) {
  const message = String(
    error?.message || ""
  ).toLowerCase();

  const status = String(
    error?.status ||
      error?.code ||
      ""
  );

  if (status === "429") {
    return true;
  }

  if (
    message.includes("429") ||
    message.includes("quota exceeded") ||
    message.includes("rate limit") ||
    message.includes("resource exhausted")
  ) {
    return true;
  }

  if (status === "404") {
    return true;
  }

  if (
    message.includes("404") ||
    message.includes("not found") ||
    message.includes("no longer available") ||
    message.includes("model is not available")
  ) {
    return true;
  }

  if (status === "503") {
    return true;
  }

  if (
    message.includes("503") ||
    message.includes("service unavailable") ||
    message.includes("temporarily unavailable")
  ) {
    return true;
  }

  return false;
}

function cleanGeminiJson(output) {
  if (!output) {
    return "";
  }

  let cleaned = String(output).trim();

  cleaned = cleaned.replace(
    /^```json\s*/i,
    ""
  );

  cleaned = cleaned.replace(
    /^```\s*/i,
    ""
  );

  cleaned = cleaned.replace(
    /\s*```$/i,
    ""
  );

  return cleaned.trim();
}

export async function POST(request) {
  try {
    const formData =
      await request.formData();

    const questionPaper =
      formData.get("questionPaper");

    const answerSheet =
      formData.get("answerSheet");

    if (
      !questionPaper ||
      !answerSheet
    ) {
      return Response.json(
        {
          success: false,
          error:
            "Both question paper and answer sheet are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !(questionPaper instanceof File)
    ) {
      return Response.json(
        {
          success: false,
          error:
            "Invalid question paper file.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !(answerSheet instanceof File)
    ) {
      return Response.json(
        {
          success: false,
          error:
            "Invalid answer sheet file.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !ALLOWED_TYPES.includes(
        questionPaper.type
      )
    ) {
      return Response.json(
        {
          success: false,
          error:
            "Question paper must be PDF, PNG, JPG, JPEG, or WEBP.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !ALLOWED_TYPES.includes(
        answerSheet.type
      )
    ) {
      return Response.json(
        {
          success: false,
          error:
            "Answer sheet must be PDF, PNG, JPG, JPEG, or WEBP.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      questionPaper.size >
      MAX_FILE_SIZE
    ) {
      return Response.json(
        {
          success: false,
          error:
            "Question paper must be smaller than 10MB.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      answerSheet.size >
      MAX_FILE_SIZE
    ) {
      return Response.json(
        {
          success: false,
          error:
            "Answer sheet must be smaller than 10MB.",
        },
        {
          status: 400,
        }
      );
    }

    console.log(
      "Question Paper:",
      {
        name: questionPaper.name,
        type: questionPaper.type,
        size: questionPaper.size,
      }
    );

    console.log(
      "Answer Sheet:",
      {
        name: answerSheet.name,
        type: answerSheet.type,
        size: answerSheet.size,
      }
    );

    const questionPaperBuffer =
      Buffer.from(
        await questionPaper.arrayBuffer()
      );

    const answerSheetBuffer =
      Buffer.from(
        await answerSheet.arrayBuffer()
      );

    const questionPaperBase64 =
      questionPaperBuffer.toString(
        "base64"
      );

    const answerSheetBase64 =
      answerSheetBuffer.toString(
        "base64"
      );

    const questionPaperContent =
      questionPaper.type ===
      "application/pdf"
        ? {
            type: "document",
            data: questionPaperBase64,
            mime_type:
              "application/pdf",
          }
        : {
            type: "image",
            data: questionPaperBase64,
            mime_type:
              questionPaper.type,
          };

    const answerSheetContent =
      answerSheet.type ===
      "application/pdf"
        ? {
            type: "document",
            data: answerSheetBase64,
            mime_type:
              "application/pdf",
          }
        : {
            type: "image",
            data: answerSheetBase64,
            mime_type:
              answerSheet.type,
          };

    let interaction = null;
    let successfulModel = null;
    let lastError = null;

    for (
      let i = 0;
      i < GEMINI_MODELS.length;
      i++
    ) {
      const model =
        GEMINI_MODELS[i];

      try {
        console.log(
          `Trying Gemini model ${i + 1}/${GEMINI_MODELS.length}: ${model}`
        );

        interaction =
          await ai.interactions.create({
            model,

            input: [
              {
                type: "text",
                text:
                  ASSESSMENT_EXTRACTION_PROMPT,
              },
              questionPaperContent,
              answerSheetContent,
            ],
          });

        successfulModel =
          model;

        console.log(
          `Gemini succeeded with model: ${model}`
        );

        break;
      } catch (error) {
        lastError = error;

        console.error(
          `Gemini model failed: ${model}`
        );

        console.error(
          error?.message || error
        );

        if (
          isRetryableGeminiError(
            error
          )
        ) {
          console.log(
            `Falling back from ${model}...`
          );

          continue;
        }

        throw error;
      }
    }

    if (!interaction) {
      return Response.json(
        {
          success: false,
          error:
            "All available AI models are currently unavailable. Please try again shortly.",
          details:
            lastError?.message ||
            "No Gemini model succeeded.",
        },
        {
          status: 503,
        }
      );
    }

    const output =
      interaction.output_text;

    if (!output) {
      return Response.json(
        {
          success: false,
          error:
            "Gemini returned an empty response.",
          model:
            successfulModel,
        },
        {
          status: 500,
        }
      );
    }

    const cleanedOutput =
      cleanGeminiJson(
        output
      );

    let result;

    try {
      result =
        JSON.parse(
          cleanedOutput
        );
    } catch (parseError) {
      console.error(
        "Gemini returned invalid JSON."
      );

      console.error(
        output
      );

      return Response.json(
        {
          success: false,
          error:
            "Gemini returned invalid JSON.",
          model:
            successfulModel,
          raw: output,
        },
        {
          status: 500,
        }
      );
    }

    if (
      !Array.isArray(
        result.questions
      )
    ) {
      result.questions = [];
    }

    if (
      !Array.isArray(
        result.answers
      )
    ) {
      result.answers = [];
    }

    if (
      !Array.isArray(
        result.unansweredQuestions
      )
    ) {
      result.unansweredQuestions =
        [];
    }

    if (
      !Array.isArray(
        result.unmatchedAnswers
      )
    ) {
      result.unmatchedAnswers =
        [];
    }

    result.answers =
      result.answers.map(
        (answer) => ({
          ...answer,
          regions:
            Array.isArray(
              answer.regions
            )
              ? answer.regions
              : [],
        })
      );

    result.unmatchedAnswers =
      result.unmatchedAnswers.map(
        (answer) => ({
          ...answer,
          regions:
            Array.isArray(
              answer.regions
            )
              ? answer.regions
              : [],
        })
      );

    console.log(
      "Questions:",
      result.questions.length
    );

    console.log(
      "Answers:",
      result.answers.length
    );

    console.log(
      "Unanswered:",
      result.unansweredQuestions.length
    );

    console.log(
      "Unmatched:",
      result.unmatchedAnswers.length
    );

    return Response.json({
      success: true,
      model: successfulModel,
      data: result,
    });
  } catch (error) {
    console.error(
      "Assessment extraction error:",
      error
    );

    return Response.json(
      {
        success: false,
        error:
          error?.message ||
          "Failed to process assessment.",
      },
      {
        status: 500,
      }
    );
  }
}