import { useState, useEffect } from "react";
const useFetch = (url) => {
	const [data, setData] = useState(null);
	const [isLodaing, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	// "http://localhost:8000/blogs";
	useEffect(() => {
		const abortCont = new AbortController();
		setTimeout(() => {
			fetch(url, { signal: abortCont.signal })
				.then((res) => {
					if (!res.ok) {
						throw Error("could not fetch the data for that resource"); //uvati error u catch
					}
					return res.json();
				})
				.then((data) => {
					setData(data);
					setIsLoading(false);
					setError(null);
				})
				.catch((e) => {
					if (e.name === "AbortError") {
						console.log("fetch aborted");
					} else {
						setIsLoading(false);
						setError(e.message);
					}
				});
		}, 1000);
		return () => abortCont.abort();
	}, [url]);
	return { data, isLodaing, error };
};

export default useFetch;
