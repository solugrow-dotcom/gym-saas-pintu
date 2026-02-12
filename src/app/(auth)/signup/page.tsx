"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
    // Reusing the same flow as login for now since it's magic link/OTP
    // In a real app we might ask for more details upfront
    // But for this MVP, signup = login with new email
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        Join Gym Manager to start managing your gym.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center p-4">
                        <p className="mb-4">We use passwordless login. Please use the Login page to sign up or sign in.</p>
                        <Button asChild className="w-full">
                            <Link href="/login">Go to Login</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
