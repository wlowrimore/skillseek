"use client";

import { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import CloudinaryUploader from "@/components/CloudinaryUploader";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";
import { form } from "sanity/structure";

const ServiceForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageUrl, setImageUrl] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();

  console.log("IMAGE URL:", imageUrl);

  const handleImageUpload = (url: string) => {
    console.log("Image uploaded:", url);
    setImageUrl(url);
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      console.log("FORM SUBMISSION STARTED!");
      console.log("CURRENT IMAGE URL:", imageUrl);

      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        image: imageUrl,
        pitch: formData.get("pitch") as string,
      };

      console.log("FORM VALUES PREPARED:", formValues);

      const validatedData = await formSchema.parseAsync(formValues);
      console.log("Validation passed:", validatedData);

      const submitFormData = new FormData();
      submitFormData.append("title", formData.get("title") as string);
      submitFormData.append(
        "description",
        formData.get("description") as string
      );
      submitFormData.append("category", formData.get("category") as string);
      submitFormData.append("image", imageUrl as string);
      submitFormData.append("pitch", formData.get("pitch") as string);

      console.log("SUBMIT FORM DATA:", submitFormData);
      console.log("Image URL being submitted:", submitFormData.get("image"));

      const result = await createPitch(prevState, submitFormData);
      console.log("CREATE PITCH RESULT:", result);

      if (result.status == "SUCCESS") {
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

        return {
          ...prevState,
          error: "An unexpected error has occurred",
          status: "ERROR",
        };
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

      <div className="flex flex-col gap-2">
        <label htmlFor="link" className="startup-form_label">
          Service Image
        </label>
        <div className="flex items-center gap-8">
          <CloudinaryUploader
            onImageUrlChange={(imageUrl) => setImageUrl(imageUrl)}
            className="bg-cyan-600 border border-black !max-w-fit hover:bg-black text-white font-semibold py-2 px-11 rounded-full transition:hover duration-300"
          />

          <p className="leading-5 text-sm text-slate-700 font-semibold tracking-wide text-muted-foreground !max-w-[16rem]">
            Upload an image from your device that represents your service.
          </p>
        </div>
        {imageUrl && (
          <div className="mt-2">
            <p className="text-sm text-green-600 mt-2">
              Image uploaded successfully!
            </p>
            <img
              src={imageUrl}
              alt="Uploaded preview"
              className="mt-2 max-w-xs rounded-xl shadow-md shadow-neutral-700 border border-neutral-400"
            />
          </div>
        )}

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

      <Button
        type="submit"
        className="startup-form_btn"
        disabled={isPending || !imageUrl}
      >
        {isPending ? "Submitting..." : "Submit Your Service"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default ServiceForm;
