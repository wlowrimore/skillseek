"use client";

import { useState, useActionState } from "react";
import { useUpdatePath } from "@/hooks/useUpdatePath";
import { useTimeLimit } from "@/hooks/useTimeLimit";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import CloudinaryUploader from "@/components/CloudinaryUploader";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch, updateService } from "@/lib/actions";
import { SelectForm } from "@/components/SelectForm";

export type Author = {
  _id: string;
  name: string;
  image: string;
  email: string;
};

export type Service = {
  _id: string;
  _createdAt: string;
  title: string;
  description: string;
  image: string;
  category: string;
  pitch: string;
  contact: string;
  author: Author;
};

export type ServiceWithAuthorRef = Omit<Service, "author"> & {
  author: {
    _ref: string;
    email: string;
  };
};

interface ServiceFormProps {
  initialData?: {
    _id: string;
    title: string;
    description: string;
    author: { _ref: string; email: string };
    category: string;
    image: string;
    contact: string;
    pitch: string;
    role: string;
  };
  authorEmail: string;
}

interface ServiceFormData {
  title: string;
  description: string;
  category: string;
  image: string;
  contact: string;
  imageDeleteToken?: string;
  pitch: string;
}

const ServiceForm = ({ initialData }: ServiceFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const [formData, setFormData] = useState<ServiceFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
    image: initialData?.image || "",
    imageDeleteToken: "",
    pitch: initialData?.pitch || "",
    contact: initialData?.contact || "",
  });
  const { toast } = useToast();
  const { isUpdatePath } = useUpdatePath();
  const showSuccess = useTimeLimit(formData.image);

  const handleImageChange = (url: string, deleteToken?: string) => {
    setFormData((prev) => ({
      ...prev,
      image: url,
      imageDeleteToken: deleteToken || "",
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleFormSubmit = async (prevState: any, formDataSubmit: FormData) => {
    try {
      if (!validateEmail(formData.contact)) {
        setErrors((prev) => ({
          ...prev,
          contact: "Please enter a valid email address",
        }));
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "Please enter a valid email address",
        });
        return {
          ...prevState,
          error: "Invalid email address",
          status: "ERROR",
        };
      }

      if (initialData && initialData.role === "administrator") {
        const result = await updateService(
          initialData._id,
          {
            ...formData,
            title: formDataSubmit.get("title") as string,
            description: formDataSubmit.get("description") as string,
            category: formDataSubmit.get("category") as string,
            image: formData.image,
            contact: formDataSubmit.get("contact") as string,
            pitch: formDataSubmit.get("pitch") as string,
          },
          initialData.author.email
        );

        if (result) {
          toast({
            variant: "success",
            title: "Success",
            description: "Service updated successfully",
          });
          router.refresh();
          router.push(`/service/${result._id}`);
          return {
            status: "SUCCESS",
            message: "Service updated successfully",
          };
        } else {
          throw new Error("Failed to update service");
        }
      } else {
        const validatedData = await formSchema.parseAsync(formData);

        const submitFormData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value !== undefined) {
            submitFormData.append(key, value);
          }
        });

        const result = await createPitch(prevState, submitFormData);

        if (result.status === "SUCCESS" && formData.image) {
          toast({
            variant: "success",
            title: "Success",
            description: "Your service has been successfully created",
          });
          router.push(`/service/${result._id}`);
        }

        return result;
      }
    } catch (error) {
      console.log("Validation or submission error:", error);

      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "Please check the form fields and try again",
        });

        return {
          ...prevState,
          error: "Validation error occurred",
          status: "ERROR",
        };
      }

      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error has occurred",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [_, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <h1 className="text-2xl font-bold text-white bg-slate-600 rounded-lg px-4 py-2 text-center">
        {isUpdatePath
          ? "Use the form below to update your service"
          : "Fill out the form below to create your service."}
      </h1>
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="startup-form_input"
          aria-label="Service Title"
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
          value={formData.description}
          onChange={handleInputChange}
          className="startup-form_textarea"
          aria-label="Service Description"
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
        <SelectForm value={formData.category} onChange={handleCategoryChange} />
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
            onImageUrlChange={handleImageChange}
            currentImageUrl={formData.image}
            className="bg-cyan-600 border border-black !max-w-fit hover:bg-black text-white font-semibold py-2 px-11 rounded-full transition:hover duration-300"
          />
        </div>
        {formData.image && (
          <div className="mt-2">
            {showSuccess && (
              <p className="text-sm text-green-600 mt-2">
                Image uploaded successfully!
              </p>
            )}
            <img
              src={formData.image}
              alt="Uploaded preview"
              className="mt-2 md:max-w-xs rounded-xl shadow-md shadow-neutral-700 border border-neutral-400"
            />
          </div>
        )}
        {errors.image && <p className="startup-form_error">{errors.image}</p>}
      </div>

      <div>
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <Textarea
          id="pitch"
          name="pitch"
          value={formData.pitch}
          onChange={handleInputChange}
          className="startup-form_textarea h-32"
          aria-label="Briefly describe your service. Include things like years of experience, skills, and more."
          required
          placeholder="Briefly describe your service. Include things like years of experience, skills, and more."
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <div>
        <label htmlFor="contact" className="startup-form_label">
          Contact Email
        </label>
        <Input
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleInputChange}
          className="startup-form_input"
          aria-label="Contact Email"
          required
          placeholder="Get Connected"
        />
        {errors.contact && (
          <p className="startup-form_error">{errors.contact}</p>
        )}
      </div>

      <Button
        type="submit"
        aria-label="Submit Your Service"
        name="submit"
        className="startup-form_btn"
        disabled={isPending || !formData.image}
      >
        {isPending
          ? isUpdatePath
            ? "Updating..."
            : "Submitting..."
          : isUpdatePath
            ? "Submit Changes"
            : "Submit Your Service"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default ServiceForm;
