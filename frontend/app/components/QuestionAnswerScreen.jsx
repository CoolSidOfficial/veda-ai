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
  Menu,
} from "lucide-react";

export default function QuestionAnswerScreen({
  results,
  files,
}) {
  const extractedData = results?.data || results || {};

  const questions = Array.isArray(extractedData.questions)
    ? extractedData.questions
    : [];

  const answers = Array.isArray(extractedData.answers)
    ? extractedData.answers
    : [];

  const unansweredQuestions = Array.isArray(
    extractedData.unansweredQuestions
  )
    ? extractedData.unansweredQuestions
    : [];

  const unmatchedAnswers = Array.isArray(
    extractedData.unmatchedAnswers
  )
    ? extractedData.unmatchedAnswers
    : [];

  const [selected, setSelected] = useState(
    questions[0]?.number
      ? String(questions[0].number)
      : null
  );

  const [expandedQuestions, setExpandedQuestions] =
    useState(
      questions[0]?.number
        ? [String(questions[0].number)]
        : []
    );

  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [mobileView, setMobileView] =
    useState("questions");

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

    const collectPages = (items) => {
      items.forEach((item) => {
        if (!Array.isArray(item?.regions)) {
          return;
        }

        item.regions.forEach((region) => {
          const page = Number(region?.page);

          if (
            Number.isFinite(page) &&
            page > highestPage
          ) {
            highestPage = page;
          }
        });
      });
    };

    collectPages(answers);
    collectPages(unmatchedAnswers);

    return highestPage;
  }, [answers, unmatchedAnswers]);

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
        answer.regions[0]?.page
      );

      if (
        Number.isFinite(firstPage) &&
        firstPage >= 1 &&
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

    if (answer) {
      const score = answer.score;
      const maxScore = answer.maxScore;

      if (
        score !== null &&
        score !== undefined &&
        maxScore !== null &&
        maxScore !== undefined
      ) {
        return `${score} / ${maxScore}`;
      }

      if (
        score !== null &&
        score !== undefined
      ) {
        return String(score);
      }
    }

    if (isQuestionUnanswered(question)) {
      const maxScore = question.maxScore;

      if (
        maxScore !== null &&
        maxScore !== undefined
      ) {
        return `0 / ${maxScore}`;
      }

      return "0 / ?";
    }

    return "—";
  };

  const getFeedback = (question) => {
    const answer =
      getAnswerForQuestion(question);

    if (answer?.feedback) {
      return answer.feedback;
    }

    if (isQuestionUnanswered(question)) {
      return "No answer was found for this question.";
    }

    return "No AI feedback is available for this question.";
  };

  const getScoreStyle = (question) => {
    const answer =
      getAnswerForQuestion(question);

    if (isQuestionUnanswered(question)) {
      return "bg-[#f1f1f1] text-[#888888]";
    }

    if (!answer) {
      return "bg-[#fff0e9] text-[#ef6847]";
    }

    const score = Number(answer.score);
    const maxScore = Number(answer.maxScore);

    if (
      Number.isFinite(score) &&
      Number.isFinite(maxScore) &&
      maxScore > 0
    ) {
      const percentage =
        (score / maxScore) * 100;

      if (percentage >= 80) {
        return "bg-[#e6f7e4] text-[#3fa43b]";
      }

      if (percentage >= 50) {
        return "bg-[#fff2df] text-[#d98928]";
      }

      return "bg-[#ffe7df] text-[#e85e3f]";
    }

    return "bg-[#e6f7e4] text-[#3fa43b]";
  };

  const getFeedbackScore = (question) => {
    const answer =
      getAnswerForQuestion(question);

    if (!answer) {
      return null;
    }

    if (
      answer.score === null ||
      answer.score === undefined
    ) {
      return null;
    }

    if (
      answer.maxScore === null ||
      answer.maxScore === undefined
    ) {
      return null;
    }

    return `${answer.score} / ${answer.maxScore}`;
  };

  const isPdf =
    answerSheet?.type === "application/pdf";

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
    <main className="h-screen overflow-hidden bg-[#cecece] text-[#303030]">

      <header className="fixed left-[10px] right-[10px] top-[12px] z-50 flex h-[56px] items-center justify-between rounded-[16px] bg-white px-3 lg:left-[86px] lg:right-[13px] lg:top-[12px] lg:px-5">

        <div className="flex items-center gap-3">

          <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#f5f5f5]">
            <ArrowLeft size={20} />
          </button>

          <span className="font-['Bricolage_Grotesque'] text-[20px] font-bold lg:hidden">
            VedaAI
          </span>

          <div className="hidden items-center gap-2 text-[13px] text-[#8a8a8a] lg:flex">
            <FileText size={16} />
            Exams
          </div>

        </div>

        <div className="flex items-center gap-3">

          <button className="hidden h-8 w-8 items-center justify-center rounded-full bg-[#f6f6f6] lg:flex">
            <span className="text-[15px]">
              ?
            </span>
          </button>

          <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#f6f6f6]">
            <Bell size={19} />

            <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-[#ff6242]" />
          </button>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f6f6f6] lg:bg-[#f2ddd5]">
            👨🏻
          </div>

          <span className="hidden text-[12px] lg:block">
            Madhur Rastogi
          </span>

          <ChevronDown
            size={15}
            className="hidden lg:block"
          />

          <Menu
            size={22}
            className="lg:hidden"
          />

        </div>

      </header>

      <div className="flex h-full overflow-hidden pt-[80px]">

        <aside className="fixed left-[10px] top-[80px] hidden h-[calc(100vh-91px)] w-[64px] shrink-0 flex-col items-center rounded-[16px] bg-white py-4 shadow-sm lg:flex">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#303030]">
            <span className="text-lg font-black text-white">
              V
            </span>
          </div>

          <button className="mt-7 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#ff8d36] bg-[#292929] text-white">
            ✦
          </button>

          <div className="mt-8 flex flex-col items-center gap-7 text-[#777]">
            <Grid2X2 size={17} />
            <BookOpen size={17} />
            <ClipboardList size={17} />
            <FileText size={17} />
            <Clock3 size={17} />
          </div>

          <div className="mt-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#f0f0f0]">
            ♕
          </div>

          <span className="mt-4 text-sm text-[#777]">
            »
          </span>

        </aside>

        <div className="flex min-w-0 flex-1 flex-col lg:ml-[74px]">

          <div className="flex justify-center px-[18px] pt-[10px] lg:hidden">

            <div className="flex h-[40px] w-full max-w-[357px] rounded-full bg-[#bcbcbc] p-[3px]">

              <button
                onClick={() =>
                  setMobileView("questions")
                }
                className={`
                  flex-1
                  rounded-full
                  text-[13px]
                  font-semibold
                  transition
                  ${
                    mobileView ===
                    "questions"
                      ? "bg-[#303030] text-white"
                      : "text-[#555555]"
                  }
                `}
              >
                Exam Grading
              </button>

              <button
                onClick={() =>
                  setMobileView("answers")
                }
                className={`
                  flex-1
                  rounded-full
                  text-[13px]
                  font-semibold
                  transition
                  ${
                    mobileView ===
                    "answers"
                      ? "bg-[#303030] text-white"
                      : "text-[#555555]"
                  }
                `}
              >
                Assignment Grading
              </button>

            </div>

          </div>

          <div className="flex min-h-0 flex-1 overflow-hidden pt-[10px] lg:pt-0">

            <section
              className={`
                w-full
                flex-col
                bg-[#cecece]
                lg:flex
                lg:w-[672px]
                lg:shrink-0
                ${
                  mobileView ===
                  "questions"
                    ? "flex"
                    : "hidden"
                }
              `}
            >

              <div className="flex min-h-[64px] items-center justify-between px-[18px] lg:px-5">

                <h2 className="text-[16px] font-semibold">
                  Extracted Questions

                  <span className="font-normal text-[#777777]">
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
                  className="rounded-[9px] bg-white px-4 py-2 text-[11px] font-medium shadow-sm"
                >
                  {allExpanded
                    ? "Collapse All"
                    : "Expand All"}
                </button>

              </div>

              <div className="flex-1 overflow-y-auto px-[18px] pb-8 lg:px-4">

                <div className="space-y-3">

                  {questions.map(
                    (question) => {

                      const id =
                        getQuestionId(
                          question
                        );

                      const isSelected =
                        selected === id;

                      const isExpanded =
                        expandedQuestions.includes(
                          id
                        );

                      const answer =
                        getAnswerForQuestion(
                          question
                        );

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
                            ${
                              isSelected
                                ? "border-2 border-[#ff633f]"
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
                            className="flex w-full items-start gap-3 p-3 text-left"
                          >

                            <div
                              className={`
                                flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white
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

                              <div className="flex items-start gap-3">

                                <p className="flex-1 text-[14px] font-normal leading-[140%] tracking-[-0.3px] text-[#303030] lg:text-[16px]">

                                  {question.sub && (
                                    <span className="mr-2 font-semibold">
                                      {question.sub}
                                    </span>
                                  )}

                                  {question.text}

                                </p>

                                <span
                                  className={`
                                    mt-0.5 shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold
                                    ${getScoreStyle(
                                      question
                                    )}
                                  `}
                                >
                                  {getScore(
                                    question
                                  )}
                                </span>

                              </div>

                            </div>

                            <div className="pt-1 text-[#777777]">
                              {isExpanded ? (
                                <ChevronUp size={17} />
                              ) : (
                                <ChevronDown size={17} />
                              )}
                            </div>

                          </button>

                          {isExpanded && (
                            <div className="mx-3 mb-3 rounded-[10px] bg-[#f1f1f1] p-3">

                              <div className="flex items-center justify-between gap-3">

                                <p className="text-[12px] font-semibold">
                                  AI Feedback
                                </p>

                                <div className="flex items-center gap-2">

                                  {getFeedbackScore(
                                    question
                                  ) && (
                                    <span className="rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-[#555555]">
                                      {
                                        getFeedbackScore(
                                          question
                                        )
                                      }
                                    </span>
                                  )}

                                  {answer?.confidence != null && (
                                    <span className="text-[10px] text-[#888888]">
                                      {Math.round(
                                        Number(
                                          answer.confidence
                                        ) * 100
                                      )}
                                      %
                                    </span>
                                  )}

                                </div>

                              </div>

                              <p className="mt-2 text-[12px] leading-[140%] text-[#555555]">
                                {getFeedback(
                                  question
                                )}
                              </p>

                              

                            </div>
                          )}

                        </div>
                      );
                    }
                  )}

                </div>

              </div>

            </section>

            <section
              className={`
                min-w-0
                flex-1
                flex-col
                bg-[#d7d7d7]
                lg:flex
                ${
                  mobileView ===
                  "answers"
                    ? "flex"
                    : "hidden"
                }
              `}
            >

              <div className="flex h-[58px] shrink-0 items-center justify-between bg-[#292929] px-4 text-white lg:px-5">

                <span className="text-[14px] font-medium">
                  Answer Sheet
                </span>

                <div className="flex items-center gap-2">

                  <button
                    onClick={zoomOut}
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-[#414141]"
                  >
                    <ZoomOut size={14} />
                  </button>

                  <span className="min-w-[35px] text-center text-[11px]">
                    {zoom}%
                  </span>

                  <button
                    onClick={zoomIn}
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-[#414141]"
                  >
                    <ZoomIn size={14} />
                  </button>

                  <div className="ml-2 flex h-8 items-center gap-2 rounded-md bg-[#414141] px-2 lg:ml-3 lg:px-3">

                    <button
                      onClick={
                        previousPage
                      }
                      disabled={
                        currentPage === 1
                      }
                      className="disabled:opacity-40"
                    >
                      <ChevronLeft
                        size={14}
                      />
                    </button>

                    <span className="whitespace-nowrap text-[10px]">
                      Page{" "}
                      {currentPage} of{" "}
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
                      <ChevronRight
                        size={14}
                      />
                    </button>

                  </div>

                </div>

              </div>

              <div className="flex-1 overflow-auto p-4 lg:p-6">

                <div
                  className="mx-auto w-fit"
                  style={{
                    zoom: `${zoom}%`,
                  }}
                >

                  {isImage &&
                    answerSheetUrl && (
                      <div className="relative w-[calc(100vw-36px)] max-w-[720px] bg-white shadow-lg lg:w-[720px]">

                        <img
                          ref={
                            answerImageRef
                          }
                          src={
                            answerSheetUrl
                          }
                          alt="Student answer sheet"
                          className="block h-auto w-full max-w-none"
                        />

                        {selectedRegions.map(
                          (
                            region,
                            index
                          ) => {

                            const regionStyle =
                              getRegionStyle(
                                region.bbox
                              );

                            if (
                              !regionStyle
                            ) {
                              return null;
                            }

                            return (
                              <div
                                key={`${selected}-${currentPage}-${index}`}
                                className="pointer-events-none absolute rounded-[8px] border-[3px] border-[#65bd55] bg-[#7ddc6e]/20 shadow-[0_0_0_2px_rgba(255,255,255,0.7)]"
                                style={
                                  regionStyle
                                }
                              >

                                <span className="absolute -left-[3px] -top-[27px] rounded-t-[6px] bg-[#65bd55] px-3 py-1 text-[10px] font-semibold whitespace-nowrap text-white">
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
                          src={
                            answerSheetUrl
                          }
                          title="Student answer sheet"
                          className="h-[900px] w-[calc(100vw-36px)] max-w-[720px] border-0 bg-white shadow-lg lg:w-[720px]"
                        />

                        {selectedAnswer &&
                          selectedRegions.length >
                            0 && (
                            <div className="mt-3 rounded-lg bg-white px-4 py-3 text-[11px] text-[#777777] shadow-sm">
                              Answer detected on
                              page{" "}
                              {currentPage}.
                            </div>
                          )}

                      </div>
                    )}

                  {!answerSheetUrl && (
                    <div className="flex h-[600px] w-[calc(100vw-36px)] max-w-[600px] items-center justify-center bg-white text-center text-sm text-gray-500 shadow-lg">
                      Answer sheet preview
                      unavailable.
                    </div>
                  )}

                </div>

              </div>

            </section>

          </div>

        </div>

      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex h-4 items-center justify-center lg:hidden">
        <div className="h-0 w-[128px] border-t-[5px] border-[rgba(48,48,48,0.5)]" />
      </div>

    </main>
  );
}