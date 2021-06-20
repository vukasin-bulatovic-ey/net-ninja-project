import React from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";

function Home() {
	const {
		data: blogs,
		isLodaing,
		error,
	} = useFetch("http://localhost:8000/blogs");

	return (
		<div className="home">
			{error && <div>{error}</div>}
			{isLodaing && <div>Loading ...</div>}
			{blogs && <BlogList blogs={blogs} title="All blogs" />}
		</div>
	);
}

export default Home;
