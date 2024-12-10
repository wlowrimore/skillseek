"use client";

import { useActionState, useState } from "react";
import { contactFormSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useTimeLimit } from "@/hooks/useTimeLimit";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ContactFormProps {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = ({ initialData }: { initialData?: ContactFormProps }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    subject: initialData?.subject || "",
    message: initialData?.message || "",
  });
  const { toast } = useToast();
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (prevState: any, formDataSubmit: FormData) => {
    try {
      if (!contactFormSchema.safeParse(formData)) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address",
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

      const result = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formDataSubmit),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.ok) {
        toast({
          variant: "success",
          title: "Success",
          description: "Your message has been sent successfully",
        });
        router.refresh();
        router.push(`/contact-success`);
        return {
          status: "SUCCESS",
          message: "Your message has been sent successfully",
        };
      } else {
        throw new Error("Failed to send message");
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

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="contact-form">
      <div>
        <label htmlFor="firstName" className="contact-form_label">
          First Name
        </label>
        <Input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          className="contact-form_input"
          aria-label="First Name"
          required
          placeholder="First Name"
        />
        {errors.firstName && (
          <p className="contact-form_error">{errors.firstName}</p>
        )}
      </div>

      <div>
        <label htmlFor="lastName" className="contact-form_label">
          Last Name
        </label>
        <Input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          className="contact-form_input"
          aria-label="Last Name"
          required
          placeholder="Last Name"
        />
        {errors.lastName && (
          <p className="contact-form_error">{errors.lastName}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="contact-form_label">
          Email
        </label>
        <Input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="contact-form_input"
          aria-label="Email"
          required
          placeholder="Get Connected"
        />
        {errors.email && <p className="contact-form_error">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="contact-form_label">
          Subject
        </label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          className="contact-form_input"
          aria-label="Subject"
          required
          placeholder="Subject"
        />
        {errors.subject && (
          <p className="contact-form_error">{errors.subject}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="contact-form_label">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          className="contact-form_textarea"
          aria-label="Message"
          required
          placeholder="Message"
        />
        {errors.message && (
          <p className="contact-form_error">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        aria-label="Submit Your Message"
        name="submit"
        className="contact-form_btn"
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Submit"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default ContactForm;
