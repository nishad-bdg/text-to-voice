"use client"
import useTextToVoice from "./hooks/useTextToVoice"
import Recorder from "@/app/components/Recorder"
import React, { JSX } from "react"
import TextCards from "@/app/components/TextCards"
import LanguageCard from "@/app/components/LanguageCard"
import RadioBoxSelector from "@/app/components/RadioBoxSelector"
import CustomInput from "@/app/components/CustomInput"
import { Button } from "@/components/ui/button"
// import FloatingLoader from "@/app/components/FloatingLoader"

const HomeUI: React.FC = (): JSX.Element => {
  const {
    selectedLanguage,
    setSelectedLanguage,
    isRecording,
    toggleRecording,
    exercises,
    languages,
    setText,
    gender,
    setGender,
    setCustomText,
    customText,
    handleAddData,
  } = useTextToVoice()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <LanguageCard
          languages={languages}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
        <RadioBoxSelector
          label="Select Gender"
          name="gender"
          value={gender}
          onChange={setGender}
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />
        <Recorder isRecording={isRecording} toggleRecording={toggleRecording} />
        <div className="flex items-center gap-2">
          <CustomInput
            label="Type here"
            value={customText ?? ""}
            onChange={(value) => setCustomText(value)}
          />
          <Button
            className="bg-blue-500 hover:bg-blue-400 text-white mt-5 cursor-pointer"
            onClick={() => handleAddData(customText)}
          >
            Add
          </Button>

          <Button
            variant="outline"
            className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 mt-5 flex items-center space-x-2 cursor-pointer"
            onClick={() => setText(customText)}
          >
            <span>Speak</span>
          </Button>
        </div>
        <TextCards data={exercises} setText={setText} />
      </div>
    </div>
  )
}

export default HomeUI
