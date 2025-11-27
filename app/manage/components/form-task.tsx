"use client";

import { useTools } from "@/app/queries/use-manager";
import { Loader } from "lucide-react";

export default function FormTask() {
  const { data: tools, isLoading } = useTools();

  return (
    <div className="mt-3">
      {isLoading && (
        <div className="flex justify-center items-center w-full min-h-screen">
          <Loader className="animate-spin" />{" "}
        </div>
      )}
      {tools &&
        tools.map((item, idx) => (
          <div key={idx} className="mb-4 p-4 border rounded">
            <div>{item.title}</div>
            <div>{item.description}</div>
            <div>{item.url}</div>
          </div>
        ))}
    </div>
  );
}
