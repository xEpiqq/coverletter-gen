import { sys } from "typescript";

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
    title,
    location,
    description,
    company,
    cv_pdf,
    creativityLevel = "",
  } = body;

  var cv_text = "";

  console.log("cv_pdf", jobTitle);

  try {
    const model = "gpt-3.5-turbo";

    const prompt = `I am applying for the position of ${title} at ${location} for the company ${company}. I have attached my CV and cover letter for your consideration. I am a highly motivated and enthusiastic individual who is passionate about ${description}. I have a strong background in ${cv_text}. I am a ${creativityLevel}. Please create a cover letter for me.`;

    //return new Response(JSON.stringify({data: prompt}));

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
