import { playlists, type Playlist, type Song } from "@/lib/data";
import { usePlayerStore } from "../store/playerStore";
import { TimeIcon } from "../icons/TimeIcon";
import { PauseIcon } from "../icons/PauseIcon";
import { PlayIcon } from "../icons/PlayIcon";

interface Props {
  songs: Song[];
  id: Playlist["id"];
}

export function MusicsTable({ songs, id }: Props) {
  const { currentMusic, isPlaying, setCurrentMusic, setIsPlaying } = usePlayerStore((state) => state);
  const { song: songStore, playlist } = currentMusic

  const handlePlay = (song: Song) => {
    if (songStore?.id === song.id && id === playlist?.id) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentMusic({
        playlist: playlists.find((playlist) => playlist.id === id),
        song,
        songs: songs
      })
      setIsPlaying(true)
    }
  }
  

  return (
    <table className="table-auto text-left divide-y-2 divide-zinc-700 mx-4 z-10">
      <thead className="">
        <tr>
          <th className="p-2">#</th>
          <th className="p-2">Título</th>
          <th className="p-2">Álbum</th>
          <th className="p-2"><TimeIcon /></th>
        </tr>
      </thead>

      <tbody className="rounded-lg">
        <tr className="h-2"></tr>
        {
          songs.map((song, index) => (
            <tr className={`hover:bg-zinc-700 ${(song.id === songStore?.id) && (id === playlist?.id) ? 'text-green-600' : '' }`}>
              <td className="p-2 rounded-tl-lg rounded-bl-lg w-14">
                <div className="group flex justify-center">
                  <span className="group-hover:hidden">{index + 1}</span>
                  <button
                    onClick={() => handlePlay(song)}
                    className="group-hover:flex hidden bg-green-500 p-2 rounded-full"
                  >
                    {isPlaying && song.id === songStore?.id && id === playlist?.id ? <PauseIcon /> : <PlayIcon />}
                  </button>
                </div>
              </td>
              <td className="p-2 flex gap-4">
                <picture className="w-10 h-10 rounded-lg">
                  <img
                    src={song.image}
                    alt={`${song.title} image`}
                    className="rounded-lg"
                  />
                </picture>
                <div className="flex flex-col justify-center truncate">
                  <h3 className="font-semibold text-sm">{song.title}</h3>
                  <span className="text-xs opacity-50">{song.artists.join(", ")}</span>
                </div>
              </td>
              <td className="p-2">{song.album}</td>
              <td className="p-2 rounded-tr-lg rounded-br-lg">{song.duration}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}