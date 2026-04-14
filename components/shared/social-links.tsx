import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/zyeh0001",
    icon: <Github className="h-5 w-5" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/charles-yeh-1b5950202/",
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/charles.gaga_/",
    icon: <Instagram className="h-5 w-5" />,
  },
  {
    name: "Email",
    href: "mailto:charlesyehtw@gmail.com",
    icon: <Mail className="h-5 w-5" />,
  },
];

interface SocialLinksProps {
  className?: string;
  size?: "default" | "lg";
}

export function SocialLinks({ className, size = "default" }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {socialLinks.map((link) => (
        <Button
          key={link.name}
          variant="ghost"
          size={size === "lg" ? "default" : "icon"}
          asChild
        >
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
          >
            {link.icon}
          </a>
        </Button>
      ))}
    </div>
  );
}
