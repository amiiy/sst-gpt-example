import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { Configuration, OpenAIApi } from "openai";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  console.log(`running ...`);

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `I want you to act as a storyteller. You will come up with entertaining stories that are engaging, imaginative and captivating for the audience. It can be fairy tales, educational stories or any other type of stories which has the potential to capture people's attention and imagination. Depending on the target audience, you may choose specific themes or topics for your storytelling session e.g., if it’s children then you can talk about animals; If it’s adults then history-based tales might engage them better etc. My first request is "I need an interesting story on perseverance."`,
      temperature: 0,
      max_tokens: 700,
    });
    console.log(response);

    return { tatusCode: 200, body: response.data };
  } catch (e) {
    console.log(e);
    return { tatusCode: 500, body: e };
  }
};
