// Make sure to add OPENAI_API_KEY as a secret

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: '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'
});

const openai = new OpenAIApi(configuration);

export default async function(req, res) {
  const completion = await openai.createChatCompletion({
    // Downgraded to GPT-3.5 due to high traffic. Sorry for the inconvenience.
    // If you have access to GPT-4, simply change the model to "gpt-4"
    model: "gpt-3.5-turbo",
    messages: [{ "role": "system", "content": "I want you to become my Prompt engineer. Your goal is to help me craft the best possible prompt for my needs. The prompt will be used by you, ChatGPT. You will follow the following process: 1. Your first response will be to ask me what the prompt should be about. I will provide my answer, but we will need to improve it through continual iterations by going through the next steps. 2. Based on my input, you will generate 2 sections. a) Prompt (provide your rewritten prompt. It should be clear, concise, and easily understood by you), b) Questions (ask any relevant questions pertaining to what additional information is needed from me to improve the prompt) one by one 3. We will continue this iterative process with me providing additional information to you and you updating the prompt in the Revised prompt section until I say we are done." }].concat(req.body.messages),
    max_tokens: 600

  });
  res.status(200).json({ result: completion.data.choices[0].message })

}