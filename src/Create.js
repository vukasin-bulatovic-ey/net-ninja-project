import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Create() {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [author, setAuthor] = useState("mario");
	const [isPending, setIsPending] = useState(false);
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		const blog = { title, body, author };
		console.log(JSON.stringify(blog));
		setIsPending(true);
		fetch("http://localhost:8000/blogs", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(blog),
		}).then(() => {
			console.log("new blog added");
			setIsPending(false);
			history.push("/");
		});
	};
	return (
		<div className="create">
			<form onSubmit={handleSubmit}>
				<label>Blog title</label>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					type="text"
					required
				/>
				<label>Blog body</label>
				<textarea
					value={body}
					onChange={(e) => setBody(e.target.value)}
					required
				></textarea>
				<label>Blog author</label>
				<select value={author} onChange={(e) => setAuthor(e.target.value)}>
					<option value="mario">mario</option>
					<option value="yoshi">yoshi</option>
				</select>
				{!isPending && <button>Add blog</button>}
				{isPending && <button disabled>Adding blog</button>}
			</form>
		</div>
	);
}

export default Create;
