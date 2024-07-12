import type { Playlist, Song } from "@/lib/data";

interface Props {
  song: Song | null
}

export function CurrentSong ({ song } : Props ) {

  if (!song) return (
    <article className="flex items-center gap-4 relative overflow-hidden">
    <div className="w-12 h-12 rounded-lg bg-zinc-700">
    </div>
    <div className="flex flex-col justify-center gap-1">
      <div className="w-14 h-[14px] bg-zinc-700 rounded-lg"></div>
      <div className="w-16 h-[12px] bg-zinc-700 rounded-lg"></div>
      <div className="w-20 h-[12px] bg-zinc-700 rounded-lg"></div>
    </div>
  </article>
  )

  const { album, artists, image, title } = song;
  const artistsString = artists.join(", ");

  return (
    <article className="flex items-center gap-4 relative overflow-hidden">
      <picture className="w-12 h-12 rounded-lg">
        <img src={image} alt={title} className="rounded-lg" />
      </picture>
      <div className="flex flex-col justify-center truncate">
        <h3 className="font-semibold text-sm">{title}</h3>
        <span className="text-xs opacity-50">{album}</span>
        <span className="text-xs opacity-50">{artistsString}</span>
      </div>
    </article>
  )
}