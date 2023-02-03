import { Configuration, OpenAIApi } from "openai";

import keys from "~keys.json";

const configuration = new Configuration({
	apiKey: keys.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async (question, complexity) => {
	const complexityMap = {
		Simple: "in very simple terms which a 5 year old would understand.",
		Regular: "in a couple of sentences.",
		Detailed: "in detail, like you are explaining it to an expert.",
	};

	let prompt = `Elaborate further on \"${question}\" ${complexityMap[complexity]}`;
	const res = await openai.createCompletion({
		model: "text-davinci-003",
		prompt,
		temperature: 0.7,
		max_tokens: complexity === "Detailed" ? 1024 : 256,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
	});
	return res;
};
