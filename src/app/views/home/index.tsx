'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  Target
} from 'lucide-react';

interface Exercise {
  id: number;
  prompt: string;
  expectedAnswer: string;
  completed: boolean;
  userAnswer: string;
  isCorrect: boolean | null;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
];

const exercisePrompts = [
  { prompt: "Type: Hello, how are you?", answer: "Hello, how are you?" },
  { prompt: "Type: The quick brown fox", answer: "The quick brown fox" },
  { prompt: "Type: JavaScript is awesome", answer: "JavaScript is awesome" },
  { prompt: "Type: Learning languages is fun", answer: "Learning languages is fun" },
  { prompt: "Type: Practice makes perfect", answer: "Practice makes perfect" },
  { prompt: "Type: Good morning sunshine", answer: "Good morning sunshine" },
  { prompt: "Type: Technology improves lives", answer: "Technology improves lives" },
  { prompt: "Type: Keep learning every day", answer: "Keep learning every day" },
];

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    // Initialize exercises
    const initialExercises = exercisePrompts.map((item, index) => ({
      id: index,
      prompt: item.prompt,
      expectedAnswer: item.answer,
      completed: false,
      userAnswer: '',
      isCorrect: null,
    }));
    setExercises(initialExercises);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleAnswerChange = (value: string, exerciseId: number) => {
    setExercises(prevExercises => 
      prevExercises.map(exercise => 
        exercise.id === exerciseId 
          ? { ...exercise, userAnswer: value }
          : exercise
      )
    );
  };

  const checkAnswer = (exerciseId: number) => {
    const exercise = exercises[exerciseId];
    const isCorrect = exercise.userAnswer.trim().toLowerCase() === exercise.expectedAnswer.toLowerCase();
    
    setExercises(prevExercises => 
      prevExercises.map(ex => 
        ex.id === exerciseId 
          ? { ...ex, completed: true, isCorrect }
          : ex
      )
    );

    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const completedExercises = exercises.filter(ex => ex.completed).length;
  const correctAnswers = exercises.filter(ex => ex.isCorrect === true).length;
  const progressPercentage = (completedExercises / exercises.length) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Keyboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Independent</h1>
                <p className="text-sm text-gray-600">Typing Practice</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatTime(timeElapsed)}</span>
              </div>
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                {selectedLanguage.flag} {selectedLanguage.name}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Completed</p>
                  <p className="text-2xl font-bold">{completedExercises}/8</p>
                </div>
                <Trophy className="w-8 h-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Accuracy</p>
                  <p className="text-2xl font-bold">
                    {completedExercises > 0 ? Math.round((correctAnswers / completedExercises) * 100) : 0}%
                  </p>
                </div>
                <Target className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm">Progress</p>
                  <p className="text-2xl font-bold">{Math.round(progressPercentage)}%</p>
                </div>
                <Globe className="w-8 h-8 text-amber-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Overall Progress</h3>
              <span className="text-sm text-gray-600">{completedExercises} of 8 exercises</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-3 bg-gray-200"
            />
          </CardContent>
        </Card>

        {/* Language Selection */}
        <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-indigo-600" />
              <span>Language</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {languages.map((language) => (
                <Button
                  key={language.code}
                  variant={selectedLanguage.code === language.code ? "default" : "outline"}
                  className={`h-12 transition-all duration-200 ${
                    selectedLanguage.code === language.code 
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg scale-105" 
                      : "hover:bg-gray-50 hover:border-indigo-300"
                  }`}
                  onClick={() => setSelectedLanguage(language)}
                >
                  <span className="mr-2 text-base">{language.flag}</span>
                  <span className="text-sm font-medium">{language.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recording Controls */}
        <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <Mic className="w-5 h-5 text-indigo-600" />
              <span>Record</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <Button
                onClick={toggleRecording}
                size="lg"
                className={`w-16 h-16 rounded-full transition-all duration-300 ${
                  isRecording 
                    ? "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-200 animate-pulse" 
                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"
                }`}
              >
                {isRecording ? (
                  <MicOff className="w-6 h-6" />
                ) : (
                  <Mic className="w-6 h-6" />
                )}
              </Button>
            </div>
            <p className="text-center text-sm text-gray-600 mt-3">
              {isRecording ? "Recording... Click to stop" : "Click to start recording"}
            </p>
          </CardContent>
        </Card>

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
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                      ${exercise.completed 
                        ? exercise.isCorrect 
                          ? "bg-emerald-500 text-white" 
                          : "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-600"
                      }
                    `}>
                      {exercise.completed ? (
                        exercise.isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />
                      ) : (
                        exercise.id + 1
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <p className="text-gray-900 font-medium">{exercise.prompt}</p>
                      
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Type your answer here..."
                          value={exercise.userAnswer}
                          onChange={(e) => handleAnswerChange(e.target.value, exercise.id)}
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
                        <div className={`text-sm ${
                          exercise.isCorrect ? "text-emerald-600" : "text-red-600"
                        }`}>
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
                You've completed all exercises with {Math.round((correctAnswers / completedExercises) * 100)}% accuracy 
                in {formatTime(timeElapsed)}!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}