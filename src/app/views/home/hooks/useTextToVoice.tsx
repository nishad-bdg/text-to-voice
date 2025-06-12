import { useEffect, useState } from "react"
import { Language } from "@/types"

interface Exercise {
  id: number
  prompt: string
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "bn", name: "Bengali", flag: "🇧🇩" },
]

const englishPrompts: Exercise[] = [
  { id: 0, prompt: "Type: Hello, how are you?" },
  { id: 1, prompt: "Type: The quick brown fox" },
  { id: 2, prompt: "Type: JavaScript is awesome" },
  { id: 3, prompt: "Type: Learning languages is fun" },
  { id: 4, prompt: "Type: Practice makes perfect" },
  { id: 5, prompt: "Type: Good morning sunshine" },
  { id: 6, prompt: "Type: Technology improves lives" },
  { id: 7, prompt: "Type: Keep learning every day" },
]

const useTextToVoice = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const [isRecording, setIsRecording] = useState(false)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [text, setText] = useState("হ্যালো, কেমন আছেন?")
  const [gender, setGender] = useState<"male" | "female">("female")
  const [dataInEnglish] = useState<Exercise[]>(englishPrompts)

  const handleSpeak = () => {
    const voices: Record<string, Record<string, string>> = {
      bn: {
        male: "Bangla Male",
        female: "Bangla Female",
      },
      en: {
        male: "US English Male",
        female: "US English Female",
      },
    }

    const langCode = selectedLanguage.code
    const voiceName = voices[langCode]?.[gender] || "US English Female"

    if (typeof window !== "undefined" && (window as any).responsiveVoice) {
      const rv = (window as any).responsiveVoice
      if (rv.voiceSupport()) {
        rv.speak(text, voiceName)
      } else {
        alert("ResponsiveVoice not supported.")
      }
    } else {
      alert("Voice engine not loaded.")
    }
  }

  useEffect(() => {
    if (text) handleSpeak()
  }, [text, selectedLanguage, gender])

  useEffect(() => {
    if (!isTimerRunning) return
    const interval = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000)
    return () => clearInterval(interval)
  }, [isTimerRunning])

  const toggleRecording = () => setIsRecording((prev) => !prev)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return {
    selectedLanguage,
    setSelectedLanguage,
    gender,
    setGender,
    isRecording,
    toggleRecording,
    currentExercise,
    setCurrentExercise,
    timeElapsed,
    setTimeElapsed,
    isTimerRunning,
    setIsTimerRunning,
    formatTime,
    languages,
    handleSpeak,
    text,
    setText,
    dataInEnglish,
  }
}

export default useTextToVoice
