'use client';

import React from "react";
import { CircleUserRound } from "lucide-react"; // For Lucide
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useKeycloak } from "@/keycloak";
import { useRouter } from "next/navigation";

export default function UserDropdown() {
    const { isAuthenticated, user, keycloak } = useKeycloak(); // Access Keycloak context
    const router = useRouter(); // Next.js router for navigation

    const handleLogout = () => {
        console.log("User logged out");
        keycloak.logout();
    };

    const handleViewProfile = () => {
        router.push("/profile"); // Navigate to profile page
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <CircleUserRound className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {isAuthenticated && user ? (
                    <>
                        <DropdownMenuItem disabled>
                            <span className="font-medium">{user.preferred_username || "User"}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleViewProfile}>
                            View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                            Logout
                        </DropdownMenuItem>
                    </>
                ) : (
                    <DropdownMenuItem disabled>
                        <span className="font-medium">Not Logged In</span>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
