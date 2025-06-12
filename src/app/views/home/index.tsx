"use client"
import useTextToVoice from "./hooks/useTextToVoice"
import LanguageCard from "@/app/components/LanguageCard"
import Recorder from "@/app/components/Recorder"
import React, { JSX } from "react"
import TextCards from "@/app/components/TextCards"
import FloatingLoader from "@/app/components/FloatingLoader"

const HomeUI: React.FC = (): JSX.Element => {
  const {
    selectedLanguage,
    setSelectedLanguage,
    isRecording,
    toggleRecording,
    exercises,
    languages,
    setText,
  } = useTextToVoice()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <LanguageCard
          languages={languages}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
        <Recorder isRecording={isRecording} toggleRecording={toggleRecording} />
        <TextCards data={exercises} setText={setText} />
      </div>
    </div>
  )
}

export default HomeUI
