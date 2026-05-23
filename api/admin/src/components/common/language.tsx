"use client";
import { useLanguages } from "@/hooks/useTankstack-query";

export const useDefaultLanguage = () => {
    const { data: languages } = useLanguages();

    return languages?.data?.find(
        (l) => l.code.toLowerCase() === "en"
    );
};
