"use client";
import { useEffect } from "react";
import {Crisp} from "crisp-sdk-web";

export const CrispChat = ()=>{
    useEffect(()=>{
      Crisp.configure("04dad54f-c789-4859-a051-0260da478591");
    },[]);

    return null;
}