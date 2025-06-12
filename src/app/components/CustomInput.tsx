import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


interface CustomInputProps {
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  required?: boolean
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder = "Type here...",
  value,
  onChange,
  disabled = false,
  required = false,
}) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <Label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Input
        type="text"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`h-11 px-4 bg-white/60 backdrop-blur-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all duration-200 ${
          disabled ? "opacity-60 cursor-not-allowed" : ""
        }`}
      />
    </div>
  )
}

export default CustomInput
