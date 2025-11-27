"use client";

import { useTools, useAddTool } from "@/app/queries/use-manager";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { Tool } from "@/constants/type";
import z from "zod";
import { useForm } from "react-hook-form";
import { FormField, FormItem, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FormToolUpdate from "./form-update";

export const validateFormAddTool = z
  .object({
    title: z.string().trim().min(2).max(256).optional(),
    description: z.string().optional(),
    url: z.string().optional(),
  })
  .strict();

export default function FormToolkList() {
  const { data: tools, isLoading } = useTools();
  const form = useForm<Partial<Tool>>({
    resolver: zodResolver(validateFormAddTool),
    defaultValues: {
      title: "",
      description: "",
      url: "",
    },
  });

  const addTool = useAddTool();

  const reset = () => {
    form.reset();
  };

  const onSubmit = (data: Partial<Tool>) => {
    console.log("Submit data:", data);

    addTool.mutateAsync(data, {
      onSuccess: () => {
        console.log("Tool added successfully!");
        form.reset();
      },
      onError: (error) => {
        console.error("Error adding tool:", error);
      },
    });
  };

  return (
    <div className="mt-3">
      <div className="my-6">
        <Form {...form}>
          <form
            noValidate
            className="grid auto-rows-max items-start gap-4 md:gap-8"
            id="add-tool-form"
            onReset={reset}
            onSubmit={form.handleSubmit(onSubmit, (e) => {
              console.log(e);
            })}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                    <div className="col-span-3 w-full space-y-2">
                      <Input id="title" className="w-full" {...field} />
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                    <div className="col-span-3 w-full space-y-2">
                      <Textarea
                        id="description"
                        className="w-full"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                    <div className="col-span-3 w-full space-y-2">
                      <Input id="url" className="w-full" {...field} />
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </form>
          <Button
            type="submit"
            className="mt-3"
            form="add-tool-form"
            variant={"default"}
          >
            Thêm
          </Button>
        </Form>
      </div>
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
            <Button variant="outline" size="sm" className="mt-2">
              Update
            </Button>
            <FormToolUpdate
              id={item.id!}
              title={item.title!}
              description={item.description!}
              url={item.url!}
            />
          </div>
        ))}
    </div>
  );
}
