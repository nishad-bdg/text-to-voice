"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Keyboard } from "lucide-react"
import useTextToVoice from "./hooks/useTextToVoice"
import LanguageCard from "@/app/components/LanguageCard"
import Recorder from "@/app/components/Recorder"
import React, { JSX } from "react"

const HomeUI: React.FC = (): JSX.Element => {
  const {
    selectedLanguage,
    setSelectedLanguage,
    isRecording,
    handleAnswerChange,
    toggleRecording,
    dataInEnglish,
    languages,
    text,
    setText,
    handleSpeak,
  } = useTextToVoice()

  console.info("text", text)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Language Selection */}
        <LanguageCard
          languages={languages}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />

        {/* Recording Controls */}
        <Recorder isRecording={isRecording} toggleRecording={toggleRecording} />

        {/* Typing Exercises */}
        <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Keyboard className="w-5 h-5 text-indigo-600" />
              <span>Typing Exercises</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dataInEnglish?.map((exercise) => (
                <div
                  key={exercise.id}
                  className="p-4 rounded-lg border-2 border-gray-200 bg-white hover:border-indigo-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-sm font-semibold">
                      {exercise.id + 1}
                    </div>

                    <div
                      className="flex-1 space-y-3"
                      onClick={() => {
                       handleSpeak()
                      }}
                    >
                      <p className="text-gray-900 font-medium">
                        {exercise.prompt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default HomeUI
