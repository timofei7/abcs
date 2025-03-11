// Common emojis that kids might enjoy
const EMOJIS = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "😊",
  "😇",
  "🙂",
  "🙃",
  "😉",
  "😌",
  "😍",
  "🥰",
  "😘",
  "😗",
  "😙",
  "😚",
  "😋",
  "😛",
  "😝",
  "😜",
  "🤪",
  "🤨",
  "🧐",
  "🤓",
  "😎",
  "🤩",
  "🦁",
  "🐯",
  "🐱",
  "🐶",
  "🐼",
  "🐨",
  "🐵",
  "🙈",
  "🙉",
  "🙊",
  "🐔",
  "🐧",
  "🐦",
  "🐤",
  "🐣",
  "🦆",
  "🦅",
  "🦉",
  "🦇",
  "🐺",
  "🐗",
  "🐴",
  "🦄",
  "🐝",
  "🐛",
  "🦋",
  "🐌",
  "🐞",
  "🐜",
  "🦟",
]

export function Keyboard({ onKeyPress, showEmojis }) {
  // Define keyboard layouts
  const alphabetRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ]

  // Create emoji grid (5x10)
  const emojiRows = []
  for (let i = 0; i < EMOJIS.length; i += 10) {
    emojiRows.push(EMOJIS.slice(i, i + 10))
  }

  return (
    <div className="w-full max-w-4xl bg-gray-100 rounded-xl p-4 shadow-lg">
      {showEmojis ? (
        // Emoji Keyboard
        <div className="flex flex-col gap-2">
          {emojiRows.map((row, rowIndex) => (
            <div key={`emoji-row-${rowIndex}`} className="flex justify-center gap-1">
              {row.map((emoji, keyIndex) => (
                <button
                  key={`emoji-${rowIndex}-${keyIndex}`}
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-lg text-2xl flex items-center justify-center shadow hover:bg-gray-50 active:bg-gray-200"
                  onClick={() => onKeyPress(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          ))}
        </div>
      ) : (
        // Alphabet Keyboard
        <div className="flex flex-col gap-2">
          {alphabetRows.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="flex justify-center gap-1">
              {row.map((key) => (
                <button
                  key={`key-${key}`}
                  className="w-10 h-14 sm:w-14 sm:h-16 bg-white rounded-lg text-2xl font-bold flex items-center justify-center shadow hover:bg-gray-50 active:bg-gray-200"
                  onClick={() => onKeyPress(key)}
                >
                  {key}
                </button>
              ))}
            </div>
          ))}

          {/* Bottom row with space, backspace, enter */}
          <div className="flex justify-center gap-1 mt-1">
            <button
              className="w-20 h-14 sm:h-16 bg-white rounded-lg text-xl font-bold flex items-center justify-center shadow hover:bg-gray-50 active:bg-gray-200"
              onClick={() => onKeyPress("Backspace")}
            >
              ⌫
            </button>
            <button
              className="flex-1 h-14 sm:h-16 bg-white rounded-lg text-xl font-bold flex items-center justify-center shadow hover:bg-gray-50 active:bg-gray-200"
              onClick={() => onKeyPress(" ")}
            >
              Space
            </button>
            <button
              className="w-20 h-14 sm:h-16 bg-white rounded-lg text-xl font-bold flex items-center justify-center shadow hover:bg-gray-50 active:bg-gray-200"
              onClick={() => onKeyPress("Enter")}
            >
              ↵
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

