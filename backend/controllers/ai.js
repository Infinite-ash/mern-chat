import { GoogleGenerativeAI } from "@google/generative-ai";

export const  generateAIResponse= async (message) =>{
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    
    const result = await model.generateContent(message);
    return result.response.text();
}

