"use client";

import {
  ArrowLeft,
  Bell,
  CircleHelp,
  ChevronDown,
  FileText,
} from "lucide-react";

export default function ProcessingScreen() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] text-[#292929]">
      <div className="flex min-h-screen">

        {/* ================= SIDEBAR ================= */}
        <aside className="hidden w-[68px] shrink-0 bg-white lg:flex lg:flex-col lg:items-center lg:py-5">

          {/* Logo */}
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#303030]">
            <span className="text-sm font-black text-white">
              V
            </span>
          </div>

          {/* AI Button */}
          <button className="mt-7 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#ff6341] bg-[#292929] text-white">
            <span className="text-sm">✦</span>
          </button>

          {/* Navigation */}
          <div className="mt-7 flex flex-col items-center gap-5 text-[#888]">

            <div className="text-[14px]">
              ▦
            </div>

            <div className="text-[14px]">
              ◩
            </div>

            <div className="text-[14px]">
              ▤
            </div>

            <div className="text-[14px]">
              □
            </div>

            <div className="text-[14px]">
              ◷
            </div>

          </div>

          {/* School Logo */}
          <div className="mt-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0]">
            <span className="text-[13px]">
              ♕
            </span>
          </div>

          {/* Collapse */}
          <div className="mt-5 text-xs text-gray-500">
            »
          </div>

        </aside>


        {/* ================= MAIN AREA ================= */}
        <div className="flex min-w-0 flex-1 flex-col">

          {/* ================= HEADER ================= */}
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


          {/* ================= PROCESSING AREA ================= */}
          <section className="flex flex-1 items-center justify-center p-4">

            <div className="flex h-full min-h-[400px] w-full items-center justify-center rounded-[16px] bg-white">

              <div className="flex flex-col items-center text-center">

                {/* ================= AI SPARKLE ================= */}
                <div className="relative mb-5 h-[82px] w-[82px]">

                  {/* Large sparkle */}
                  <div className="absolute left-[28px] top-0">

                    <div className="relative h-[42px] w-[42px]">

                      <div className="absolute left-1/2 top-0 h-full w-[13px] -translate-x-1/2 rounded-full bg-[#ff6847]" />

                      <div className="absolute left-0 top-1/2 h-[13px] w-full -translate-y-1/2 rounded-full bg-[#ff6847]" />

                      <div className="absolute left-1/2 top-1/2 h-[25px] w-[25px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[8px] bg-[#ff6847]" />

                    </div>

                  </div>


                  {/* Small sparkle */}
                  <div className="absolute left-[8px] top-[30px]">

                    <div className="relative h-[27px] w-[27px]">

                      <div className="absolute left-1/2 top-0 h-full w-[8px] -translate-x-1/2 rounded-full bg-[#ff6847]" />

                      <div className="absolute left-0 top-1/2 h-[8px] w-full -translate-y-1/2 rounded-full bg-[#ff6847]" />

                      <div className="absolute left-1/2 top-1/2 h-[16px] w-[16px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[5px] bg-[#ff6847]" />

                    </div>

                  </div>


                  {/* Tiny sparkle */}
                  <div className="absolute bottom-[8px] right-[8px]">

                    <div className="relative h-[16px] w-[16px]">

                      <div className="absolute left-1/2 top-0 h-full w-[5px] -translate-x-1/2 rounded-full bg-[#ff6847]" />

                      <div className="absolute left-0 top-1/2 h-[5px] w-full -translate-y-1/2 rounded-full bg-[#ff6847]" />

                      <div className="absolute left-1/2 top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[3px] bg-[#ff6847]" />

                    </div>

                  </div>


                  {/* Small dot */}
                  <span className="absolute left-0 top-[23px] h-[7px] w-[7px] rounded-full bg-[#ff9279]" />

                </div>


                {/* ================= TEXT ================= */}
                <h1 className="text-[16px] font-bold tracking-[-0.3px] sm:text-[17px]">
                  Extracting...
                </h1>

                <p className="mt-1 text-[10px] text-[#888] sm:text-[11px]">
                  This may take a while
                </p>

              </div>

            </div>

          </section>

        </div>

      </div>
    </main>
  );
}