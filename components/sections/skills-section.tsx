import { SectionHeader } from "@/components/shared/section-header";
import { skills } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card";

// Map categories to code-style labels
const categoryCodeMap: Record<string, string> = {
  "Languages": "languages[]",
  "Frontend": "frontend[]",
  "Backend": "backend[]",
  "Database": "databases[]",
  "Tools & DevOps": "devOps[]",
  "Testing": "testing[]",
  "Design": "design[]",
  "Other": "other[]",
};

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader
          title="Skills"
          subtitle="Technologies and tools I work with"
        />

        {/* Terminal-style container */}
        <div className="terminal-box mb-8">
          <div className="terminal-header">
            <div className="terminal-dot red" />
            <div className="terminal-dot yellow" />
            <div className="terminal-dot green" />
            <span className="ml-4 text-xs font-mono text-muted-foreground">techStack.ts</span>
          </div>
          <div className="terminal-content">
            <div className="code-line text-muted-foreground">
              <span className="code-line-number">1</span>
              <span className="code-line-content">
                <span className="syntax-keyword">const</span>{' '}
                <span className="syntax-variable">techStack</span>{' '}
                <span className="syntax-operator">=</span>{' '}
                <span className="syntax-operator">{'{'}</span>
              </span>
            </div>
            {skills.slice(0, 3).map((category, index) => (
              <div key={category.category} className="code-line">
                <span className="code-line-number">{index + 2}</span>
                <span className="code-line-content pl-4">
                  <span className="syntax-variable">{categoryCodeMap[category.category] || category.category.toLowerCase()}</span>
                  <span className="syntax-operator">:</span>{' '}
                  <span className="syntax-string">{`["${category.skills.slice(0, 3).join('", "')}",...]`}</span>
                  <span className="syntax-operator">,</span>
                </span>
              </div>
            ))}
            <div className="code-line text-muted-foreground">
              <span className="code-line-number">{skills.length + 2}</span>
              <span className="code-line-content">
                <span className="syntax-operator">{'}'}</span>
                <span className="syntax-operator">;</span>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category, categoryIndex) => (
            <GlassCard
              key={category.category}
              hover={false}
              className="hover-lift group reveal-scale"
              style={{ transitionDelay: `${categoryIndex * 80}ms` }}
            >
              <GlassCardContent className="p-6">
                {/* Category with code syntax */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-xs text-primary/60">const</span>
                  <h3 className="font-semibold text-lg font-mono group-hover:text-primary transition-colors duration-200">
                    {categoryCodeMap[category.category] || category.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="font-mono text-xs transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:scale-105 cursor-default"
                      style={{ transitionDelay: `${skillIndex * 20}ms` }}
                    >
                      <span className="text-primary/60 mr-1">{"<"}</span>
                      {skill}
                      <span className="text-primary/60 ml-1">{"/>"}</span>
                    </Badge>
                  ))}
                </div>
              </GlassCardContent>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
