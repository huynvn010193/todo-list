import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddTool } from "@/app/queries/use-manager";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Tool } from "@/constants/type";

export interface IFormToolUpdateProps {
  id: string;
  title: string;
  description: string;
  url: string;
}

export const validateFormAddTool = z
  .object({
    title: z.string().trim().min(2).max(256).optional(),
    description: z.string().optional(),
    url: z.string().optional(),
  })
  .strict();

export default function FormToolUpdate({
  id,
  title,
  description,
  url,
}: IFormToolUpdateProps) {
  const form = useForm<Partial<Tool>>({
    resolver: zodResolver(validateFormAddTool),
    defaultValues: {
      title,
      description,
      url,
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
    <div>
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
                    <Textarea id="description" className="w-full" {...field} />
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
  );
}
