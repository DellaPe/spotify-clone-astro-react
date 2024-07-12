import { create } from "zustand"
import type { Playlist, Song } from "../lib/data"

interface CurrentMusic {
  playlist: Playlist | null
  song: Song | null
  songs: string[]
}

interface UsePlayerStore {
  isPlaying: boolean
  volume: number
  currentMusic: CurrentMusic
  setIsPlaying: (isPlaying: boolean) => void
  setVolume: (volume: number) => void
  setCurrentMusic: (currentMusic: any) => void
}

export const usePlayerStore = create<UsePlayerStore>((set) => ({
  isPlaying: false,
  volume: 0.9,
  currentMusic: {
    playlist: null,
    song: null,
    songs: []
  },
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setVolume: (volume: number) => set({ volume }),
  setCurrentMusic: (currentMusic: CurrentMusic) => set({ currentMusic }),
}))