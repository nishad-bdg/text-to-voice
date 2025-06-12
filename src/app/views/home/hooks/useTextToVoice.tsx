import { useEffect, useState } from "react"
import { Exercise, Language } from "@/types"

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "bn", name: "Bengali", flag: "🇧🇩" },
]

const englishPrompts: Exercise[] = [{ id: 0, prompt: "Hello, how are you?" }]

const bengaliPrompts: Exercise[] = [
  { id: 0, prompt: "হ্যালো, আপনি কেমন আছেন?" },
  { id: 1, prompt: "আসসালামু আলাইকুম" },
]

interface ResponsiveVoice {
  speak: (text: string, voice: string, options?: { onend?: () => void }) => void
  voiceSupport: () => boolean
}

const useTextToVoice = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const [isRecording, setIsRecording] = useState(false)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [text, setText] = useState<string | null>(null)
  const [gender, setGender] = useState<"male" | "female">("female")
  const [exercises, setExercises] = useState<Exercise[]>(englishPrompts)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [customText, setCustomText] = useState<string>("")

  const handleSpeak = () => {
    setIsLoading(true)

    try {
      const voices: Record<string, Record<string, string>> = {
        bn: {
          male: "Bangla India Male",
          female: "Bangla India Female",
        },
        en: {
          male: "UK English Male", // fallback to UK if US Male sounds similar
          female: "US English Female",
        },
      }

      const langCode = selectedLanguage.code
      const voiceName = voices[langCode]?.[gender] || "US English Female"
      /* eslint-disable @typescript-eslint/no-explicit-any */
      if (typeof window !== "undefined" && (window as any).responsiveVoice) {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const rv = (window as any).responsiveVoice

        if (rv.voiceSupport()) {
          rv.speak(text, voiceName, {
            onend: () => {
              setIsLoading(false)
            },
          })
        } else {
          alert("ResponsiveVoice not supported.")
          setIsLoading(false)
        }
      } else {
        alert("Voice engine not loaded.")
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Speech error:", error)
      alert("Something went wrong while speaking.")
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.info('text', text)
    if (text) handleSpeak()
  }, [text, selectedLanguage, gender])

  useEffect(() => {
    if (!isTimerRunning) return
    const interval = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000)
    return () => clearInterval(interval)
  }, [isTimerRunning])

  useEffect(() => {
    if (selectedLanguage.code === "bn") {
      setExercises(bengaliPrompts)
    } else {
      setExercises(englishPrompts)
    }
  }, [selectedLanguage])

  const toggleRecording = () => setIsRecording((prev) => !prev)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`
  }

  const handleAddData = (text: string): void => {
    let newData = null
    if (selectedLanguage?.code === "bn") {
      newData = [
        ...bengaliPrompts,
        {
          id: bengaliPrompts[bengaliPrompts?.length - 1]?.id + 1,
          prompt: text,
        },
      ]
    } else {
      newData = [
        ...englishPrompts,
        {
          id: bengaliPrompts[bengaliPrompts?.length - 1]?.id + 1,
          prompt: text,
        },
      ]
    }
    setExercises(newData)
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
    exercises,
    isLoading,
    customText,
    setCustomText,
    handleAddData,
  }
}

export default useTextToVoice
