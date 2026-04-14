import Image from "next/image";
import { SectionHeader } from "@/components/shared/section-header";
import { about, personalInfo } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Download } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="About" />

        <div className="grid md:grid-cols-3 gap-10 items-start reveal">
          {/* Profile Photo with animated gradient border */}
          <div className="flex justify-center md:justify-start">
            <div className="profile-gradient-border">
              <div className="relative w-56 h-56 rounded-[0.875rem] overflow-hidden bg-card">
                <Image
                  src="/images/charles.png"
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  sizes="224px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* About Text */}
          <div className="md:col-span-2 space-y-6">
            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4">
              {about.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                {personalInfo.location}
              </div>
              <Button variant="outline" size="sm" asChild className="press-effect">
                <a href={`mailto:${personalInfo.email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  Get in Touch
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild className="press-effect">
                <a href="/Charles_Yeh_Resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
