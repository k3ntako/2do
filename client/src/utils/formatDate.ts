export const formatDate = (date: string): string => {
  const newDate = new Date(date)
  const month = newDate.getUTCMonth() + 1
  const day = newDate.getUTCDate()
  const year = newDate.getUTCFullYear()
  return `${prefixZero(month)}/${prefixZero(day)}/${year}`
}

export const prefixZero = (int: number): string => {
  return int < 10 ? `0${int}` : `${int}`
}
