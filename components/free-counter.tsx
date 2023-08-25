"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "./ui/card"
import { MAX_FREE_CALLS } from "@/constants"
import { Progress } from "./ui/progress"
import { Button } from "./ui/button"
import { Zap } from "lucide-react"
import { useProModal } from "@/hooks/use-pro-modal"

interface freeCounterProps {
    apiLimitCount: number;
    ispro: boolean
}

export const FreeCounter = ({apiLimitCount = 0 , ispro=false} : freeCounterProps)=>{

    const [mounted,setMounted] = useState(false)
    const proModal = useProModal();

    useEffect (()=>{
        setMounted(true);

    },[])

    if(!mounted)
    {
        return null;
    }

    if(ispro)
    {
        return null;
    }

    return (
          <div className="px-3">
              <Card className="bg-white/10 border-0">
                    <CardContent className="py-6">
                         <div className="text-center text-sm text-white mb-4 space-y-2">
                            <p>
                                {apiLimitCount} / {MAX_FREE_CALLS} Free Generations
                               <Progress 
                                  className="h-3"
                                  value={(apiLimitCount/MAX_FREE_CALLS) * 100}
                               />
                            </p>
                         </div>
                         <Button onClick={proModal.onOpen} variant="premium" className="w-full">
                             Upgrade 
                             <Zap className="w-4 h-4 ml-2 fill-white"/>
                         </Button>
                    </CardContent>
              </Card>
          </div>
    )
}
