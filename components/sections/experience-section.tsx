"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/shared/section-header";
import { experiences, education } from "@/lib/data";
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card";
import { Briefcase, GraduationCap, Award, ChevronDown, ChevronUp } from "lucide-react";

const VISIBLE_COUNT = 2;

interface TimelineItemProps {
  title: string;
  subtitle: string;
  period: string;
  items?: string[];
  award?: string;
  icon: React.ReactNode;
  revealClass?: string;
  revealDelay?: number;
}

function TimelineItem({ title, subtitle, period, items, award, icon, revealClass = "reveal-left", revealDelay = 0 }: TimelineItemProps) {
  const [expanded, setExpanded] = useState(false);
  const hasCollapse = items && items.length > VISIBLE_COUNT;
  const visibleItems = hasCollapse && !expanded ? items!.slice(0, VISIBLE_COUNT) : items;

  return (
    <div
      className={`relative pl-8 pb-8 last:pb-0 group ${revealClass}`}
      style={{ transitionDelay: `${revealDelay}ms` }}
    >
      {/* Timeline line with gradient */}
      <div className="absolute left-[11px] top-6 bottom-0 w-px bg-gradient-to-b from-primary/50 to-border last:hidden" />

      {/* Timeline dot with pulse effect */}
      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <div className="w-2 h-2 rounded-full bg-primary" />
      </div>

      <GlassCard hover={false} className="ml-4 hover-lift">
        <GlassCardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              {icon}
            </div>
            <div className="space-y-2 min-w-0 w-full">
              <div>
                <h3 className="font-semibold text-lg font-heading group-hover:text-primary transition-colors duration-200">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
                <p className="text-xs text-muted-foreground mt-1">{period}</p>
              </div>

              {visibleItems && visibleItems.length > 0 && (
                <ul className="space-y-1.5 mt-3">
                  {visibleItems.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <span className="text-primary mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {hasCollapse && (
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="mt-2 flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  {expanded ? (
                    <>
                      <ChevronUp className="h-3 w-3" />
                      Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3 w-3" />
                      {items!.length - VISIBLE_COUNT} more
                    </>
                  )}
                </button>
              )}

              {award && (
                <div className="flex items-center gap-2 mt-3 text-sm text-primary">
                  <Award className="h-4 w-4" />
                  <span>{award}</span>
                </div>
              )}
            </div>
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="Experience"
          subtitle="My professional journey and educational background"
        />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Work Experience */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 reveal-left">
              <Briefcase className="h-5 w-5 text-primary" />
              Work Experience
            </h3>
            <div className="space-y-0">
              {experiences.map((exp, index) => (
                <TimelineItem
                  key={index}
                  title={exp.role}
                  subtitle={exp.company}
                  period={exp.period}
                  items={exp.achievements}
                  icon={<Briefcase className="h-4 w-4" />}
                  revealClass="reveal-left"
                  revealDelay={index * 80}
                />
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 reveal-right">
              <GraduationCap className="h-5 w-5 text-primary" />
              Education
            </h3>
            <div className="space-y-0">
              {education.map((edu, index) => (
                <TimelineItem
                  key={index}
                  title={edu.institution}
                  subtitle={`${edu.degree} • ${edu.location}`}
                  period={edu.period}
                  award={edu.award}
                  icon={<GraduationCap className="h-4 w-4" />}
                  revealClass="reveal-right"
                  revealDelay={index * 80}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
