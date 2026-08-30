"use client";

import { useState } from "react";

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


const QUESTIONS = [
  {
    id: "1",
    number: "1",
    text: "Which blood vessel carries blood away from the heart?",
    score: "2 / 2",
    correct: true,
  },

  {
    id: "2",
    number: "2",
    text: "Which of the following organelles is primarily involved in photosynthesis?",
    score: "2 / 2",
    correct: true,
    feedback:
      "Excellent work! You correctly identified the chloroplast as the organelle responsible for photosynthesis. Keep it up!",
  },

  {
    id: "3",
    number: "3",
    text: "Explain the role of chloroplasts in photosynthesis, naming the main pigments involved and briefly outlining the two major stages of the process.",
    score: "2 / 2",
    correct: true,
  },

  {
    id: "4",
    number: "4",
    text: "Describe the flow of blood through the human heart starting from the right atrium and ending at the aorta; include the names of valves crossed.",
    score: "0 / 2",
    correct: false,
  },

  {
    id: "5",
    number: "5",
    text: "Draw a labelled diagram of an alveolus showing capillaries and air space (label alveolar sac, capillary, and direction of gas exchange).",
    score: "2 / 2",
    correct: true,
  },

  {
    id: "6",
    number: "6",
    text: "Draw a neat labelled diagram of the human digestive system (stomach, small intestine, large intestine, liver, pancreas) and label the site where most absorption occurs.",
    score: "4 / 5",
    correct: true,
  },

  {
    id: "7",
    number: "7",
    text: "Draw and label a nephron (Bowman's capsule, glomerulus, proximal tubule, loop of Henle, distal tubule, collecting duct).",
    score: "5 / 5",
    correct: true,
  },

  {
    id: "8",
    number: "8",
    text: "Explain the structural differences between palisade mesophyll and spongy mesophyll and state how each structure aids its function in the leaf.",
    score: "3 / 5",
    correct: false,
  },

  {
    id: "9",
    number: "9",
    text: "Describe the process of transpiration in plants in two to three sentences and name two environmental factors that increase its rate.",
    score: "5 / 5",
    correct: true,
  },

  {
    id: "10",
    number: "10",
    text: "Explain how the structure of xylem vessels facilitates water transport in plants (mention one structural feature and its role).",
    score: "4 / 5",
    correct: true,
  },

  {
    id: "11a",
    number: "11",
    sub: "a.",
    text: "A diagram shows two potted plants — Plant A in bright light with broad green leaves, Plant B kept in dim light with pale, elongated leaves.",
    score: "2 / 2",
    correct: true,
  },

  {
    id: "11b",
    number: "11",
    sub: "b.",
    text: "Suggest one practical measure to help Plant B recover.",
    score: "1 / 3",
    correct: false,
  },

  {
    id: "12",
    number: "12",
    text: "A resting person has tidal volume (air per breath) of 0.5 L and breathes 12 times per minute.",
    score: "4 / 5",
    correct: true,
  },

  {
    id: "13",
    number: "13",
    text: "If dead space is 0.15 L per breath, calculate the alveolar ventilation per minute. Show working.",
    score: "4 / 5",
    correct: true,
  },
];


export default function QuestionAnswerScreen() {

  // Currently selected question
  const [selected, setSelected] = useState("2");

  // Questions that are currently expanded
  const [expandedQuestions, setExpandedQuestions] = useState(["2"]);


  /*
   * ---------------------------------------------------------
   * TOGGLE INDIVIDUAL QUESTION
   * ---------------------------------------------------------
   */
  const toggleQuestion = (id) => {

    setSelected(id);

    setExpandedQuestions((previous) => {

      if (previous.includes(id)) {

        return previous.filter(
          (questionId) => questionId !== id
        );

      }

      return [...previous, id];

    });

  };


  /*
   * ---------------------------------------------------------
   * EXPAND ALL
   * ---------------------------------------------------------
   */
  const expandAll = () => {

    setExpandedQuestions(
      QUESTIONS.map((question) => question.id)
    );

  };


  /*
   * ---------------------------------------------------------
   * COLLAPSE ALL
   * ---------------------------------------------------------
   */
  const collapseAll = () => {

    setExpandedQuestions([]);

  };


  /*
   * ---------------------------------------------------------
   * CHECK WHETHER ALL ARE EXPANDED
   * ---------------------------------------------------------
   */
  const allExpanded =
    expandedQuestions.length === QUESTIONS.length;


  return (

    <main className="h-screen overflow-hidden bg-[#e8e8e8] font-bricolage text-[#303030]">


      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <header className="flex h-[64px] items-center justify-between border-b border-[#e5e5e5] bg-white px-5">


        {/* LEFT HEADER */}
        <div className="flex items-center gap-4">

          <button
            className="
              flex h-9 w-9 items-center justify-center
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


        {/* RIGHT HEADER */}
        <div className="flex items-center gap-5">


          {/* Help */}
          <button className="hidden h-7 w-7 items-center justify-center sm:flex">
            <span className="text-[15px]">
              ?
            </span>
          </button>


          {/* Notification */}
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


          {/* Profile */}
          <div className="flex items-center gap-2">

            <div
              className="
                flex h-8 w-8
                items-center justify-center
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


      {/* =====================================================
          WORKSPACE
      ===================================================== */}

      <div className="flex h-[calc(100vh-64px)] overflow-hidden">


        {/* ===================================================
            LEFT MINI SIDEBAR
        =================================================== */}

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


          {/* Logo */}

          <div
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-lg
              bg-[#303030]
            "
          >

            <span className="text-lg font-black text-white">
              V
            </span>

          </div>


          {/* AI */}

          <button
            className="
              mt-7
              flex h-9 w-9
              items-center justify-center
              rounded-full
              border-2
              border-[#ff8d36]
              bg-[#292929]
              text-white
            "
          >
            <span className="text-sm">
              ✦
            </span>
          </button>


          {/* Navigation */}

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


          {/* Bottom */}

          <div className="mt-auto">

            <div
              className="
                flex h-9 w-9
                items-center justify-center
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


        {/* ===================================================
            QUESTION PANEL
        =================================================== */}

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


          {/* =================================================
              QUESTION PANEL HEADER
          ================================================= */}

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


            {/* Expand / Collapse */}

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


          {/* =================================================
              QUESTIONS
          ================================================= */}

          <div
            className="
              flex-1
              overflow-y-auto
              px-4
              pb-8
            "
          >

            <div className="space-y-3">


              {QUESTIONS.map((question) => {

                const isSelected =
                  selected === question.id;

                const isExpanded =
                  expandedQuestions.includes(
                    question.id
                  );


                return (

                  <div
                    key={question.id}
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


                    {/* =======================================
                        QUESTION HEADER
                    ======================================= */}

                    <button
                      onClick={() =>
                        toggleQuestion(question.id)
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


                      {/* Question Number */}

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


                      {/* Question Content */}

                      <div className="min-w-0 flex-1">


                        <div className="flex items-start gap-4">


                          {/* Question text */}

                          <p
                            className="
                              flex-1
                              font-bricolage
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


                          {/* Score */}

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
                                question.correct
                                  ? "bg-[#e6f7e4] text-[#3fa43b]"
                                  : "bg-[#fff0e9] text-[#ef6847]"
                              }
                            `}
                          >

                            {question.score}

                          </span>

                        </div>

                      </div>


                      {/* Arrow */}

                      <div className="pt-1 text-[#777]">

                        {isExpanded ? (
                          <ChevronUp size={17} />
                        ) : (
                          <ChevronDown size={17} />
                        )}

                      </div>

                    </button>


                    {/* =======================================
                        AI FEEDBACK
                    ======================================= */}

                    {isExpanded &&
                      question.feedback && (

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
                            AI Feedback
                          </p>

                          <p
                            className="
                              mt-2
                              text-[12px]
                              leading-[140%]
                              tracking-[-0.2px]
                              text-[#555]
                            "
                          >
                            {question.feedback}
                          </p>

                        </div>

                      )}

                  </div>

                );

              })}


            </div>

          </div>

        </section>


        {/* ===================================================
            ANSWER SHEET
        =================================================== */}

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


          {/* =================================================
              ANSWER TOOLBAR
          ================================================= */}

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


              {/* Zoom Out */}

              <button
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-md
                  bg-[#414141]
                  transition
                  hover:bg-[#4b4b4b]
                "
              >
                <ZoomOut size={14} />
              </button>


              {/* Zoom */}

              <span className="px-1 text-[11px]">
                100%
              </span>


              {/* Zoom In */}

              <button
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-md
                  bg-[#414141]
                  transition
                  hover:bg-[#4b4b4b]
                "
              >
                <ZoomIn size={14} />
              </button>


              {/* Page navigation */}

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

                <ChevronLeft size={13} />

                <span className="text-[10px]">
                  Page 1 of 4
                </span>

                <ChevronRight size={13} />

              </div>

            </div>

          </div>


          {/* =================================================
              ANSWER DOCUMENT
          ================================================= */}

          <div
            className="
              flex-1
              overflow-auto
              p-6
            "
          >

            <div
              className="
                relative
                mx-auto
                min-h-[1100px]
                w-[720px]
                max-w-full
                overflow-hidden
                bg-[#fffdf5]
                shadow-lg
              "
            >


              {/* Notebook lines */}

              <div
                className="
                  absolute
                  inset-0
                  opacity-50
                "
                style={{
                  backgroundImage:
                    "linear-gradient(#cfd8e5 1px, transparent 1px)",
                  backgroundSize:
                    "100% 30px",
                }}
              />


              {/* Red margin */}

              <div
                className="
                  absolute
                  bottom-0
                  left-[72px]
                  top-0
                  w-px
                  bg-[#e3aaaa]
                "
              />


              {/* =================================================
                  MOCK HANDWRITING
              ================================================= */}

              <div
                className="
                  relative
                  px-[95px]
                  pt-10
                  font-mono
                  text-[15px]
                  leading-[1.9]
                  text-[#40578c]
                "
              >

                <p>
                  Q1. Photosynthesis is the process used by
                </p>

                <p>
                  green plants and some other organisms
                </p>

                <p>
                  to convert light energy into chemical
                </p>

                <p>
                  energy.
                </p>


                {/* Equation */}

                <div
                  className="
                    my-7
                    border
                    border-[#40578c]
                    px-5
                    py-3
                    text-center
                    text-[13px]
                  "
                >

                  6CO₂ + 6H₂O

                  <span className="mx-8">
                    →
                  </span>

                  C₆H₁₂O₆ + 6O₂

                </div>


                <div className="py-4 text-center text-3xl">
                  ☀
                </div>


                <div className="flex justify-center gap-14 text-[13px]">

                  <span>
                    Carbon dioxide
                  </span>

                  <span>
                    🌱
                  </span>

                  <span>
                    Oxygen
                  </span>

                </div>


                <p className="mt-7">
                  Q2. The process mainly occurs in the
                </p>

                <p>
                  chloroplast of the plant cell. It has
                </p>

                <p>
                  two main stages:
                </p>

                <p>
                  1. Light reaction - Captures light energy.
                </p>

                <p>
                  2. Dark reaction - Uses energy to
                </p>

                <p>
                  make glucose.
                </p>

              </div>


              {/* =================================================
                  GREEN HIGHLIGHT
              ================================================= */}

              <div
                className="
                  absolute
                  left-[78px]
                  right-[18px]
                  top-[355px]
                  h-[180px]
                  rounded-[9px]
                  border-2
                  border-[#65bd55]
                  bg-[#7ddc6e]/10
                "
              >

                <span
                  className="
                    absolute
                    -left-[2px]
                    -top-[24px]
                    rounded-t-[5px]
                    bg-[#65bd55]
                    px-3
                    py-1
                    text-[10px]
                    font-semibold
                    text-white
                  "
                >
                  Q2
                </span>

              </div>


              {/* =================================================
                  LOWER MOCK ANSWER
              ================================================= */}

              <div
                className="
                  relative
                  mt-[100px]
                  px-[95px]
                  font-mono
                  text-[15px]
                  leading-[1.9]
                  text-[#40578c]
                "
              >

                <p>
                  Q1. Photosynthesis is the process used by
                </p>

                <p>
                  green plants and some other organisms
                </p>

                <p>
                  to convert light energy into chemical
                </p>

                <p>
                  energy.
                </p>

              </div>


              {/* Lower highlight */}

              <div
                className="
                  absolute
                  left-[78px]
                  right-[18px]
                  top-[850px]
                  h-[180px]
                  rounded-[9px]
                  border-2
                  border-[#65bd55]
                  bg-[#7ddc6e]/10
                "
              >

                <span
                  className="
                    absolute
                    -left-[2px]
                    -top-[24px]
                    rounded-t-[5px]
                    bg-[#65bd55]
                    px-3
                    py-1
                    text-[10px]
                    font-semibold
                    text-white
                  "
                >
                  Q2
                </span>

              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}