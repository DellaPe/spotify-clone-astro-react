import { useEffect, useRef } from "react";
import { usePlayerStore } from "../store/playerStore";
import { CurrentSong } from "./CurrentSong";
import { VolumeControl } from "./VolumeControl";
import { SongControl } from "./SongControl";

export function Player () {
  const { currentMusic, isPlaying, volume, setCurrentMusic, setIsPlaying } = usePlayerStore(state => state)
  const audioRef = useRef() as React.MutableRefObject<HTMLAudioElement>

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause()
  }, [isPlaying])

  useEffect(() => {
    const { song, songs, playlist } = currentMusic
    if (song) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`
      audioRef.current.src = src
      audioRef.current.play()
    }
  }, [currentMusic])

  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

  return (
    <section className="flex flex-row justify-between w-full px-4">
      <CurrentSong song={currentMusic.song} />
      
      <SongControl audio={audioRef} />

      <VolumeControl />

      <audio ref={audioRef} />
    </section>
  )
}