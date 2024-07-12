
import { allPlaylists, songs as allSongs } from "@/lib/data";
// Aca se tendia que llamar a una base de datos
// Como solo uso un archivo, no lo hago
export async function GET({ params, request }: { params: any; request: any }) {
  const { url } = request
  const urlObject = new URL(url)
  const id = urlObject.searchParams.get('id')
  // 2 formas de hacer lo mismo
  // const [, querySting] = url.split('?')
  // const query = new URLSearchParams(querySting)
  // const id = query.get('id')

  const playlist = allPlaylists.find(playlist => playlist.id === id)
  const songs = allSongs.filter(song => song.albumId === playlist?.albumId)

  return new Response(JSON.stringify({ playlist, songs }), {
    headers: {
      'content-type': 'application/json'
    }
  })
  
}