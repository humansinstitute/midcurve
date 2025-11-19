import { useEffect, useState } from 'react'
import './App.css'

const DEFAULT_TEXT = 'Find out if your mid curving, share your thoughts here'
const MAX_CHARS = 1000

function App() {
  const [inputText, setInputText] = useState(DEFAULT_TEXT)
  const [textToStream, setTextToStream] = useState(DEFAULT_TEXT)
  const [streamedText, setStreamedText] = useState('')
  const [phase, setPhase] = useState('idle') // idle | streaming | grug | yes
  const [formVisible, setFormVisible] = useState(true)
  const [yesVisible, setYesVisible] = useState(false)

  useEffect(() => {
    if (phase !== 'streaming') return undefined

    const text = textToStream.trim() || DEFAULT_TEXT
    const totalDurationMs = Math.min(15000, Math.max(3000, text.length * 25))
    const intervalMs = Math.max(12, totalDurationMs / text.length)
    let index = 0

    const timer = setInterval(() => {
      index += 1
      setStreamedText(text.slice(0, index))

      if (index >= text.length) {
        clearInterval(timer)
        setTimeout(() => {
          setStreamedText('')
          setPhase('grug')
          setTimeout(() => {
            setPhase('yes')
            setYesVisible(true)
            setTimeout(() => {
              setFormVisible(true)
              setYesVisible(false)
              setPhase('idle')
            }, 2000)
          }, 2000)
        }, 160)
      }
    }, intervalMs)

    return () => clearInterval(timer)
  }, [phase, textToStream])

  const handleChange = (event) => {
    const { value } = event.target
    const trimmed = value.slice(0, MAX_CHARS)
    setInputText(trimmed)
  }

  const startStream = () => {
    if (phase === 'streaming') return

    const text = inputText.trim() || DEFAULT_TEXT
    setFormVisible(false)
    setYesVisible(false)
    setStreamedText('')
    setTextToStream(text)
    setPhase('streaming')
  }

  return (
    <div className="app">
      <header className={`title ${phase !== 'idle' ? 'hidden' : ''}`}>Am I midcurving?</header>

      <section className="hero">
        <img
          src="/bell-curve.png"
          alt="Bell curve meme"
          className={`meme ${phase !== 'idle' ? 'fade' : ''}`}
        />

        <img
          src="/grug.png"
          alt="Grug brain engineer"
          className={`grug ${(phase === 'grug' || phase === 'yes') ? 'show' : ''} ${phase === 'grug' ? 'ponder' : ''} ${phase === 'yes' ? 'focus' : ''}`}
        />

        <div className={`stream-overlay ${phase === 'streaming' ? 'visible' : ''}`}>
          <p className="stream-text">{streamedText}</p>
        </div>

        <div className={`grug-title ${phase === 'grug' || phase === 'yes' ? 'show' : ''}`}>
          Am I midcurving
        </div>

        <div className={`whiteout ${phase === 'yes' ? 'show' : ''}`} />

        <div className={`yes ${yesVisible ? 'visible' : ''}`}>YES</div>
      </section>

      <section className={`panel ${formVisible ? 'visible' : 'hidden'}`}>
        <label className="label" htmlFor="thoughts">
          Your idea
        </label>
        <textarea
          id="thoughts"
          value={inputText}
          onChange={handleChange}
          onFocus={() => {
            if (inputText === DEFAULT_TEXT) setInputText('')
          }}
          placeholder={DEFAULT_TEXT}
          maxLength={MAX_CHARS}
        />
        <div className="controls">
          <button onClick={startStream} disabled={phase === 'streaming'}>
            Test your idea
          </button>
          <small>
            {inputText.length}/{MAX_CHARS} chars
          </small>
        </div>
      </section>
    </div>
  )
}

export default App
