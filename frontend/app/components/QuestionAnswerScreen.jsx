"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ArrowLeft,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ZoomIn,
  ZoomOut,
  Grid2X2,
  FileText,
  Clock3,
  ClipboardList,
  BookOpen,
} from "lucide-react";

export default function QuestionAnswerScreen({
  results,
  files,
}) {
  const extractedData = results?.data || results || {};

  const questions = extractedData.questions || [];
  const answers = extractedData.answers || [];
  const unansweredQuestions =
    extractedData.unansweredQuestions || [];
  const unmatchedAnswers =
    extractedData.unmatchedAnswers || [];

  const [selected, setSelected] = useState(
    questions[0]?.number || null
  );

  const [expandedQuestions, setExpandedQuestions] =
    useState(
      questions[0]?.number
        ? [questions[0].number]
        : []
    );

  const [currentPage, setCurrentPage] = useState(1);

  const [zoom, setZoom] = useState(100);

  const answerImageRef = useRef(null);

  const answerSheet = files?.answerSheet;

  const [answerSheetUrl, setAnswerSheetUrl] =
    useState(null);

  useEffect(() => {
    if (!answerSheet) {
      setAnswerSheetUrl(null);
      return;
    }

    const url = URL.createObjectURL(answerSheet);

    setAnswerSheetUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [answerSheet]);

  const getQuestionId = (question) => {
    return String(
      question.id ||
        `${question.number}${question.sub || ""}`
    );
  };

  const getQuestionNumber = (question) => {
    return String(question.number);
  };

  const isQuestionUnanswered = (question) => {
    const number = getQuestionNumber(question);

    return unansweredQuestions.some(
      (item) =>
        String(item.questionNumber) === number
    );
  };

  const getAnswerForQuestion = (question) => {
    const number = getQuestionNumber(question);

    return answers.find(
      (answer) =>
        String(answer.questionNumber) === number
    );
  };

  const selectedQuestion = questions.find(
    (question) =>
      getQuestionId(question) === selected
  );

  const selectedAnswer = selectedQuestion
    ? getAnswerForQuestion(selectedQuestion)
    : null;

  const selectedRegions = useMemo(() => {
    if (!selectedAnswer?.regions) {
      return [];
    }

    return selectedAnswer.regions.filter(
      (region) =>
        Number(region.page) === currentPage
    );
  }, [selectedAnswer, currentPage]);

  const totalPages = useMemo(() => {
    let highestPage = 1;

    answers.forEach((answer) => {
      answer.regions?.forEach((region) => {
        const page = Number(region.page);

        if (page > highestPage) {
          highestPage = page;
        }
      });
    });

    unmatchedAnswers.forEach((answer) => {
      answer.regions?.forEach((region) => {
        const page = Number(region.page);

        if (page > highestPage) {
          highestPage = page;
        }
      });
    });

    return highestPage;
  }, [answers, unmatchedAnswers]);

  /*
   * Gemini now returns normalized coordinates:
   *
   * x      = 0 - 1000
   * y      = 0 - 1000
   * width  = 0 - 1000
   * height = 0 - 1000
   *
   * The overlay is positioned relative to the displayed
   * image, so we convert the normalized values directly
   * into percentages.
   */

  const getRegionStyle = (bbox) => {
    if (!bbox) {
      return null;
    }

    const x = Number(bbox.x);
    const y = Number(bbox.y);
    const width = Number(bbox.width);
    const height = Number(bbox.height);

    if (
      !Number.isFinite(x) ||
      !Number.isFinite(y) ||
      !Number.isFinite(width) ||
      !Number.isFinite(height)
    ) {
      return null;
    }

    return {
      left: `${(x / 1000) * 100}%`,
      top: `${(y / 1000) * 100}%`,
      width: `${(width / 1000) * 100}%`,
      height: `${(height / 1000) * 100}%`,
    };
  };

  const toggleQuestion = (question) => {
    const id = getQuestionId(question);

    setSelected(id);

    const answer =
      getAnswerForQuestion(question);

    if (answer?.regions?.length) {
      const firstPage = Number(
        answer.regions[0].page
      );

      if (
        firstPage &&
        firstPage <= totalPages
      ) {
        setCurrentPage(firstPage);
      }
    }

    setExpandedQuestions((previous) => {
      if (previous.includes(id)) {
        return previous.filter(
          (questionId) =>
            questionId !== id
        );
      }

      return [...previous, id];
    });
  };

  const expandAll = () => {
    setExpandedQuestions(
      questions.map((question) =>
        getQuestionId(question)
      )
    );
  };

  const collapseAll = () => {
    setExpandedQuestions([]);
  };

  const allExpanded =
    questions.length > 0 &&
    expandedQuestions.length ===
      questions.length;

  const getScore = (question) => {
    const answer =
      getAnswerForQuestion(question);

    if (isQuestionUnanswered(question)) {
      return "0 / ?";
    }

    if (!answer) {
      return "—";
    }

    return answer.score || "—";
  };

  const isPdf =
    answerSheet?.type ===
    "application/pdf";

  const isImage =
    answerSheet?.type?.startsWith("image/");

  const zoomIn = () => {
    setZoom((previous) =>
      Math.min(previous + 10, 150)
    );
  };

  const zoomOut = () => {
    setZoom((previous) =>
      Math.max(previous - 10, 70)
    );
  };

  const previousPage = () => {
    setCurrentPage((previous) =>
      Math.max(previous - 1, 1)
    );
  };

  const nextPage = () => {
    setCurrentPage((previous) =>
      Math.min(
        previous + 1,
        totalPages
      )
    );
  };

  if (!questions.length) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
        <div className="text-center">
          <h1 className="text-xl font-semibold">
            No questions extracted
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Gemini did not return any questions.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen overflow-hidden bg-[#e8e8e8] font-bricolage text-[#303030]">

      <header className="flex h-[64px] items-center justify-between border-b border-[#e5e5e5] bg-white px-5">

        <div className="flex items-center gap-4">
          <button
            className="
              flex h-9 w-9
              items-center
              justify-center
              rounded-full
              transition
              hover:bg-[#f5f5f5]
            "
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex items-center gap-2 text-[12px] text-[#8a8a8a]">
            <FileText size={14} />

            <span>
              Exams
            </span>
          </div>
        </div>

        <div className="flex items-center gap-5">

          <button className="hidden h-7 w-7 items-center justify-center sm:flex">
            <span className="text-[15px]">
              ?
            </span>
          </button>

          <button className="relative">
            <Bell size={17} />

            <span
              className="
                absolute
                -right-1
                -top-1
                h-[6px]
                w-[6px]
                rounded-full
                bg-[#ff6242]
              "
            />
          </button>

          <div className="flex items-center gap-2">

            <div
              className="
                flex h-8 w-8
                items-center
                justify-center
                rounded-full
                bg-[#f2ddd5]
                text-sm
              "
            >
              👨🏻
            </div>

            <span className="hidden text-[12px] sm:block">
              Madhur Rastogi
            </span>

            <ChevronDown
              size={13}
              className="hidden sm:block"
            />

          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)] overflow-hidden">

        <aside
          className="
            hidden
            w-[72px]
            shrink-0
            flex-col
            items-center
            border-r
            border-[#e5e5e5]
            bg-white
            py-4
            md:flex
          "
        >

          <div
            className="
              flex h-9 w-9
              items-center
              justify-center
              rounded-lg
              bg-[#303030]
            "
          >
            <span className="text-lg font-black text-white">
              V
            </span>
          </div>

          <button
            className="
              mt-7
              flex h-9 w-9
              items-center
              justify-center
              rounded-full
              border-2
              border-[#ff8d36]
              bg-[#292929]
              text-white
            "
          >
            ✦
          </button>

          <div
            className="
              mt-8
              flex
              flex-col
              items-center
              gap-7
              text-[#777]
            "
          >
            <Grid2X2 size={16} />
            <BookOpen size={16} />
            <ClipboardList size={16} />
            <FileText size={16} />
            <Clock3 size={16} />
          </div>

          <div className="mt-auto">

            <div
              className="
                flex h-9 w-9
                items-center
                justify-center
                rounded-full
                bg-[#f0f0f0]
              "
            >
              ♕
            </div>

          </div>

          <span className="mt-4 text-sm text-[#777]">
            »
          </span>
        </aside>

        <section
          className="
            flex
            w-full
            max-w-[640px]
            shrink-0
            flex-col
            bg-[#eeeeee]
          "
        >

          <div
            className="
              flex
              min-h-[70px]
              items-center
              justify-between
              px-5
            "
          >

            <h2 className="text-[14px] font-semibold">
              Extracted Questions

              <span className="font-normal text-[#777]">
                {" "}
                (from question paper)
              </span>
            </h2>

            <button
              onClick={
                allExpanded
                  ? collapseAll
                  : expandAll
              }
              className="
                rounded-[9px]
                bg-white
                px-4
                py-2
                text-[11px]
                font-medium
                shadow-sm
                transition
                hover:bg-[#f7f7f7]
              "
            >
              {allExpanded
                ? "Collapse All"
                : "Expand All"}
            </button>
          </div>

          <div
            className="
              flex-1
              overflow-y-auto
              px-4
              pb-8
            "
          >

            <div className="space-y-3">

              {questions.map((question) => {

                const id =
                  getQuestionId(question);

                const isSelected =
                  selected === id;

                const isExpanded =
                  expandedQuestions.includes(id);

                const answer =
                  getAnswerForQuestion(question);

                const unanswered =
                  isQuestionUnanswered(
                    question
                  );

                return (
                  <div
                    key={id}
                    className={`
                      w-full
                      rounded-[16px]
                      bg-white
                      transition-all
                      ${
                        isSelected
                          ? "border-2 border-[#ff8d36]"
                          : "border-2 border-transparent"
                      }
                    `}
                  >

                    <button
                      onClick={() =>
                        toggleQuestion(
                          question
                        )
                      }
                      className="
                        flex
                        w-full
                        items-start
                        gap-3
                        p-3
                        text-left
                      "
                    >

                      <div
                        className={`
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          text-[13px]
                          font-semibold
                          text-white
                          ${
                            isSelected
                              ? "bg-[#ff633f]"
                              : "bg-[#626262]"
                          }
                        `}
                      >
                        {question.number}
                      </div>

                      <div className="min-w-0 flex-1">

                        <div className="flex items-start gap-4">

                          <p
                            className="
                              flex-1
                              text-[16px]
                              font-normal
                              leading-[140%]
                              tracking-[-0.64px]
                              text-[#303030]
                            "
                          >
                            {question.sub && (
                              <span className="mr-2 font-semibold">
                                {question.sub}
                              </span>
                            )}

                            {question.text}
                          </p>

                          <span
                            className={`
                              mt-0.5
                              shrink-0
                              rounded-full
                              px-3
                              py-1
                              text-[11px]
                              font-semibold
                              ${
                                unanswered
                                  ? "bg-[#f1f1f1] text-[#888]"
                                  : answer
                                    ? "bg-[#e6f7e4] text-[#3fa43b]"
                                    : "bg-[#fff0e9] text-[#ef6847]"
                              }
                            `}
                          >
                            {getScore(question)}
                          </span>

                        </div>
                      </div>

                      <div className="pt-1 text-[#777]">

                        {isExpanded ? (
                          <ChevronUp
                            size={17}
                          />
                        ) : (
                          <ChevronDown
                            size={17}
                          />
                        )}

                      </div>

                    </button>

                    {isExpanded && answer && (
                      <div
                        className="
                          mx-3
                          mb-3
                          rounded-[10px]
                          bg-[#f5f5f5]
                          p-3
                        "
                      >

                        <div className="flex items-center justify-between">

                          <p className="text-[12px] font-semibold">
                            Student Answer
                          </p>

                          {answer.confidence != null && (
                            <span className="text-[10px] text-[#888]">
                              {Math.round(
                                answer.confidence *
                                  100
                              )}
                              % confidence
                            </span>
                          )}

                        </div>

                        <p
                          className="
                            mt-2
                            whitespace-pre-line
                            text-[12px]
                            leading-[140%]
                            text-[#555]
                          "
                        >
                          {answer.text}
                        </p>

                      </div>
                    )}

                    {isExpanded && unanswered && (
                      <div
                        className="
                          mx-3
                          mb-3
                          rounded-[10px]
                          bg-[#f5f5f5]
                          p-3
                        "
                      >

                        <p className="text-[12px] font-semibold">
                          Unanswered
                        </p>

                        <p className="mt-1 text-[12px] text-[#888]">
                          No answer was found for
                          this question.
                        </p>

                      </div>
                    )}

                  </div>
                );
              })}

            </div>
          </div>
        </section>

        <section
          className="
            hidden
            min-w-0
            flex-1
            flex-col
            bg-[#d7d7d7]
            md:flex
          "
        >

          <div
            className="
              flex
              h-[58px]
              shrink-0
              items-center
              justify-between
              bg-[#292929]
              px-5
              text-white
            "
          >

            <span className="text-[12px] font-medium">
              Answer Sheet
            </span>

            <div className="flex items-center gap-2">

              <button
                onClick={zoomOut}
                className="
                  flex h-8 w-8
                  items-center
                  justify-center
                  rounded-md
                  bg-[#414141]
                  transition
                  hover:bg-[#4b4b4b]
                "
              >
                <ZoomOut size={14} />
              </button>

              <span className="px-1 text-[11px]">
                {zoom}%
              </span>

              <button
                onClick={zoomIn}
                className="
                  flex h-8 w-8
                  items-center
                  justify-center
                  rounded-md
                  bg-[#414141]
                  transition
                  hover:bg-[#4b4b4b]
                "
              >
                <ZoomIn size={14} />
              </button>

              <div
                className="
                  ml-3
                  flex h-8
                  items-center
                  gap-2
                  rounded-md
                  bg-[#414141]
                  px-3
                "
              >

                <button
                  onClick={previousPage}
                  disabled={
                    currentPage === 1
                  }
                  className="disabled:opacity-40"
                >
                  <ChevronLeft size={13} />
                </button>

                <span className="text-[10px]">
                  Page {currentPage} of{" "}
                  {totalPages}
                </span>

                <button
                  onClick={nextPage}
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  className="disabled:opacity-40"
                >
                  <ChevronRight size={13} />
                </button>

              </div>
            </div>
          </div>

          <div
            className="
              flex-1
              overflow-auto
              p-6
            "
          >

            <div
              className="mx-auto w-fit rounded-sm"
              style={{
                zoom: `${zoom}%`,
              }}
            >

              {isImage &&
                answerSheetUrl && (
                  <div
                    className="
                      relative
                      w-[720px]
                      bg-white
                      shadow-lg
                    "
                  >

                    <img
                      ref={answerImageRef}
                      src={answerSheetUrl}
                      alt="Student answer sheet"
                      className="
                        block
                        h-auto
                        w-[720px]
                        max-w-none
                      "
                    />

                    {selectedRegions.map(
                      (region, index) => {

                        const regionStyle =
                          getRegionStyle(
                            region.bbox
                          );

                        if (!regionStyle) {
                          return null;
                        }

                        return (
                          <div
                            key={`${selected}-${currentPage}-${index}`}
                            className="
                              pointer-events-none
                              absolute
                              rounded-[8px]
                              border-[3px]
                              border-[#65bd55]
                              bg-[#7ddc6e]/20
                              shadow-[0_0_0_2px_rgba(255,255,255,0.7)]
                            "
                            style={
                              regionStyle
                            }
                          >

                            <span
                              className="
                                absolute
                                -left-[3px]
                                -top-[27px]
                                rounded-t-[6px]
                                bg-[#65bd55]
                                px-3
                                py-1
                                text-[10px]
                                font-semibold
                                text-white
                                whitespace-nowrap
                              "
                            >
                              Q
                              {
                                selectedQuestion?.number
                              }
                            </span>

                          </div>
                        );
                      }
                    )}

                  </div>
                )}

              {isPdf &&
                answerSheetUrl && (
                  <div className="relative">

                    <iframe
                      src={answerSheetUrl}
                      title="Student answer sheet"
                      className="
                        h-[900px]
                        w-[720px]
                        border-0
                        bg-white
                        shadow-lg
                      "
                    />

                    {selectedAnswer &&
                      selectedRegions.length >
                        0 && (
                        <div
                          className="
                            mt-3
                            rounded-lg
                            bg-white
                            px-4
                            py-3
                            text-[11px]
                            text-[#777]
                            shadow-sm
                          "
                        >
                          Answer detected on
                          page{" "}
                          {currentPage}.
                          PDF highlighting will
                          be enabled with the
                          document renderer.
                        </div>
                      )}

                  </div>
                )}

              {!answerSheetUrl && (
                <div
                  className="
                    flex
                    h-[700px]
                    w-[600px]
                    items-center
                    justify-center
                    bg-white
                    text-center
                    text-sm
                    text-gray-500
                    shadow-lg
                  "
                >
                  Answer sheet preview
                  unavailable.
                </div>
              )}

            </div>
          </div>
        </section>

      </div>
    </main>
  );
}