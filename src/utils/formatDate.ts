export const formatDate = (date: string): string => {
  const newDate = new Date(date)
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()
  const year = newDate.getFullYear()
  return `${prefixZero(month)}/${prefixZero(day)}/${year}`
}

export const prefixZero = (int: number): string => {
  return int < 10 ? `0${int}` : `${int}`
}
