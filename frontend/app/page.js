"use client";

import { useState } from "react";

import UploadScreen from "./components/UploadScreen";
import ProcessingScreen from "./components/ProcessingScreen";
import QuestionAnswerScreen from "./components/QuestionAnswerScreen";

export default function Page() {
  const [screen, setScreen] = useState("upload");

  return (
    <>
      {screen === "upload" && (
        <UploadScreen
          onStartMapping={() => setScreen("processing")}
        />
      )}

      {screen === "processing" && (
        <ProcessingScreen />
      )}

      {screen === "results" && (
        <QuestionAnswerScreen />
      )}
    </>
  );
}