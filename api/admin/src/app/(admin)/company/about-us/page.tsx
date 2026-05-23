"use client";

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus } from "lucide-react";
import { useGetCompanyAboutUsData } from "@/hooks/useTankstack-query";
import { Spinner } from "@/components/ui/spiner";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = () => {
    const { data, isLoading } = useGetCompanyAboutUsData();

    if (isLoading) {
        return <Spinner />;
    }

    const aboutUsData = data?.data?.[0] as any;

    if (!aboutUsData) {
        return null;
    }

    const translation = aboutUsData.translations?.[0];

    return (
        <div className="space-y-4">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">About Section</h1>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Link href={`${aboutUsData === null ? "/company/about-us/create" : '#'}`}>
                        <Button disabled={aboutUsData === null} className="">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Sections
                        </Button>
                    </Link>
                </div>
            </div>
            <Card className="w-full max-w-sm rounded-2xl">

                <CardHeader>
                    <CardTitle>{translation?.title ?? "—"}</CardTitle>

                    <CardDescription hidden>
                        {/* optional description */}
                    </CardDescription>

                    <CardAction>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="p-4">
                                <MoreHorizontal className="h-4 w-4" />
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href={`/company/about-us/edit`} className="flex w-full">
                                        Edit
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={`/company/about-us/content`} className="flex w-full">
                                        Add Languages
                                    </Link>
                                </DropdownMenuItem>
                                {/* future actions here */}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardAction>
                </CardHeader>

                <CardContent>
                    {/* content goes here */}
                </CardContent>
            </Card>
        </div>

    );
};

export default Page;
