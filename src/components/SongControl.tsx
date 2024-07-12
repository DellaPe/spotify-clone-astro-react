import { useEffect, useState } from "react"
import { PauseIcon } from "../icons/PauseIcon"
import { PlayIcon } from "../icons/PlayIcon"
import { usePlayerStore } from "../store/playerStore"
import { Slider } from "./Slider"
import type { number } from "astro/zod"

interface Props {
  audio: React.MutableRefObject<HTMLAudioElement>
}

export function SongControl ({ audio } : Props ) {
  const [currentTime, setCurretTime] = useState(0)
  const { currentMusic, isPlaying, volume, setCurrentMusic, setIsPlaying } = usePlayerStore(state => state)
  const handleClick = () => { setIsPlaying(!isPlaying) }

  useEffect(() => {
    if (!audio.current) return
    audio.current.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      audio.current.removeEventListener('timeupdate', handleTimeUpdate)
    }
  })

  const handleTimeUpdate = () => {
    setCurretTime(audio.current.currentTime)
  }

  const formatTime = (time: number) => {
    if (time == null) return `0:00`

    const minutes = Math.floor(time / 60).toString().padStart(2, '0')
    const seconds = Math.floor(time % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`

  }

  const duration = audio?.current?.duration ?? 0

  const handleOnchange = (value: number) => {
    audio.current.currentTime = value * 100
    setIsPlaying(true)
  }

  return (
    <article className="grid place-content-center gap-4 flex-1">
      <div className="flex justify-center items-center">
        <button className="bg-white rounded-full p-2" onClick={() => handleClick()}>
          { isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <span className="text-xs opacity-50">{formatTime(currentTime)}</span>
        <Slider 
          className="w-96"
          max={audio?.current?.duration ?? 0}
          min={0}
          value={currentTime}
          onChange={ handleOnchange }
        />
        <span className="text-xs opacity-50">
          {duration ? formatTime(duration) : '0:00'}
        </span>
      </div>
    </article>
  )
}