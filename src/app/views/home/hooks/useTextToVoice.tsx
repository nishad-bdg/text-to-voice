import { Language } from "@/types"
import { useEffect, useState } from "react"
interface Exercise {
  id: number
  prompt: string
  expectedAnswer: string
  completed: boolean
  userAnswer: string
  isCorrect: boolean | null
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "bn", name: "Bengali", flag: "🇧🇩" },
]

const exercisePrompts = [
  { prompt: "Type: Hello, how are you?", answer: "Hello, how are you?" },
  { prompt: "Type: The quick brown fox", answer: "The quick brown fox" },
  { prompt: "Type: JavaScript is awesome", answer: "JavaScript is awesome" },
  {
    prompt: "Type: Learning languages is fun",
    answer: "Learning languages is fun",
  },
  { prompt: "Type: Practice makes perfect", answer: "Practice makes perfect" },
  { prompt: "Type: Good morning sunshine", answer: "Good morning sunshine" },
  {
    prompt: "Type: Technology improves lives",
    answer: "Technology improves lives",
  },
  {
    prompt: "Type: Keep learning every day",
    answer: "Keep learning every day",
  },
]

const useTextToVoice = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const [isRecording, setIsRecording] = useState(false)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  const [text, setText] = useState("হ্যালো, কেমন আছেন?")
  const [gender, setGender] = useState<"male" | "female">("female")

  const handleSpeak = () => {
    const voiceName =
      gender === "female" ? "Bangla India Female" : "Bangla India Male"

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
    // Initialize exercises
    const initialExercises = exercisePrompts.map((item, index) => ({
      id: index,
      prompt: item.prompt,
      expectedAnswer: item.answer,
      completed: false,
      userAnswer: "",
      isCorrect: null,
    }))
    setExercises(initialExercises)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  const handleAnswerChange = (value: string, exerciseId: number) => {
    setExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === exerciseId
          ? { ...exercise, userAnswer: value }
          : exercise
      )
    )
  }

  const checkAnswer = (exerciseId: number) => {
    const exercise = exercises[exerciseId]
    const isCorrect =
      exercise.userAnswer.trim().toLowerCase() ===
      exercise.expectedAnswer.toLowerCase()

    setExercises((prevExercises) =>
      prevExercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, completed: true, isCorrect } : ex
      )
    )

    if (!isTimerRunning) {
      setIsTimerRunning(true)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  const completedExercises = exercises.filter((ex) => ex.completed).length
  const correctAnswers = exercises.filter((ex) => ex.isCorrect === true).length
  const progressPercentage = (completedExercises / exercises.length) * 100

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
    isRecording,
    setIsRecording,
    currentExercise,
    setCurrentExercise,
    timeElapsed,
    setTimeElapsed,
    isTimerRunning,
    setIsTimerRunning,
    handleAnswerChange,
    toggleRecording,
    completedExercises,
    correctAnswers,
    progressPercentage,
    formatTime,
    languages,
    exercises,
    checkAnswer,
    handleSpeak,
  }
}

export default useTextToVoice
