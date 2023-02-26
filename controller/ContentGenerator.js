import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.CONTENT_GENERATOR,
});
const openai = new OpenAIApi(configuration);

const contentGenerator = async (req, res) => {
  const { type, topic, length, tone, audience, keywords, references } =  req.body;

  const promptParts = [`Write a ${type} about ${topic}.`];

  if (length) {
    promptParts.push(
      `The content should be approximately ${length} words long.`
    );
  }

  if (tone) {
    promptParts.push(`The tone should be ${tone}.`);
  }

  if (audience) {
    promptParts.push(`The target audience is ${audience}.`);
  }

  if (keywords && keywords.length > 0) {
    promptParts.push(
      `Please include the following keywords: ${keywords}.`
    );
  }

  if (references && references.length > 0) {
    promptParts.push(
      `Additionally, please reference the following sources: ${references}.`
    );
  }

  const prompt = promptParts.join(" ");

  console.log(prompt);

  console.log(req.body);

  try {
    // const prompt = `Write a ${type} about ${topic}.`;
    // const prompt = `Write a ${type} about ${topic}. The content should be approximately ${length} words long and should have a ${tone} tone, targeted towards a ${audience} audience. Please include the following keywords: ${keywords}. Additionally, please reference the following sources: ${references}.`;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 4000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    const content = response.data.choices[0].text;

    res.status(200).send({ content });
  } catch (error) {
    res.status(500).send({ error: "OpenAI API Error" });
  }
};

export { contentGenerator };
