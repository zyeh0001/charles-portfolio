"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { Github, Linkedin, FileText, Menu, X } from "lucide-react";
import { personalInfo } from "@/lib/data";

const navItems = [
  { label: "Projects", href: "#projects", code: "projects()" },
  { label: "Experience", href: "#experience", code: "experience()" },
  { label: "Skills", href: "#skills", code: "skills[]" },
  { label: "About", href: "#about", code: "about()" },
  { label: "Contact", href: "#contact", code: "contact()" },
];

const socialNavLinks = [
  { label: "GitHub", href: personalInfo.socials.github, icon: <Github className="h-4 w-4" /> },
  { label: "LinkedIn", href: personalInfo.socials.linkedin, icon: <Linkedin className="h-4 w-4" /> },
  { label: "Resume", href: "/Charles_Yeh_Resume.pdf", icon: <FileText className="h-4 w-4" /> },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 animate-fade-in-down transition-all duration-300",
        scrolled
          ? "glass shadow-lg border-b border-border/60"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav aria-label="Main navigation" className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="group flex items-center gap-1 text-lg font-bold font-mono text-foreground hover:text-primary transition-colors duration-200 press-effect"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            <span className="text-primary/50 group-hover:text-primary transition-colors">{"<"}</span>
            <span>CY</span>
            <span className="text-primary/50 group-hover:text-primary transition-colors">{"/>"}</span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={cn(
                  "group relative px-4 py-2 text-sm font-mono text-muted-foreground rounded-lg",
                  "hover:text-foreground hover:bg-primary/5 transition-all duration-200",
                  "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2",
                  "after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300",
                  "hover:after:w-1/2"
                )}
              >
                <span className="group-hover:hidden">{item.label}</span>
                <span className="hidden group-hover:inline text-primary">{item.code}</span>
              </a>
            ))}
          </div>

          {/* Desktop right: social icons + theme toggle */}
          <div className="hidden md:flex items-center gap-1">
            {socialNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200 press-effect"
              >
                {link.icon}
              </a>
            ))}
            <div className="ml-1">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-out",
          mobileOpen ? "max-h-96 border-b border-border/60" : "max-h-0"
        )}
      >
        <div className="glass px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="block px-4 py-2.5 text-sm font-mono text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-lg transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-2 pt-3 px-4">
            {socialNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
