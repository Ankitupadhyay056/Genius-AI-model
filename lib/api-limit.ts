import {auth  } from "@clerk/nextjs";

import prismadb from "./prismadb";
import { MAX_FREE_CALLS } from "@/constants";

export const Increase_Api_Limit = async () =>{
    const {userId} = auth();

    if(!userId)
    {
        return ;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where:{
              userId
        }
    });

    if(userApiLimit)
    {
        await prismadb.userApiLimit.update({
            where:{userId:userId},
            data:{count: userApiLimit.count + 1}
        });
    }
    else{
            await prismadb.userApiLimit.create({
                data : {userId :userId,count:1}
            });
    }
};

export const Check_Api_Limit = async () =>{
    const {userId} = auth();

    if(!userId)
    {
        return ;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where:{userId:userId}
    });

    if(!userApiLimit || userApiLimit.count < MAX_FREE_CALLS)
    {
        return true;
    }else{
        return false;
    }
}

export const Get_Api_Limit_Count = async ()=>{
    const {userId} = auth();

    if(!userId)
    {
        return 0;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where:{userId:userId}
    })

    if(!userApiLimit){
        return 0;
    }

    return userApiLimit.count;
}
