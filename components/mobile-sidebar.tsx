"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./sidebar";
import {useState , useEffect} from "react";

interface MobileSideBarProps{
  apiLimitCount:number;
  isPro:boolean
}

const MobileSideBar = ({apiLimitCount = 0,isPro=false} :MobileSideBarProps) =>{

    const [isMounted,setIsMounted] = useState(false);

    useEffect(()=>{
  
        setIsMounted(true);

    },[]);

    if(!isMounted)
    {
        return null
    }

    return (
       <Sheet>
         <SheetTrigger>
           <Button variant="ghost" size="icon" className="md:hidden">
             <Menu/>
           </Button>
         </SheetTrigger>

         <SheetContent side="left" className="p-0">
              <Sidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
         </SheetContent>
       </Sheet>
    )
}
export default MobileSideBar;