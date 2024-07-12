import { useEffect, useRef } from "react"
import { usePlayerStore } from "../store/playerStore"
import { VolumeDown, VolumenUp, VolumeSilence } from "../icons/VolumeIcon"
import { Slider } from "./Slider"
import { useVolumeIcon } from "../reducers/useVolumeIcon"

export function VolumeControl () {
  const volume = usePlayerStore(state => state.volume)
  const setVolume = usePlayerStore(state => state.setVolume)
  const { setVolumeDown, setVolumeSilence, setVolumeUp, state } = useVolumeIcon()
  const { isVolumeDown, isVolumeSilenced, isVolumeUp } = state
  const previousVolumeRef = useRef(volume)


  const handleClickVolumen = () => {
    if (isVolumeSilenced) {
      setVolume(previousVolumeRef.current)
    } else {
      previousVolumeRef.current = volume
      setVolume(0)
    }
  }

  useEffect(() => {
    if (volume === 0) {
      setVolumeSilence()
    } else if (volume <= 0.5) {
      setVolumeDown()
    } else {
      setVolumeUp()
    }
  }, [volume])

  return (
    <article className="flex items-center justify-center gap-x-2 text-white">
      <button className="opacity-70 hover:opacity-100 transition" onClick={handleClickVolumen}>
        {isVolumeSilenced && <VolumeSilence />}
        {isVolumeDown && <VolumeDown />}
        {isVolumeUp && <VolumenUp />}
      </button>
    
      <Slider 
          value={volume * 100}
          min={0} 
          max={100}
          onChange={ setVolume }
        />
    </article>
  )
}