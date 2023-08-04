/* eslint-disable linebreak-style */
import { useState, useEffect } from 'react';

const useFetch = function (url) {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((dado) => {
        setIsPending(false);
        setData(dado);
        setError(null);
      })
      .catch((err) => {
        // auto catches network / connection error
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;