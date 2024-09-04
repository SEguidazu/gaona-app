"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

function SignOutButton() {
  return <Button onClick={() => signOut()}>Cerrar sesión</Button>;
}

export default SignOutButton;
