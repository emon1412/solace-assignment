import { tagColors } from "./constants"

export const getColorForSpecialty = (specialty: string) => {
  let hash = 0
  for (let i = 0; i < specialty.length; i++) {
    hash = specialty.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % tagColors.length
  return tagColors[index]
}

export const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phoneNumber
}