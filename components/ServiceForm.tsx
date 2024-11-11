"use client";

import { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const ServiceForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch: formData.get("pitch") as string,
      };

      // await formSchema.parseAsync(formValues);

      console.log("Attempting to validate:", formValues);

      const validatedData = await formSchema.parseAsync(formValues);
      console.log("Validation passed:", validatedData);

      const result = await createPitch(prevState, formData);

      if (result.status == "SUCCESS") {
        console.log("SERVICE CREATED", result);
        console.log("Redirecting to /service/" + result.id);
        toast({
          title: "Success",
          description: "Your service has been successfully created",
        });
        router.push(`/service/${result._id}`);
      }

      return result;
    } catch (error) {
      console.log("Validation or submission error:", error);

      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        console.log("Field errors:", fieldErrors);

        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Validation Error",
          description: "Please check the image URL and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation Failed", status: "ERROR" };
      }
      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Service Title"
        />

        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Service Description"
        />

        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Service Category (Home, Auto, Tech, Lawn & Garden...)"
        />

        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="https://example.com/image.jpg"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Please enter a direct image URL ending in .jpg, .jpeg, .png, .gif,
          .webp, or from image hosting services like Unsplash, Imgur, or
          Cloudinary
        </p>

        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <div>
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>

        <Textarea
          id="pitch"
          name="pitch"
          className="startup-form_textarea h-32"
          required
          placeholder="Briefly describe your services and how you can help others"
        />

        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button type="submit" className="startup-form_btn" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Your Service"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default ServiceForm;
