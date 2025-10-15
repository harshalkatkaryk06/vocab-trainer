import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const Gen_Quizes  = async(req,res)=>{
    //code to create 3 incorrect options and 1 correct option
    const {word} = req.body;

    if(!word){
        return res.send(400).json({error: "Word is required"});
    }

    try {
        const prompt = `Provide the meaning of the word "${word}" and use it in a sentence. Format the response clearly with meaning and example sentence.`;
    } catch (error) {
        
    }
}