"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  label: string;
  href: string;
}

export const BackButton = ({ href, label }:BackButtonProps) => {
  return (
    // TODO: este boton tenia un atributo normal como asChild
    <Button
      variant={"link"}
      className="font-normal w-full"
      size={"sm"}
      asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
