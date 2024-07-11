import type { Playlist } from "@/lib/data";
import { PauseIcon } from "@/icons/PauseIcon";
import { PlayIcon } from "@/icons/PlayIcon";

export function CardPlayButton ({ id } : { id: Playlist['id'] }) {
  return (
    <button className="bg-green-500 rounded-full p-2">
      <PlayIcon />
    </button>
  )
}