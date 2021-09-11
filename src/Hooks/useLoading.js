import React, { useState, useCallback } from 'react'

export function useLoading(initialValue) {
  const [loading, setLoading] = useState(initialValue || true)
  const toggleLoading = useCallback((value) => setLoading(value))
  
  return [loading, toggleLoading]
}