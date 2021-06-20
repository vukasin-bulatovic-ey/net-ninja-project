import React from "react";
import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";

function BlogDetails() {
	const history = useHistory();
	const { id } = useParams();
	const {
		data: blog,
		error,
		isLodaing,
	} = useFetch(`http://localhost:8000/blogs/${id}`);

	const handleClick = () => {
		fetch(`http://localhost:8000/blogs/${blog.id}`, {
			method: "DELETE",
		}).then(() => {
			history.push("/");
		});
	};
	return (
		<div className="blog-details">
			{isLodaing && <div>Loading...</div>}
			{error && <div>{error}</div>}
			{blog && (
				<article>
					<h2>{blog.title}</h2>
					<p>{blog.author}</p>
					<div>{blog.body}</div>
					<button onClick={handleClick}>delete</button>
				</article>
			)}
		</div>
	);
}

export default BlogDetails;
