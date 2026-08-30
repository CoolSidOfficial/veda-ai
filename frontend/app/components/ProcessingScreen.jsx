"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bell,
  CircleHelp,
  ChevronDown,
  FileText,
} from "lucide-react";

export default function ProcessingScreen({ files, onComplete }) {
  const [status, setStatus] = useState("Extracting...");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!files?.questionPaper || !files?.answerSheet) {
      setError("Both files are required.");
      return;
    }

    let cancelled = false;

    const processFiles = async () => {
      try {
        setError("");
        setStatus("Extracting...");

        const formData = new FormData();

        formData.append(
          "questionPaper",
          files.questionPaper
        );

        formData.append(
          "answerSheet",
          files.answerSheet
        );

        const response = await fetch("/api/extract", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          let errorMessage =
            "Failed to process the files.";

          try {
            const errorData = await response.json();

            errorMessage =
              errorData?.error || errorMessage;
          } catch {}

          throw new Error(errorMessage);
        }

        const data = await response.json();

        console.log(
          "Gemini extraction result:",
          data
        );

        if (cancelled) return;

        setStatus("Mapping answers...");

        await new Promise((resolve) =>
          setTimeout(resolve, 500)
        );

        if (cancelled) return;

        setStatus("Preparing results...");

        await new Promise((resolve) =>
          setTimeout(resolve, 500)
        );

        if (cancelled) return;

        onComplete(data);
      } catch (error) {
        if (cancelled) return;

        console.error(
          "Assessment processing failed:",
          error
        );

        setError(
          error?.message ||
            "Something went wrong while processing."
        );

        setStatus("Processing failed.");
      }
    };

    processFiles();

    return () => {
      cancelled = true;
    };
  }, [files, onComplete]);

  return (
    <main className="min-h-screen bg-[#eeeeee] text-[#303030]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[68px] shrink-0 bg-white lg:flex lg:flex-col lg:items-center lg:py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#303030]">
            <span className="text-sm font-black text-white">
              V
            </span>
          </div>

          <button className="mt-7 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#ff6341] bg-[#292929] text-white">
            <span className="text-sm">✦</span>
          </button>

          <div className="mt-7 flex flex-col items-center gap-5 text-[#888888]">
            <div className="text-[14px]">▦</div>
            <div className="text-[14px]">◩</div>
            <div className="text-[14px]">▤</div>
            <div className="text-[14px]">□</div>
            <div className="text-[14px]">◷</div>
          </div>

          <div className="mt-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0]">
            <span className="text-[13px]">♕</span>
          </div>

          <div className="mt-5 text-xs text-gray-500">
            »
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[61px] shrink-0 items-center justify-between border-b border-[#e5e5e5] bg-white px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100">
                <ArrowLeft size={18} />
              </button>

              <div className="flex items-center gap-2 text-[11px] text-gray-400">
                <FileText size={13} />
                <span>Exams</span>
              </div>
            </div>

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

          <section className="hidden flex-1 items-center justify-center bg-[linear-gradient(180deg,#eeeeee_0%,#dadada_100%)] p-4 lg:flex">
            <div className="flex h-full min-h-[400px] w-full items-center justify-center rounded-[24px] bg-white">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-5 h-[82px] w-[82px]">
                  <div className="absolute left-[28px] top-0">
                    <div className="relative h-[42px] w-[42px]">
                      <div className="absolute left-1/2 top-0 h-full w-[13px] -translate-x-1/2 rounded-full bg-[#ff6847]" />
                      <div className="absolute left-0 top-1/2 h-[13px] w-full -translate-y-1/2 rounded-full bg-[#ff6847]" />
                      <div className="absolute left-1/2 top-1/2 h-[25px] w-[25px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[8px] bg-[#ff6847]" />
                    </div>
                  </div>

                  <div className="absolute left-[8px] top-[30px]">
                    <div className="relative h-[27px] w-[27px]">
                      <div className="absolute left-1/2 top-0 h-full w-[8px] -translate-x-1/2 rounded-full bg-[#ff6847]" />
                      <div className="absolute left-0 top-1/2 h-[8px] w-full -translate-y-1/2 rounded-full bg-[#ff6847]" />
                      <div className="absolute left-1/2 top-1/2 h-[16px] w-[16px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[5px] bg-[#ff6847]" />
                    </div>
                  </div>

                  <div className="absolute bottom-[8px] right-[8px]">
                    <div className="relative h-[16px] w-[16px]">
                      <div className="absolute left-1/2 top-0 h-full w-[5px] -translate-x-1/2 rounded-full bg-[#ff6847]" />
                      <div className="absolute left-0 top-1/2 h-[5px] w-full -translate-y-1/2 rounded-full bg-[#ff6847]" />
                      <div className="absolute left-1/2 top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[3px] bg-[#ff6847]" />
                    </div>
                  </div>

                  <span className="absolute left-0 top-[23px] h-[7px] w-[7px] rounded-full bg-[#ff9279]" />
                </div>

                <h1 className="font-['Bricolage_Grotesque'] text-[30px] font-bold leading-[36px] tracking-[-1.2px]">
                  {status}
                </h1>

                <p className="mt-1 font-['Bricolage_Grotesque'] text-[20px] leading-[36px] tracking-[-1.2px] text-[rgba(70,70,70,0.75)]">
                  {error
                    ? error
                    : "This may take a while"}
                </p>
              </div>
            </div>
          </section>

          <section className="relative flex flex-1 flex-col bg-[linear-gradient(180deg,#eeeeee_0%,#dadada_100%)] lg:hidden">
            <div className="px-[10px] pt-[12px]">
              <div className="flex h-[56px] w-full items-center justify-between rounded-[16px] bg-white px-[12px] pr-[16px]">
                <div className="flex items-center gap-2">
                  <button className="flex h-6 w-6 items-center justify-center">
                    <ArrowLeft size={24} strokeWidth={1.8} />
                  </button>

                  <div className="font-['Bricolage_Grotesque'] text-[20px] font-bold leading-[28px] tracking-[-0.06em] text-[#303030]">
                    VedaAI
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#f6f6f6]">
                    <Bell
                      size={22}
                      strokeWidth={1.8}
                    />

                    <span className="absolute right-[1px] top-[1px] h-2 w-2 rounded-full bg-[#ff5623]" />
                  </div>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f6f6f6] text-sm">
                    👨🏻
                  </div>

                  <button className="flex h-6 w-6 items-center justify-center">
                    <ChevronDown size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-1 items-start justify-center pt-[81px]">
              <div className="flex h-[643px] w-[calc(100%-19px)] max-w-[374px] items-center justify-center rounded-[24px] bg-white">
                <div className="flex w-[177px] flex-col items-center justify-center text-center">
                  <div className="relative mb-[15px] h-[134px] w-[128px]">
                    <div className="absolute right-0 top-0 h-[97px] w-[96px]">
                      <div className="absolute inset-0 rotate-45 rounded-[20px] bg-[#ff5623]" />
                    </div>

                    <div className="absolute bottom-0 left-[12px] h-[72px] w-[72px]">
                      <div className="absolute inset-0 rotate-45 rounded-[18px] bg-[#ff5623]" />
                    </div>

                    <div className="absolute bottom-[22px] right-[9px] h-[28px] w-[28px] rotate-45 rounded-[8px] bg-[#ff5623] opacity-50" />

                    <div className="absolute left-[17px] top-[47px] h-[13px] w-[13px] rotate-45 rounded-[4px] bg-[#ff5623] opacity-80" />

                    <div className="absolute left-0 top-[47px] h-[8px] w-[8px] rounded-full bg-[#ff5623]" />
                  </div>

                  <div className="flex w-[177px] flex-col items-center">
                    <div className="w-[159px] font-['Bricolage_Grotesque'] text-[30px] font-bold leading-[36px] tracking-[-1.2px] text-[#303030]">
                      {status}
                    </div>

                    <div className="mt-0 w-[177px] font-['Bricolage_Grotesque'] text-[20px] font-normal leading-[36px] tracking-[-1.2px] text-[rgba(70,70,70,0.75)]">
                      {error
                        ? error
                        : "This may take a while"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex h-[16px] w-full items-center justify-center pb-[8px]">
              <div className="h-0 w-[128px] border-t-[5px] border-[rgba(48,48,48,0.5)]" />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}