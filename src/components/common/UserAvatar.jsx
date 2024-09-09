"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { startTransition } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ClipLoader from "react-spinners/ClipLoader";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function UserAvatar() {
  const user = useCurrentUser();
  const [showLoader, setShowLoader] = React.useState(false);
  if (!user) return null;

  const handleSignOut = () => {
    startTransition(() => {
      setShowLoader(true);
      signOut({
        callbackUrl: "/",
      }).finally(() => {
        setShowLoader(false);
      });
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer border">
          <AvatarImage src={user?.image} />
          <AvatarFallback className="font-medium text-black">
            {user?.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-black" asChild>
          <div className="flex flex-col">
            <h3>{user?.name}</h3>
            <p className="text-gray-500 font-normal">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          asChild
          className="cursor-pointer"
        >
          <div className="flex items-center">
            {showLoader ? (
              <ClipLoader
                color="black"
                size={17}
                aria-label="Loading Spinner"
              />
            ) : (
              <LogOut size={17} />
            )}
            <p className="pl-3">Logout</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
