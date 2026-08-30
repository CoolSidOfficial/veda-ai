"use client";

import { useState } from "react";

import UploadScreen from "./components/UploadScreen";
import ProcessingScreen from "./components/ProcessingScreen";
import QuestionAnswerScreen from "./components/QuestionAnswerScreen";

export default function Page() {
  const [screen, setScreen] = useState("upload");
  const [files, setFiles] = useState(null);
  const [results, setResults] = useState(null);

  const handleStartMapping = (uploadedFiles) => {
    setFiles(uploadedFiles);
    setScreen("processing");
  };

  const handleProcessingComplete = (data) => {
    setResults(data);
    setScreen("results");
  };

  return (
    <>
      {screen === "upload" && (
        <UploadScreen
          onStartMapping={handleStartMapping}
        />
      )}

      {screen === "processing" && (
        <ProcessingScreen
          files={files}
          onComplete={handleProcessingComplete}
        />
      )}

      {screen === "results" && (
        <QuestionAnswerScreen
          results={results}
        />
      )}
    </>
  );
}