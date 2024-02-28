import React, { useEffect, useState } from 'react';


const useFetch = (url:string) => {
    const [data, setData] = useState([]);
    const [isloading, setLoading] = useState(false);
    const [iserror, setError] = useState();

    useEffect(() => {
        const fetchData = async (url: string) => {
            try {
                setLoading(true);
                const respose = await fetch(url);
                const result = await respose.json();
                //@ts-ignore
                if (respose.status(200)) {
                    setData(result);
                    setLoading(false);
                }
            }
            catch (err) {
                //@ts-ignore
                setError(err);
            }
        }
        fetchData(url);
    }, [url]);
    
    return { data, isloading, iserror };
    
}

export default useFetch;