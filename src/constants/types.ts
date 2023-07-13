type Part = {
  title: string,
  time: number,
  color: string | null,
}

type Timer = {
  id: number,
  title: string,
  parts: Array<Part>,
  breakDuration: number | null,
  loopsQuantity: number | null,
}