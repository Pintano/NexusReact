import { useEffect, useState } from "react";

export function useFetch(fetchFunction) { // ❌ sin deps dinámicas
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchFunction()
      .then(res => {
        if (isMounted) {
          setData(res);
          setError(null);
        }
      })
      .catch(err => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [fetchFunction]); 

  return { data, loading, error };
}
