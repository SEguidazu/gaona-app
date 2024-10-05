"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

import {
  NavigationMenu as NavigationMenuUi,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";

interface NavigationMenuProps {
  isSession?: boolean;
}

function NavigationMenu({ isSession = false }: NavigationMenuProps) {
  return (
    <NavigationMenuUi>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Página principal
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/admin" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Panel administrador
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {isSession ? (
          <Button onClick={() => signOut()}>Cerrar sesión</Button>
        ) : (
          <>
            <NavigationMenuItem>
              <Link href="/auth/register" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Página de registro
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/auth/login" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Iniciar sesión
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenuUi>
  );
}

export default NavigationMenu;
