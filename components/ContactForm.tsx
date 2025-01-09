"use client";

import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { contactFormSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useTimeLimit } from "@/hooks/useTimeLimit";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

type ContactFormData = z.infer<typeof contactFormSchema>;

export interface ContactFormProps {
  initialData?: ContactFormData;
}

const ContactForm = ({ initialData }: ContactFormProps) => {
  const form = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, setIsPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      // Validate form data
      const validationResult = contactFormSchema.safeParse(formValues);
      if (!validationResult.success) {
        throw validationResult.error;
      }

      if (!form.current) {
        throw new Error("Form reference is not available");
      }

      const templateParams = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        subject: formValues.subject,
        message: formValues.message,
      };

      // Send email using EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
      ),
        toast({
          variant: "success",
          title: "Success",
          description: "Your message has been sent successfully",
        });

      setFormValues({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });

      router.push("/");
    } catch (error) {
      console.error("Error sending message:", error);

      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "Please check the form fields and try again",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to send message. Please try again later.",
        });
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      ref={form}
      onSubmit={handleFormSubmit}
      className="contact-form bg-mobile-contact md:bg-none"
    >
      <div>
        <label htmlFor="firstName" className="contact-form_label">
          First Name
        </label>
        <Input
          id="firstName"
          name="firstName"
          value={formValues.firstName}
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
          value={formValues.lastName}
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
          value={formValues.email}
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
          value={formValues.subject}
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
          rows={5}
          value={formValues.message}
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
