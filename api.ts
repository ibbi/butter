import { Configuration, OpenAIApi } from "openai";

import keys from "~keys.json";

const configuration = new Configuration({
	apiKey: keys.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async (question) => {
	let prompt = `Elaborate further on ${question}.`;
	const res = await openai.createCompletion({
		model: "text-davinci-003",
		prompt,
		temperature: 0.7,
		max_tokens: 256,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
	});
	return res;
};
