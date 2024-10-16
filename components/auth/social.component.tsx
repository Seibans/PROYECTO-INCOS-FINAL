"use client";

import {signIn} from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github" | "facebook") => {
    signIn(provider,{
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } 

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={()=>onClick("google")}>
        <FcGoogle className="h-5 w-5 mr-2"/>
      </Button>
      <Button
        size={"lg"} 
        className="w-full"
        variant={"outline"}
        onClick={()=>onClick("facebook")}>
        <FaFacebook className="h-5 w-5 mr-2 text-blue-600"/>
      </Button>
    </div>
  );
};