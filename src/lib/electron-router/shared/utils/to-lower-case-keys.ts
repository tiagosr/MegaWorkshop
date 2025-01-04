export function toLowerCaseKeys<T extends Record<string, any>>(obj: T): T {
  return Object.keys(obj).reduce((acc, key) => {
    return { ...acc, [key.toLowerCase()]: obj[key] }
  }, {} as T)
}