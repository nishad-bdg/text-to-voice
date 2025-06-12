import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, MicOff } from "lucide-react"
import React, { JSX } from "react"

interface RecorderProps {
  toggleRecording: () => void
  isRecording: boolean
}

const Recorder: React.FC<RecorderProps> = ({
  toggleRecording,
  isRecording,
}): JSX.Element => {
  return (
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
            className={`w-16 h-16 rounded-full transition-all duration-300 cursor-pointer ${
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
        <p className="text-center text-sm text-gray-600 mt-3 cursor-pointer">
          {isRecording
            ? "Recording... Click to stop"
            : "Click to start recording"}
        </p>
      </CardContent>
    </Card>
  )
}

export default Recorder
