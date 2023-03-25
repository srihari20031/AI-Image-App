import express, { response } from "express";
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi} from 'openai';


const router = express.Router();
dotenv.config().parsed;

const OPENAI_API_KEY = "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";
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


router.route('/').get((req,res) => {
    res.send('Hello from DALL-E');
})

router.route('/').post(async (req,res) => {
    try{
        const { prompt } = req.body;

        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        });
        const image = aiResponse.data.data[0].b64_json;

         res.status(200).json({ photo: image });
    }
        catch(error){
            console.log(error);
            res.status(500).send(error?.response.data.error.message || 'something went wrong')
             
        }
    })

export default router;