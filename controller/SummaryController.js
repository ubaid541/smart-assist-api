import { Configuration, OpenAIApi } from "openai";
import request from 'request'
import * as dotenv from "dotenv"
dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.SUMMARY_ASSIST,
  });
  const openai = new OpenAIApi(configuration)

const summaryAssist = async (req,res)=>{

    let text
    if (req.body.url) {
        // Fetch the text from the URL  
                text = req.body.url
    } else {
        // Use the text provided in the request
        text = req.body.text
      
    }



        try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `summarize: "${text}", also highlight important keywords and summarize headings as well`,
                temperature: 0, 
                max_tokens: 3000, 
                top_p: 1,
                frequency_penalty: 0.5, 
                presence_penalty: 0, 
            });
    
            const summary = response.data.choices[0].text;

            // if (options.highlightKeywords) {
            //     const keywordsRes = await openai.createCompletion({
            //         model: "text-davinci-002",
            //         prompt: `keywords: "${text}"`,
            //         temperature: 0, 
            //         max_tokens: 100, 
            //         top_p: 1,
            //         frequency_penalty: 0.5, 
            //         presence_penalty: 0, 
            //     });
            //     const keywords = keywordsRes.data.choices[0].text;
            //     summary += '\n\nKeywords: ' + keywords;
            // }
    
            // if (options.summarizeHeadings) {
            //     // Code to summarize headings goes here
            //     summary += '\n\nHeadings Summary: ' + headingsSummary;
            // }
    
            res.status(200).send({summary});
        } catch (error) {
            res.status(500).send({ error: "OpenAI API Error" });
        }

    
}

export {summaryAssist}