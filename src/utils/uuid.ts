export const uuid = (): string => {
  return Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 256).toString(16),
  ).join('')
}
