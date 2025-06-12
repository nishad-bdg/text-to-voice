import React, { JSX } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Language } from "@/types"

interface LanguageCardProps {
  languages: Language[]
  selectedLanguage: Language
  setSelectedLanguage: (data: Language) => void
}

const LanguageCard: React.FC<LanguageCardProps> = ({
  languages,
  selectedLanguage,
  setSelectedLanguage,
}): JSX.Element => {
  return (
    <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-indigo-600" />
          <span>Language</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {languages?.map((language) => (
            <Button
              key={language.code}
              variant={
                selectedLanguage.code === language.code ? "default" : "outline"
              }
              className={`h-12 transition-all duration-200 cursor-pointer ${
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
  )
}

export default LanguageCard
