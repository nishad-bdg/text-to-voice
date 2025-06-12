import React from "react"

interface FloatingLoaderProps {
  fullScreen?: boolean
}

const FloatingLoader: React.FC<FloatingLoaderProps> = ({
  fullScreen = false,
}) => {
  return (
    <div
      className={`${
        fullScreen ? "fixed inset-0 z-50" : "absolute inset-0"
      } flex items-center justify-center bg-white/60 backdrop-blur-sm`}
    >
      <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default FloatingLoader
