import { useEffect, useState } from "react"
import { Exercise, Language } from "@/types"

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "bn", name: "Bengali", flag: "🇧🇩" },
]

const englishPrompts: Exercise[] = [
  { id: 0, prompt: "Hello, how are you?" },
  { id: 1, prompt: "The quick brown fox" },
  { id: 2, prompt: "JavaScript is awesome" },
  { id: 3, prompt: "Learning languages is fun" },
  { id: 4, prompt: "Practice makes perfect" },
  { id: 5, prompt: "Good morning sunshine" },
  { id: 6, prompt: "Technology improves lives" },
  { id: 7, prompt: "Keep learning every day" },
]

const bengaliPrompts: Exercise[] = [
  { id: 0, prompt: "হ্যালো, আপনি কেমন আছেন?" },
  { id: 1, prompt: "একটি চঞ্চল বাদামী শিয়াল" },
  { id: 2, prompt: "জাভাস্ক্রিপ্ট দুর্দান্ত একটি ভাষা" },
  { id: 3, prompt: "ভাষা শেখা আনন্দদায়ক" },
  { id: 4, prompt: "চর্চা মানুষকে পারফেক্ট করে তোলে" },
  { id: 5, prompt: "সুপ্রভাত, রোদেলা সকাল" },
  { id: 6, prompt: "প্রযুক্তি মানুষের জীবন উন্নত করে" },
  { id: 7, prompt: "প্রতিদিন কিছু না কিছু শিখুন" },
]

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

  const handleSpeak = async () => {
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

      const langCode = selectedLanguage.code // "bn" or "en"
      const voiceName = voices[langCode]?.[gender] || "US English Female"

      if (typeof window !== "undefined" && (window as any).responsiveVoice) {
        const rv = (window as any).responsiveVoice

        if (rv.voiceSupport()) {
          await new Promise<void>((resolve) => {
            rv.speak(text, voiceName, {
              onend: () => resolve(),
            })
          })
        } else {
          alert("ResponsiveVoice not supported.")
        }
      } else {
        alert("Voice engine not loaded.")
      }
    } catch (error) {
      console.error("Speech error:", error)
      alert("Something went wrong while speaking.")
    } finally {
      setIsLoading(false)
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
  }
}

export default useTextToVoice
