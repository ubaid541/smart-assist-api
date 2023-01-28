import  express from "express";
import * as dotenv from "dotenv"
import cors from "cors"
import { Configuration,OpenAIApi } from "openai";
import {generateImage} from "./controller/ImageGenController.js"
import { codingAssist } from "./controller/CodingAssisController.js";
import { summaryAssist } from "./controller/SummaryController.js";

dotenv.config()

const configuration =  new Configuration({
    apiKey: process.env.OPENAI_API  //API from OPENAI's  official website
})

const openai = new OpenAIApi(configuration)

const app = express()
app.use(cors())
app.use(express.json())

app.get('/',async (req,res)=>{
    res.status(200).send({
        message :"Hello from AI HUB"
    })
})

app.post('/',async(req,res)=>{
    try {
        const prompt = req.body.prompt

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0, // Higher values means the model will take more risks.
            max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
            top_p: 1, // alternative to sampling with temperature, called nucleus sampling
            frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.(Donot repeat similar sentences)
            presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
        })

        res.status(200).send({
            bot:response.data.choices[0].text
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({error})
    }
})

// AI Image generator
app.post('/generateImage',generateImage)

// coding assist
// app.post('/codingassist',codingAssist)

// summary generator
app.post('/summarize',summaryAssist)


app.listen(9000,()=> console.log("Server is running on port 9000"))