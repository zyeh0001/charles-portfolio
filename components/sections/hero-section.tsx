"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/shared/social-links";
import { personalInfo } from "@/lib/data";
import { ArrowDown, Download, Terminal } from "lucide-react";

export function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = personalInfo.tagline;

  useEffect(() => {
    if (!isTyping) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [fullText, isTyping]);

  const handleScrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Charles_Yeh_Resume.pdf";
    link.download = "Charles_Yeh_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 relative overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-50" aria-hidden="true" />

      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      {/* Floating code decorations */}
      <div aria-hidden="true" className="floating-code top-20 left-10 hidden lg:block animate-fade-in" style={{ animationDelay: '1s' }}>
        {'<Developer />'}
      </div>
      <div aria-hidden="true" className="floating-code top-32 right-16 hidden lg:block animate-fade-in" style={{ animationDelay: '1.2s' }}>
        {'{ code: "clean" }'}
      </div>
      <div aria-hidden="true" className="floating-code bottom-32 left-20 hidden lg:block animate-fade-in" style={{ animationDelay: '1.4s' }}>
        {'npm run build'}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="stagger-children space-y-6">
          {/* Terminal-style greeting */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border text-sm font-mono text-muted-foreground">
            <Terminal className="h-4 w-4 text-primary" />
            <span>~/portfolio</span>
            <span className="text-primary">$</span>
            <span>whoami</span>
          </div>

          {/* Name with code brackets */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight font-heading">
            <span className="text-primary/40 font-light font-mono text-3xl sm:text-4xl lg:text-5xl">{'<'}</span>
            <span className="inline-block hover:text-primary transition-colors duration-300 mx-2">
              {personalInfo.name}
            </span>
            <span className="text-primary/40 font-light font-mono text-3xl sm:text-4xl lg:text-5xl">{'/>'}</span>
          </h1>

          {/* Title with function syntax */}
          <p className="text-xl sm:text-2xl font-medium font-mono">
            <span className="text-muted-foreground">const</span>{' '}
            <span className="text-primary">role</span>{' '}
            <span className="text-muted-foreground">=</span>{' '}
            <span className="text-green-500 dark:text-green-400">{`"${personalInfo.title}"`}</span>
          </p>

          {/* Tagline with typing effect */}
          <div className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed min-h-[3rem]">
            <span className="font-mono text-muted-foreground/60">{'// '}</span>
            <span className={isTyping ? "typing-cursor" : ""}>{displayText}</span>
          </div>

          {/* Social Links */}
          <div className="flex justify-center pt-2">
            <SocialLinks />
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              size="lg"
              onClick={handleScrollToProjects}
              className="press-effect hover-glow group font-mono"
            >
              <span className="text-primary-foreground/70">{'<'}</span>
              ViewProjects
              <span className="text-primary-foreground/70">{' />'}</span>
              <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleDownloadResume}
              className="press-effect group font-mono"
            >
              download(CV)
              <Download className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <ArrowDown className="h-6 w-6" />
      </div>
    </section>
  );
}
