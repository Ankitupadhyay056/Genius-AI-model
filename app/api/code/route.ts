import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Increase_Api_Limit , Check_Api_Limit } from "@/lib/api-limit";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { checkSubscription } from "@/lib/subscription";
const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,

})

const openai = new OpenAIApi(configuration);

const instructionMessage : ChatCompletionRequestMessage = {
    role:"system",
    content :"you are a code generator. You must answer only in markdown code snippets. Use code comments for explanation."
}

export async function POST( req:Request)
{
    try {
        
        const {userId} = auth();
        const body = await req.json();
        const {messages} = body;

        if(!userId)
        {
            return new NextResponse("Unauthorised",{status:401});
        }

        if(!configuration.apiKey){
            return new NextResponse("OpenAI API key not configured",{status:500})
        }

        if(!messages)
        {
            return new NextResponse("messages are required",{status:400});
        }
        const freeTrial = await Check_Api_Limit();
        const isPro = checkSubscription();
        if(!freeTrial && !isPro)
        {
            return new NextResponse("Free trail has expired",{status:403})
        }


        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages : [instructionMessage,...messages]
        });

        if(!isPro)
        {
            await Increase_Api_Limit();
        }
           
        return NextResponse.json(response.data.choices[0].message);

    } catch (error) {
         console.log("[Code ERROR]",error)
         return new NextResponse("Internal error",{status:500})
    }
}