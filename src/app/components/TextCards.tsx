import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Exercise } from "@/types"
import { Keyboard } from "lucide-react"
import React, { JSX } from "react"

interface TextCardsProps {
  data: Exercise[]
  setText: (text: string) => void
}

const TextCards: React.FC<TextCardsProps> = ({data, setText}): JSX.Element => {
  return (
    <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm cursor-pointer">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Keyboard className="w-5 h-5 text-indigo-600" />
          <span>Typing Exercises</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data?.map((exercise) => (
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
                  onClick={() => setText(exercise.prompt)}
                >
                  <p className="text-gray-900 font-medium">{exercise.prompt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default TextCards
