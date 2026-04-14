import { Navigation } from "@/components/shared/navigation";
import { ScrollRevealProvider } from "@/components/shared/scroll-reveal-provider";
import { ScrollProgressBar } from "@/components/shared/scroll-progress-bar";
import { MouseGlow } from "@/components/shared/mouse-glow";
import {
  HeroSection,
  ProjectsSection,
  ExperienceSection,
  SkillsSection,
  AboutSection,
  ContactForm,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <MouseGlow />
      <Navigation />
      <ScrollRevealProvider />
      <main>
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <AboutSection />
        <ContactForm />
      </main>
      <footer className="py-8 px-4 text-center border-t border-border">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Code-style footer */}
          <div className="font-mono text-xs text-muted-foreground">
            <span className="text-primary/60">{'/*'}</span>
            {' Built with '}
            <span className="text-primary">Next.js</span>
            {' + '}
            <span className="text-primary">TypeScript</span>
            {' + '}
            <span className="text-primary">Tailwind CSS</span>
            {' '}
            <span className="text-primary/60">{'*/'}</span>
          </div>
          <p className="text-sm text-muted-foreground font-mono">
            <span className="text-muted-foreground/60">{'// '}</span>
            © {new Date().getFullYear()} Charles Yeh
            <span className="text-muted-foreground/60">{' — '}</span>
            <span className="text-primary">console.log</span>
            <span className="text-muted-foreground/60">{'("'}</span>
            Thanks for visiting!
            <span className="text-muted-foreground/60">{'")'}</span>
          </p>
        </div>
      </footer>
    </>
  );
}
