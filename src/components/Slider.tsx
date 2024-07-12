interface Props {
  min: number
  max: number
  onChange: (value: number) => void
  value: number
  className?: string
}

export function Slider ({ min, max, onChange, value, className }: Props) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value) / 100)
  }

  return (
    <input value={value} onChange={ handleChange } id="labels-range-inut" type="range" min={min} max={max} className={`w-full h-2  rounded-lg appearance-none cursor-pointer dark:bg-gray-700 ${className}`} />
  )
}