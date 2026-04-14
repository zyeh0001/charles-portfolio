"use client";

import { useState, useRef } from "react";
import emailjs from "emailjs-com";
import { Button } from "@/components/ui/button";
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Send, CheckCircle, AlertCircle, Mail, MapPin, Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { personalInfo } from "@/lib/data";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (form: HTMLFormElement): boolean => {
    const formData = new FormData(form);
    const newErrors: Record<string, string> = {};

    const name = formData.get("name") as string;
    const email = formData.get("user_email") as string;
    const message = formData.get("message") as string;

    if (!name?.trim()) newErrors.name = "Name is required";
    if (!email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!message?.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form || !validateForm(form)) return;

    setStatus("sending");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      form.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          title="Get in Touch"
          subtitle="Have a question or want to work together? I'd love to hear from you."
        />

        <div className="grid lg:grid-cols-2 gap-8 reveal">
          {/* Left column – info */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold font-heading">
                Let&apos;s build something together
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Have a question? Simply wanna grab a coffee? Feel free to reach
                out — I&apos;m always happy to connect with fellow developers and
                potential collaborators.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-200 group"
              >
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-sm">{personalInfo.email}</span>
              </a>

              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-sm">{personalInfo.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-muted/50 hover:bg-primary hover:text-primary-foreground border border-border hover:border-transparent transition-all duration-200 press-effect"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-muted/50 hover:bg-primary hover:text-primary-foreground border border-border hover:border-transparent transition-all duration-200 press-effect"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Right column – form */}
          <GlassCard hover={false}>
            <GlassCardContent className="p-6">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={cn(
                      "w-full px-4 py-2.5 rounded-lg bg-background border border-input",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                      "transition-colors",
                      errors.name && "border-destructive"
                    )}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    className={cn(
                      "w-full px-4 py-2.5 rounded-lg bg-background border border-input",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                      "transition-colors",
                      errors.email && "border-destructive"
                    )}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={cn(
                      "w-full px-4 py-2.5 rounded-lg bg-background border border-input resize-none",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                      "transition-colors",
                      errors.message && "border-destructive"
                    )}
                    placeholder="Your message..."
                  />
                  {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message}</p>}
                </div>

                <Button type="submit" className="w-full press-effect hover-glow" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <><span className="animate-spin mr-2">⏳</span>Sending...</>
                  ) : status === "success" ? (
                    <><CheckCircle className="h-4 w-4 mr-2" />Message Sent!</>
                  ) : status === "error" ? (
                    <><AlertCircle className="h-4 w-4 mr-2" />Failed to Send</>
                  ) : (
                    <><Send className="h-4 w-4 mr-2" />Send Message</>
                  )}
                </Button>
              </form>
            </GlassCardContent>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
