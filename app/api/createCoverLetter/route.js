const { Configuration, OpenAIApi } = require("openai");

// Create a new configuration object with your API key\
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
  baseUrl: "https://api.openai.com/v1/chat/completions/",
});
const openai = new OpenAIApi(configuration);

export async function POST(request) {
  console.log("createCoverLetter called");

  const { body } = request;
  const {
    jobTitle,
    jobCompany,
    jobLocation,
    jobDescription,
    additionalInstructions,
    resumePdf,
    creativityMeter,
  } = body;

  try {
    const model = "gpt-3.5-turbo";

    const prompt = `I am applying for the position of ${jobTitle} at ${jobCompany} in ${jobLocation}. I am excited to work with you and your team. ${additionalInstructions}`;

    const completion = await openai.createChatCompletion({
      model: model,
      messages: [{ role: "system", content: prompt }],
    });

    if (completion.data.choices[0].text == "undefined") {
      return new Response(JSON.stringify({ data: "undefined" }));
    }
    return new Response(
      JSON.stringify({ data: completion.data.choices[0].message.content })
    );
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}
