"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header.component";
import { Social } from "@/components/auth/social.component";
import { BackButton } from "@/components/auth/back-button.component";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel, 
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[310px] shadow-md md:w-[450px] lg:w-[600px] xl:w-[700px]">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
            <Social/>
        </CardFooter>
      )}
      <CardFooter>
            <BackButton
                label={backButtonLabel}
                href={backButtonHref}/>
        </CardFooter>
    </Card>
  );
};
