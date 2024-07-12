import type { Playlist } from "@/lib/data";
import { PauseIcon } from "@/icons/PauseIcon";
import { PlayIcon } from "@/icons/PlayIcon";
import { usePlayerStore } from "@/store/playerStore";

interface Props {
  id: Playlist['id']
  size: 'sm' | 'lg'
  element?: 'side'
}

export function CardPlayButton ({ id, size, element } : Props ) {
  const { currentMusic, isPlaying, setCurrentMusic, setIsPlaying } = usePlayerStore(state => state)

  if (element === 'side' && currentMusic.playlist?.id !== id) return null

  const isPlayingPlayList = isPlaying && currentMusic.playlist?.id === id

  let className
  if (size === 'sm') {
    className = 'p-2'
  } else if (size === 'lg') {
    className = 'p-4 w-fit mx-4'
  }

  const handleClick = () => {
    if (isPlayingPlayList) {
      setIsPlaying(false)
      return
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const { songs, playlist } = data
        setIsPlaying(true)
        setCurrentMusic({
          songs,
          song: songs[0],
          playlist
        })
      })
  }

  return (
    <button className={`z-10 bg-green-500 rounded-full hover:bg-green-400 ${className}`} onClick={handleClick}>
      {isPlayingPlayList ? <PauseIcon /> : <PlayIcon />}
    </button>
  )
}