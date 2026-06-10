export const getErrorMessage = (error, fallback = 'An unexpected error occurred.') => {
  if (error.response?.data) {
    const data = error.response.data

    // If it's a string, return it
    if (typeof data === 'string') {
      return data
    }

    // If it's an object, try to extract field errors
    if (typeof data === 'object') {
      // Handle Django-style validation errors: { field: ["error"] }
      const messages = Object.entries(data)
        .map(([field, errorList]) => {
          const fieldName = field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ')
          const errors = Array.isArray(errorList) ? errorList.join(' ') : errorList
          return `${fieldName}: ${errors}`
        })
        .join(' | ')

      if (messages) {
        return messages
      }
    }
  }

  return error.message || fallback
}
