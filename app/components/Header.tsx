'use client';

import React from "react";
import { CircleUserRound  } from 'lucide-react'; // For Lucide
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import keycloak from "@/keycloak";

export default function UserDropdown() {
    const handleLogout = () => {
        console.log("User logged out");
        keycloak.logout();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <CircleUserRound className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem disabled>
                    <span className="font-medium">Username</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
