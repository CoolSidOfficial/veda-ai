"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Bell,
  CircleHelp,
  ChevronDown,
  Upload,
  Sparkles,
  Home,
  BookOpen,
  ClipboardList,
  FileText,
  Clock3,
  Menu,
} from "lucide-react";

export default function UploadScreen({ onStartMapping }) {
  const [questionPaper, setQuestionPaper] = useState(null);
  const [answerSheet, setAnswerSheet] = useState(null);

  const canStart = questionPaper && answerSheet;

  const handleQuestionPaper = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setQuestionPaper(file);
    }
  };

  const handleAnswerSheet = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setAnswerSheet(file);
    }
  };

  const handleStartMapping = () => {
    if (!canStart) return;

    onStartMapping({
      questionPaper,
      answerSheet,
    });
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#EEEEEE_0%,#DADADA_100%)] text-[#292929]">

      <div className="min-h-screen">

        {/* DESKTOP SIDEBAR */}

        <aside className="fixed left-3 top-3 z-20 hidden h-[calc(100vh-24px)] w-[304px] rounded-[16px] bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.12),0_32px_48px_rgba(0,0,0,0.12)] lg:flex lg:flex-col">

          <div className="flex items-center gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#303030]">
              <span className="text-sm font-black text-white">
                V
              </span>
            </div>

            <span className="text-[17px] font-bold">
              VedaAI
            </span>

          </div>

          <button className="mt-8 flex h-[38px] w-full items-center justify-center gap-2 rounded-full border-2 border-[#FF6544] bg-[#292929] text-[11px] font-medium text-white">
            <Sparkles size={14} />
            AI Teacher's Toolkit
          </button>

          <nav className="mt-8 space-y-1">

            <button className="flex h-[40px] w-full items-center gap-3 rounded-md px-3 text-[12px] text-[#777]">
              <Home size={16} />
              Home
            </button>

            <button className="flex h-[40px] w-full items-center gap-3 rounded-md px-3 text-[12px] text-[#777]">
              <BookOpen size={16} />
              My Classroom
            </button>

            <button className="flex h-[40px] w-full items-center gap-3 rounded-md px-3 text-[12px] text-[#777]">
              <ClipboardList size={16} />
              Assignments
            </button>

            <button className="flex h-[40px] w-full items-center gap-3 rounded-md bg-[#EEEEEE] px-3 text-[12px] font-medium text-[#222]">
              <FileText size={16} />
              Exams
            </button>

            <button className="flex h-[40px] w-full items-center gap-3 rounded-md px-3 text-[12px] text-[#777]">
              <Clock3 size={16} />
              My Library
            </button>

          </nav>

          <div className="mt-auto rounded-xl bg-[#F0F0F0] px-4 py-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                <span className="text-lg">
                  ♕
                </span>
              </div>

              <div>
                <p className="text-[11px] font-semibold">
                  Delhi Public School
                </p>

                <p className="mt-0.5 text-[9px] text-gray-500">
                  Bokaro Steel City
                </p>
              </div>

            </div>

          </div>

        </aside>

        {/* MAIN */}

        <div className="min-h-screen lg:ml-[304px]">

          {/* DESKTOP HEADER */}

          <header className="mx-3 mt-3 hidden h-[56px] items-center justify-between rounded-[16px] bg-[rgba(255,255,255,0.75)] px-4 sm:px-6 lg:flex">

            <div className="flex items-center gap-3">

              <button className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100">
                <ArrowLeft size={20} />
              </button>

              <div className="flex items-center gap-2 text-[13px] text-[#A9A9A9]">
                <FileText size={16} />
                Exams
              </div>

            </div>

            <div className="flex items-center gap-4">

              <CircleHelp size={19} />

              <div className="relative">

                <Bell size={19} />

                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#FF5623]" />

              </div>

              <div className="h-5 w-px bg-gray-200" />

              <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F1D9D0]">
                  👨🏻
                </div>

                <span className="text-[12px] font-medium">
                  Madhur Rastogi
                </span>

                <ChevronDown size={15} />

              </div>

            </div>

          </header>

          {/* MOBILE HEADER */}

          <header className="mx-[10px] mt-[105px] flex h-[56px] items-center justify-between rounded-[16px] bg-white px-3 lg:hidden">

            <div className="flex items-center gap-2">

              <button className="flex h-8 w-8 items-center justify-center">
                <ArrowLeft size={24} />
              </button>

              <span className="font-['Bricolage_Grotesque'] text-[20px] font-bold">
                VedaAI
              </span>

            </div>

            <div className="flex items-center gap-3">

              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#F6F6F6]">

                <Bell size={21} />

                <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-[#FF5623]" />

              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F6F6F6]">
                👨🏻
              </div>

              <Menu size={23} />

            </div>

          </header>

          {/* CONTENT */}

          <section className="flex justify-center px-[10px] pb-8 pt-[24px] lg:min-h-[calc(100vh-80px)] lg:px-0 lg:pb-0">

            <div className="flex w-full max-w-[789px] flex-col items-center">

              {/* TITLE */}

              <div className="flex w-full flex-col items-center gap-2 text-center">

                <h1 className="font-['Bricolage_Grotesque'] text-[24px] font-bold leading-[120%] tracking-[-0.04em] lg:text-[40px]">

                  Upload{" "}

                  <span className="rounded-[6px] bg-[#FFF0EB] px-2 text-[#FF5735]">
                    Question Paper &amp; Answer Sheets
                  </span>

                </h1>

                <p className="font-['Bricolage_Grotesque'] text-[14px] text-[#5E5E5E] lg:text-[20px]">
                  Upload both files to get started
                </p>

              </div>

              {/* TEACHER */}

              <div className="relative mt-5 flex h-[110px] w-[110px] items-center justify-center lg:mt-6 lg:h-[137px] lg:w-[138px]">

                <div className="absolute inset-0 rounded-full bg-[rgba(255,86,35,0.10)]" />

                <div className="absolute inset-[12px] rounded-full bg-[rgba(255,86,35,0.26)]" />

                <div className="relative flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full bg-white lg:h-[88px] lg:w-[88px]">

                  <span className="text-[42px] lg:text-[50px]">
                    👩🏻‍🏫
                  </span>

                </div>

                <span className="absolute left-0 top-[26px] h-[10px] w-[10px] rounded-full bg-[#FB975D]" />

                <span className="absolute right-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[#FB975D]" />

                <span className="absolute bottom-[26px] right-0 h-[10px] w-[10px] rounded-full bg-[#FC5E24]" />

                <span className="absolute bottom-0 left-[22px] h-[10px] w-[10px] rounded-full bg-[#FC5E24]" />

              </div>

              {/* UPLOAD CONTAINER */}

              <div className="mt-3 flex w-full flex-col items-center rounded-[24px] bg-[rgba(255,255,255,0.5)] p-3 lg:mt-6 lg:flex-row lg:gap-3">

                {/* QUESTION PAPER */}

                <label className="flex h-[127px] w-full cursor-pointer items-center justify-center rounded-[20px] border-[1.5px] border-dashed border-[#CECECE] bg-white px-[10px] py-4 transition hover:border-[#FF6341] lg:h-[181px] lg:w-[374.5px]">

                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg,.webp"
                    onChange={handleQuestionPaper}
                  />

                  <div className="flex flex-col items-center gap-2">

                    <div className="flex h-10 w-10 items-center justify-center rounded-[7px] bg-[#F3F3F3]">
                      <Upload size={27} />
                    </div>

                    <div className="flex flex-col items-center gap-0.5">

                      <p className="font-['Bricolage_Grotesque'] text-[18px] font-bold leading-[140%] tracking-[-0.04em]">

                        Upload{" "}

                        <span className="text-[#FF5735]">
                          Question Paper
                        </span>

                      </p>

                      <p className="font-['Bricolage_Grotesque'] text-[12px] leading-[140%] text-[rgba(94,94,94,0.55)]">
                        {questionPaper
                          ? questionPaper.name
                          : "Max 10MB"}
                      </p>

                    </div>

                  </div>

                </label>

                {/* ANSWER SHEET */}

                <label className="mt-3 flex h-[127px] w-full cursor-pointer items-center justify-center rounded-[20px] border-[1.5px] border-dashed border-[#CECECE] bg-white px-[10px] py-4 transition hover:border-[#FF6341] lg:mt-0 lg:h-[181px] lg:w-[374.5px]">

                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg,.webp"
                    onChange={handleAnswerSheet}
                  />

                  <div className="flex flex-col items-center gap-2">

                    <div className="flex h-10 w-10 items-center justify-center rounded-[7px] bg-[#F3F3F3]">
                      <Upload size={27} />
                    </div>

                    <div className="flex flex-col items-center gap-0.5">

                      <p className="font-['Bricolage_Grotesque'] text-[18px] font-bold leading-[140%] tracking-[-0.04em]">

                        Upload{" "}

                        <span className="text-[#FF5735]">
                          Answer Sheet
                        </span>

                      </p>

                      <p className="font-['Bricolage_Grotesque'] text-[12px] leading-[140%] text-[rgba(94,94,94,0.55)]">
                        {answerSheet
                          ? answerSheet.name
                          : "Max 10MB"}
                      </p>

                    </div>

                  </div>

                </label>

              </div>

              {/* START MAPPING */}

              <div className="mt-5 flex w-full flex-col items-center gap-3">

                <button
                  onClick={handleStartMapping}
                  disabled={!canStart}
                  className={`flex h-[44px] w-[161px] items-center justify-center gap-2 rounded-full px-5 font-['Bricolage_Grotesque'] text-[14px] font-medium transition ${
                    canStart
                      ? "bg-[#303030] text-white hover:bg-black"
                      : "bg-[#303030] text-white opacity-25"
                  }`}
                >
                  Start Mapping

                  <span className="text-[20px] leading-none">
                    →
                  </span>

                </button>

                <p className="max-w-[400px] text-center font-['Bricolage_Grotesque'] text-[14px] leading-[22px] tracking-[-0.04em] text-[rgba(94,94,94,0.8)]">
                  Once both files are uploaded, you'll able to map answers with questions!
                </p>

              </div>

            </div>

          </section>

          {/* MOBILE HOME INDICATOR */}

          <div className="fixed bottom-0 left-0 right-0 flex h-4 items-center justify-center lg:hidden">
            <div className="h-0 w-[128px] border-t-[5px] border-[#303030]/50" />
          </div>

        </div>

      </div>

    </main>
  );
}