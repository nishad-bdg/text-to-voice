"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Mic,
  MicOff,
  Play,
  Pause,
  Check,
  X,
  Globe,
  Keyboard,
  Trophy,
  Clock,
  Target,
} from "lucide-react"
import useTextToVoice from "./hooks/useTextToVoice"
import LanguageOptions from "@/app/components/LanguageCard"
import LanguageCard from "@/app/components/LanguageCard"
import Recorder from "@/app/components/Recorder"

export default function Home() {
  const {
    selectedLanguage,
    setSelectedLanguage,
    isRecording,
    timeElapsed,
    handleAnswerChange,
    toggleRecording,
    completedExercises,
    correctAnswers,
    formatTime,
    languages,
    exercises,
    checkAnswer,
  } = useTextToVoice()

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
        <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Keyboard className="w-5 h-5 text-indigo-600" />
              <span>Typing Exercises</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    exercise.completed
                      ? exercise.isCorrect
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-red-200 bg-red-50"
                      : "border-gray-200 bg-white hover:border-indigo-200 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                      ${
                        exercise.completed
                          ? exercise.isCorrect
                            ? "bg-emerald-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }
                    `}
                    >
                      {exercise.completed ? (
                        exercise.isCorrect ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <X className="w-4 h-4" />
                        )
                      ) : (
                        exercise.id + 1
                      )}
                    </div>

                    <div className="flex-1 space-y-3">
                      <p className="text-gray-900 font-medium">
                        {exercise.prompt}
                      </p>

                      <div className="flex space-x-2">
                        <Input
                          placeholder="Type your answer here..."
                          value={exercise.userAnswer}
                          onChange={(e) =>
                            handleAnswerChange(e.target.value, exercise.id)
                          }
                          disabled={exercise.completed}
                          className={`flex-1 ${
                            exercise.completed
                              ? exercise.isCorrect
                                ? "border-emerald-300 bg-emerald-50"
                                : "border-red-300 bg-red-50"
                              : "focus:border-indigo-400 focus:ring-indigo-200"
                          }`}
                        />

                        {!exercise.completed && (
                          <Button
                            onClick={() => checkAnswer(exercise.id)}
                            disabled={!exercise.userAnswer.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                          >
                            Check
                          </Button>
                        )}
                      </div>

                      {exercise.completed && (
                        <div
                          className={`text-sm ${
                            exercise.isCorrect
                              ? "text-emerald-600"
                              : "text-red-600"
                          }`}
                        >
                          {exercise.isCorrect ? (
                            <div className="flex items-center space-x-1">
                              <Check className="w-4 h-4" />
                              <span>Correct! Well done.</span>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <div className="flex items-center space-x-1">
                                <X className="w-4 h-4" />
                                <span>Incorrect. The correct answer is:</span>
                              </div>
                              <p className="font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">
                                {exercise.expectedAnswer}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Completion Message */}
        {completedExercises === exercises.length && (
          <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-emerald-200" />
              <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
              <p className="text-emerald-100">
                You've completed all exercises with{" "}
                {Math.round((correctAnswers / completedExercises) * 100)}%
                accuracy in {formatTime(timeElapsed)}!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
