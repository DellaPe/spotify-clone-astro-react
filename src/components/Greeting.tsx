export function Greeting () {
  let text = ""

  const currentHour = new Date().getHours()

  if (currentHour < 12) {
    text = "Buenos días!!"
  } else if (currentHour < 18) {
    text = "Buenas tardes!!"
  } else {
    text = "Buenas noches!!"
  }

  return <h1 className="text-4xl p-4">{text}</h1>
}