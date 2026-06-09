"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const route = useRouter();

  useEffect(() => {
    route.replace("/auth/login");
  }, [route]);

  return null;
};

export default Page;
