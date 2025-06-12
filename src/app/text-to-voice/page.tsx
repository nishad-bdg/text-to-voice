'use client'

import { sampleCards } from "@/constants"
import { Card } from "../components/Card"


const TextToVoicePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Articles
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the latest insights and tutorials from our expert contributors
          </p>
        </div>
        
        <div className="space-y-6">
          {sampleCards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              author={card.author}
              date={card.date}
              rating={card.rating}
              tag={card.tag}
              onClick={card.onClick}
            />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm">
            Click on any card to see the interaction
          </p>
        </div>
      </div>
    </div>
  )
}

export default TextToVoicePage