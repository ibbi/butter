export default async (question, complexity) => {
	const res = await fetch(
		"https://2rr8gjehj5.execute-api.us-east-1.amazonaws.com/default/dig",
		{
			method: "POST",
			body: JSON.stringify({ question, complexity }),
			headers: {
				"Content-Type": "text/plain",
			},
		},
	);
	return res;
};
