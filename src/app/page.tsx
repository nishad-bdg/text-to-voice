"use client";
import { useState } from "react";
import HomeUI from "./views/home";

export default function Home() {
  const [text, setText] = useState("হ্যালো, কেমন আছেন?");
  const [gender, setGender] = useState<"male" | "female">("female");

  const handleSpeak = () => {
    const voiceName =
      gender === "female" ? "Bangla India Female" : "Bangla India Male";

    if (typeof window !== "undefined" && (window as any).responsiveVoice) {
      const rv = (window as any).responsiveVoice;
      if (rv.voiceSupport()) {
        rv.speak(text, voiceName);
      } else {
        alert("ResponsiveVoice not supported.");
      }
    } else {
      alert("Voice engine not loaded.");
    }
  };

  return (
    // <div className="p-4 max-w-xl mx-auto space-y-4">
    //   <textarea
    //     value={text}
    //     onChange={(e) => setText(e.target.value)}
    //     className="border p-2 w-full"
    //     rows={3}
    //   />
    //   <div className="flex items-center space-x-4">
    //     <label className="flex items-center space-x-2">
    //       <input
    //         type="radio"
    //         name="voice"
    //         value="female"
    //         checked={gender === "female"}
    //         onChange={() => setGender("female")}
    //       />
    //       <span>Female</span>
    //     </label>
    //     <label className="flex items-center space-x-2">
    //       <input
    //         type="radio"
    //         name="voice"
    //         value="male"
    //         checked={gender === "male"}
    //         onChange={() => setGender("male")}
    //       />
    //       <span>Male</span>
    //     </label>
    //   </div>
    //   <button
    //     onClick={handleSpeak}
    //     className="bg-blue-600 text-white px-4 py-2 rounded"
    //   >
    //     ▶️ Speak Bengali
    //   </button>
    // </div>
    <HomeUI />
  );
}
