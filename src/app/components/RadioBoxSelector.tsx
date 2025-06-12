import React from "react"

interface Option<T = string> {
  label: string
  value: T
}

interface RadioBoxSelectorProps<T = string> {
  name: string
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
  label?: string
  direction?: "row" | "column"
}

const RadioBoxSelector = <T extends string | number>({
  name,
  options,
  value,
  onChange,
  label,
  direction = "row",
}: RadioBoxSelectorProps<T>) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div
        className={`flex ${
          direction === "column" ? "flex-col space-y-2" : "flex-wrap gap-3"
        }`}
      >
        {options.map((option) => {
          const isSelected = value === option.value
          return (
            <label
              key={option.value}
              className={`cursor-pointer px-4 py-2 rounded-lg border text-sm font-medium transition-all
                ${
                  isSelected
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md scale-105"
                    : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400 hover:bg-indigo-50"
                }
              `}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="hidden"
              />
              {option.label}
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default RadioBoxSelector
