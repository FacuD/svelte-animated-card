export const transformInPascalCamelCase = (word) =>
  word.replace(/\w+/g, function (w) {
    return w[0].toUpperCase() + w.slice(1).toLowerCase()
  })
