import { useRef, useState } from "react";
import { PauseIcon } from "../icons/PauseIcon";
import { PlayIcon } from "../icons/PlayIcon";

export function Player () {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(null)
  const audioRef = useRef() as React.MutableRefObject<HTMLAudioElement>

  const handleClick = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.src = '/music/1/01.mp3'
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="flex flex-row justify-between w-full px-4">
      <article>
        CurrentSong...
      </article>

      <article className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center">
          <button className="bg-white rounded-full p-2" onClick={() => handleClick()}>
            { isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      </article>

      <article>
        Volumen
      </article>

      <audio ref={audioRef} />
    </section>
  )
}