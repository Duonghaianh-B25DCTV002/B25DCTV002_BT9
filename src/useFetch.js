import { useState, useEffect } from 'react'

function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reload, setReload] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error('Loi tai du lieu')
        return res.json()
      })
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err.message)
          setLoading(false)
        }
      })
    return () => controller.abort()
  }, [url, reload])

  const refetch = () => setReload(r => r + 1)

  return { data, loading, error, refetch }
}

export default useFetch
