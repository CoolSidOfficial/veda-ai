"use client";

import { useState } from "react";
import UploadScreen from "./components/UploadScreen";
import ProcessingScreen from "./components/ProcessingScreen";

export default function Page() {
  const [screen, setScreen] = useState("upload");

  return (
    <>
      {screen === "upload" && (
        <UploadScreen
          onStartMapping={() => setScreen("processing")}
        />
      )}

      {screen === "processing" && <ProcessingScreen />}
    </>
  );
}