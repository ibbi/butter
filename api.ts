export default async (question, complexity) => {
	const res = await fetch(
		"https://s9w6fti4ma.execute-api.us-east-1.amazonaws.com/default/dig",
		{
			method: "POST",
			body: JSON.stringify({ question, complexity }),
			headers: {
				"Content-Type": "application/json",
			},
		},
	);
	return res;
};
