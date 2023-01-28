import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv"
dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.CODE_ASSIST,
});
const openai = new OpenAIApi(configuration);

const codingAssist = async (req,res)=>{

    console.log(req.body.code)

    try {
        
  const { code } = req.body; // get the code from  the request body

  const response = await openai.createCompletion({
    model: "code-davinci-002",
    prompt: code,
    max_tokens: 7,
    temperature: 0,
  });

  console.log(response)

 res.status(200).send(response.choices[0].text)

    } catch (error) {
         console.log(error)
    }

}


export {codingAssist}