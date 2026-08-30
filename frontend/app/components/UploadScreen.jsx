"use client";

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
} from "lucide-react";

export default function UploadScreen({ onStartMapping }) {
  return (
    <main className="min-h-screen bg-[#f5f5f5] text-[#292929]">

      {/* ================= DESKTOP LAYOUT ================= */}
      <div className="flex min-h-screen">

        {/* ================= SIDEBAR ================= */}
        <aside className="hidden w-[220px] shrink-0 bg-white px-5 py-5 lg:flex lg:flex-col">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#303030]">
              <span className="text-sm font-black text-white">V</span>
            </div>

            <span className="text-[17px] font-bold">
              VedaAI
            </span>
          </div>

          {/* AI Teacher Toolkit */}
          <button className="mt-8 flex h-[32px] items-center justify-center gap-2 rounded-full border-2 border-[#ff6544] bg-[#292929] text-[10px] font-medium text-white">
            <Sparkles size={12} />
            AI Teacher's Toolkit
          </button>

          {/* Navigation */}
          <nav className="mt-8 space-y-1">

            <button className="flex h-[30px] w-full items-center gap-2 rounded-md px-2 text-[10px] text-[#777]">
              <Home size={13} />
              Home
            </button>

            <button className="flex h-[30px] w-full items-center gap-2 rounded-md px-2 text-[10px] text-[#777]">
              <BookOpen size={13} />
              My Classroom
            </button>

            <button className="flex h-[30px] w-full items-center gap-2 rounded-md px-2 text-[10px] text-[#777]">
              <ClipboardList size={13} />
              Assignments
            </button>

            {/* Active */}
            <button className="flex h-[30px] w-full items-center gap-2 rounded-md bg-[#eeeeee] px-2 text-[10px] font-medium text-[#222]">
              <FileText size={13} />
              Exams
            </button>

            <button className="flex h-[30px] w-full items-center gap-2 rounded-md px-2 text-[10px] text-[#777]">
              <Clock3 size={13} />
              My Library
            </button>

          </nav>

          {/* School */}
          <div className="mt-auto rounded-xl bg-[#f0f0f0] px-3 py-3">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
                <span className="text-lg">♕</span>
              </div>

              <div>
                <p className="text-[10px] font-semibold">
                  Delhi Public School
                </p>

                <p className="mt-0.5 text-[8px] text-gray-500">
                  Bokaro Steel City
                </p>
              </div>

            </div>

          </div>

        </aside>


        {/* ================= RIGHT SIDE ================= */}
        <div className="flex min-w-0 flex-1 flex-col">

          {/* ================= TOP BAR ================= */}
          <header className="flex h-[61px] items-center justify-between border-b border-[#e5e5e5] bg-white px-4 sm:px-6">

            {/* Left */}
            <div className="flex items-center gap-3">

              <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100">
                <ArrowLeft size={18} />
              </button>

              <div className="flex items-center gap-2 text-[11px] text-gray-400">
                <FileText size={13} />
                Exams
              </div>

            </div>

            {/* Right */}
            <div className="hidden items-center gap-4 sm:flex">

              <CircleHelp size={17} />

              <div className="relative">
                <Bell size={17} />

                <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#ff5b3d]" />
              </div>

              <div className="h-5 w-px bg-gray-200" />

              <div className="flex items-center gap-2">

                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f1d9d0]">
                  👨🏻
                </div>

                <span className="text-[10px]">
                  Madhur Rastogi
                </span>

                <ChevronDown size={13} />

              </div>

            </div>

          </header>


          {/* ================= MAIN CONTENT ================= */}
          <section className="flex flex-1 justify-center overflow-auto">

            <div className="w-full max-w-[760px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">


              {/* ================= TITLE ================= */}
              <div className="text-center">

                <h1 className="text-[23px] font-bold tracking-[-0.7px] sm:text-[25px]">

                  Upload{" "}

                  <span className="rounded-[5px] bg-[#fff0eb] px-1.5 text-[#ff5735]">
                    Question Paper &amp; Answer Sheets
                  </span>

                </h1>

                <p className="mt-2 text-[10px] text-[#555] sm:text-[11px]">
                  Upload both files to get started
                </p>

              </div>


              {/* ================= TEACHER IMAGE ================= */}
              <div className="relative mx-auto mt-5 flex h-[78px] w-[78px] items-center justify-center rounded-full bg-[#f7ddd5]">

                <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full border-[7px] border-[#ffd0c3] bg-[#f8eee9]">

                  <div className="flex h-[40px] w-[32px] items-center justify-center rounded-[10px] bg-white text-[21px] shadow-sm">
                    👩🏻‍🏫
                  </div>

                </div>

                {/* dots */}
                <span className="absolute right-[2px] top-[9px] h-2 w-2 rounded-full border border-[#ff6341] bg-white" />

                <span className="absolute left-[7px] top-[17px] h-2 w-2 rounded-full border border-[#ff6341] bg-white" />

                <span className="absolute right-[7px] bottom-[12px] h-2 w-2 rounded-full border border-[#ff6341] bg-white" />

                <span className="absolute left-[18px] bottom-[2px] h-2 w-2 rounded-full border border-[#ff6341] bg-white" />

              </div>


              {/* ================= UPLOAD BOXES ================= */}
              <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">


                {/* QUESTION PAPER */}
                <label className="flex h-[108px] cursor-pointer flex-col items-center justify-center rounded-[12px] border border-dashed border-[#d7d7d7] bg-white transition hover:border-[#ff6341]">

                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg"
                  />

                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#f4f4f4]">
                    <Upload size={14} />
                  </div>

                  <p className="mt-2 text-[10px] font-medium">
                    Upload{" "}
                    <span className="text-[#ff5735]">
                      Question Paper
                    </span>
                  </p>

                  <p className="mt-1 text-[7px] text-gray-400">
                    Max 10MB
                  </p>

                </label>


                {/* ANSWER SHEET */}
                <label className="flex h-[108px] cursor-pointer flex-col items-center justify-center rounded-[12px] border border-dashed border-[#d7d7d7] bg-white transition hover:border-[#ff6341]">

                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg"
                  />

                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#f4f4f4]">
                    <Upload size={14} />
                  </div>

                  <p className="mt-2 text-[10px] font-medium">
                    Upload{" "}
                    <span className="text-[#ff5735]">
                      Answer Sheet
                    </span>
                  </p>

                  <p className="mt-1 text-[7px] text-gray-400">
                    Max 10MB
                  </p>

                </label>

              </div>

{/* ================= START MAPPING ================= */}
<div className="mt-7 flex justify-center">
  <button
    onClick={onStartMapping}
    className="flex h-[30px] items-center gap-2 rounded-full bg-[#292929] px-4 text-[9px] font-medium text-white transition hover:bg-black"
  >
    Start Mapping
    <span className="text-[13px]">
      →
    </span>
  </button>
</div>

              {/* ================= DESCRIPTION ================= */}
              <p className="mx-auto mt-4 max-w-[280px] text-center text-[8px] leading-3 text-[#888]">
                Once both files are uploaded, you'll able to map answers
                with questions!
              </p>

            </div>

          </section>

        </div>

      </div>

    </main>
  );
}