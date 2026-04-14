import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  // Convert title to camelCase for code-style display
  const codeTitle = title.charAt(0).toLowerCase() + title.slice(1).replace(/\s+/g, '');

  return (
    <div className={cn("mb-12 text-center animate-fade-in-up", className)}>
      {/* Code-style section indicator */}
      <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-md bg-muted/50 border border-border font-mono text-xs text-muted-foreground">
        <span className="text-primary">function</span>
        <span>{codeTitle}</span>
        <span className="text-muted-foreground/60">{'( )'}</span>
        <span className="text-muted-foreground/60">{'{'}</span>
      </div>

      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading text-glow-hover">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto font-mono text-sm">
          <span className="text-muted-foreground/60">{'//'} </span>
          {subtitle}
        </p>
      )}
      {/* Decorative code bracket line */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
        <span className="font-mono text-primary/40 text-sm">{'{ }'}</span>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-border" />
      </div>
    </div>
  );
}
