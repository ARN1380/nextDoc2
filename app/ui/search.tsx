"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Search({ placeholder }: { placeholder: string }) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const searchHandler = (inputValue: string) => {
    setSearchTerm(inputValue);
    const params = new URLSearchParams(searchParams);
    console.log(params);
    if (inputValue) {
      params.set("query", inputValue);
    } else {
      params.delete("query");
    }    

    if (pathname === "/dashboard/invoices") {
      // router.replace("?query=" + inputValue);
      router.replace(`${pathname}?${params.toString()}`);

    }
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => {
          searchHandler(e.target.value);
        }}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
