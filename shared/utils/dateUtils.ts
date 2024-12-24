export const formatDate = (value: string) => {
  const date = new Date(value)
  return date.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export const parseDate = (value: Date) => {
  return value.toISOString().split('T')[0]
}

export const parseDateToStringDate = (value: Date | null) => {
  return value?.toISOString().split('T')[0]
}

export const formatFullDate = (value: Date | null) => {
  return value
    ? new Date(value).toLocaleDateString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : null
}

export const calculateAge = (date: Date | undefined | null): number => {
  return date ? Math.floor((new Date().getTime() - date.getTime()) / 3.15576e+10) : 0
}

export type DateRange = {
  [key: number]: Date
}

export type ValidationResult = {
  valid: boolean
  message: string
}

export const joinDateAndTime = (fecha: Date | null | undefined, hora: Date | null | undefined): Date => {
  const fechaString = fecha?.toISOString().split('T')[0]
  const horaString = hora?.toISOString().split('T')[1]
  return new Date(`${fechaString}T${horaString}`)
}
