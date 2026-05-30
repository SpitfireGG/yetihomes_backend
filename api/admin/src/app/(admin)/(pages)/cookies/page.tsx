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
import { useGetCompanyCookies } from "@/hooks/useTankstack-query";
import { Spinner } from "@/components/ui/spiner";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = () => {
    const { data, isLoading } = useGetCompanyCookies();
    if (isLoading) {
        return <Spinner />;
    }

    const cookiesData = data?.data;

    return (
        <div className="space-y-4">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Cookies Policy</h1>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Link href={cookiesData ? '#' : "/cookies/create"}>
                        <Button disabled={!!cookiesData} className="">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Sections
                        </Button>
                    </Link>
                </div>
            </div>
            <Card className="w-full max-w-sm rounded-2xl">

                <CardHeader>
                    <CardTitle>{cookiesData?.title ?? "—"}</CardTitle>

                    <CardDescription hidden>
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
                                    <Link href={cookiesData ? `/cookies/edit` : '#'} className="flex w-full">
                                        Edit
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardAction>
                </CardHeader>

                <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {cookiesData?.content ?? "No content"}
                    </p>
                </CardContent>
            </Card>
        </div>

    );
};

export default Page;
