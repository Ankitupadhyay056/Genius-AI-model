import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Increase_Api_Limit , Check_Api_Limit } from "@/lib/api-limit";
import { Configuration, OpenAIApi } from "openai";
import { checkSubscription } from "@/lib/subscription";

const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,

})

const openai = new OpenAIApi(configuration);

export async function POST( req:Request)
{
    try {
        
        const {userId} = auth();
        const body = await req.json();
        const {prompt,amount = 1, resolution = "512x512"} = body;

        if(!userId)
        {
            return new NextResponse("Unauthorised",{status:401});
        }

        if(!configuration.apiKey){
            return new NextResponse("OpenAI API key not configured",{status:500})
        }

        if(!prompt)
        {
            return new NextResponse("Prompt are required",{status:400});
        }
        if(!amount)
        {
            return new NextResponse("amount are required",{status:400});
        }
        if(!resolution)
        {
            return new NextResponse("resolution are required",{status:400});
        }
        const freeTrial = await Check_Api_Limit();
        const isPro = checkSubscription();

        if(!freeTrial && !isPro)
        {
            return new NextResponse("Free trail has expired",{status:403})
        }


        const response = await openai.createImage({
           prompt,
           n:parseInt(amount,10),
           size: resolution
        });

        if(!isPro)
        {
            await Increase_Api_Limit();
        }
           
        return NextResponse.json(response.data.data);

    } catch (error) {
         console.log("[IMAGE ERROR]",error)
         return new NextResponse("Internal error",{status:500})
    }
}