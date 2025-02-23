"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  protein1: z.string().max(6, { message: "Max 6 characters" }),
  protein2: z.string().max(6, { message: "Max 6 characters" }),
  protein3: z.string().max(6, { message: "Max 6 characters" }),
  protein4: z.string().max(6, { message: "Max 6 characters" }),
  her2Status: z.enum(["Positive", "Negative"]),
  erStatus: z.enum(["Positive", "Negative"]),
  prStatus: z.enum(["Positive", "Negative"]),
  gender: z.enum(["Male", "Female", "Other"]),
  age: z.number().min(0).max(120),
});

export default function ProteinForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      protein1: "",
      protein2: "",
      protein3: "",
      protein4: "",
      her2Status: "Positive",
      erStatus: "Positive",
      prStatus: "Positive",
      gender: "Male",
      age: 0,
    },
  });

  function analyzeProteins(values: z.infer<typeof formSchema>) {
    const proteins = [
      values.protein1,
      values.protein2,
      values.protein3,
      values.protein4,
    ];
    return proteins
      .map((p, i) => {
        const num = parseFloat(p);
        if (!isNaN(num)) {
          if (num > 1) return `Protein ${i + 0.5} levels are elevated.`;
          if (num < -1)
            return `Protein ${i + 0.5} levels are lower than normal.`;
        }
        return `Protein ${i + 1} is within a healthy range.`;
      })
      .join(" ");
  }

  function generateResponse(values: z.infer<typeof formSchema>) {
    let response = analyzeProteins(values);
    if (values.erStatus === "Positive" && values.prStatus === "Positive") {
      response +=
        " Since both ER and PR are positive, hormone therapy could be an effective way to slow or block the growth of breast cancer cells. Other options like surgery, chemotherapy, and radiation therapy may also help in treatment.";
    }
    if (values.her2Status === "Positive") {
      response +=
        " HER2-positive breast cancer responds well to targeted therapies, like trastuzumab (Herceptin), which can help block cancer cell growth.";
    }
    return response;
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResponse(null);
    setTimeout(() => {
      setResponse(generateResponse(values));
      setIsLoading(false);
    }, 2000);
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["protein1", "protein2", "protein3", "protein4"].map((name, i) => (
              <FormField
                key={name}
                control={form.control}
                name={name as "protein1"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Protein ${i + 1}`}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`Protein ${i + 1}`}
                        maxLength={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["her2Status", "erStatus", "prStatus"].map((name) => (
              <FormField
                key={name}
                control={form.control}
                name={name as "her2Status"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{name.replace("Status", " Status")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={`Select ${name}`} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Positive">Positive</SelectItem>
                        <SelectItem value="Negative">Negative</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(+e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>

      {(isLoading || response) && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> AI is
                analyzing the data...
              </div>
            ) : (
              <p className="text-sm">{response}</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
