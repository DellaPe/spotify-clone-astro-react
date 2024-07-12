import { useReducer } from "react"

const initialState = {
  isVolumeSilenced: false,
  isVolumeDown: false,
  isVolumeUp: false
}
type State = typeof initialState

const ACTIONS = {
  SILENCE: 'isVolumeSilenced',
  VOLUME_DOWN: 'isVolumeDown',
  VOLUME_UP: 'isVolumeUp'
} as const
type Action = typeof ACTIONS[keyof typeof ACTIONS]

function reducer(state: State , action: Action) {
  return {
    ...initialState,
    [action]: true
  }
}

export function useVolumeIcon() {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  const setVolumeSilence = () => dispatch(ACTIONS.SILENCE)
  const setVolumeDown = () => dispatch(ACTIONS.VOLUME_DOWN)
  const setVolumeUp = () => dispatch(ACTIONS.VOLUME_UP)

  return {
    state,
    setVolumeSilence,
    setVolumeDown,
    setVolumeUp
  }
}