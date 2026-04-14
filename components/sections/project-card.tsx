"use client";

import Image from "next/image";
import { useState } from "react";
import { Github, ExternalLink, Images } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card";
import { ImageGallery } from "./image-gallery";
import type { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <>
      <GlassCard className="group overflow-hidden hover-lift border-gradient-hover cursor-pointer h-full flex flex-col">
        {/* Hero Image */}
        <div className="relative aspect-video overflow-hidden flex-shrink-0">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover transition-all duration-500 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Gallery Button Overlay */}
          {project.galleryImages.length > 1 && (
            <button
              onClick={() => setGalleryOpen(true)}
              className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/60 text-white text-xs font-medium backdrop-blur-sm hover:bg-primary/80 transition-all duration-200 press-effect"
              aria-label="View gallery"
            >
              <Images className="h-3.5 w-3.5" />
              {project.galleryImages.length}
            </button>
          )}
        </div>

        <GlassCardContent className="p-5 flex flex-col flex-1">
          {/* Title - fixed height */}
          <h3 className="text-lg font-semibold line-clamp-1 font-heading group-hover:text-primary transition-colors duration-200 mb-3">
            {project.title}
          </h3>

          {/* Caption - fixed height with 2 lines */}
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem] mb-3">
            {project.caption}
          </p>

          {/* Tags - fixed height area */}
          <div className="flex flex-wrap gap-1.5 min-h-[3.5rem] content-start mb-3">
            {project.tags.slice(0, 4).map((tag, index) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs transition-all duration-200 hover:bg-primary hover:text-primary-foreground h-fit"
                style={{ transitionDelay: `${index * 30}ms` }}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Spacer to push links to bottom */}
          <div className="flex-1" />

          {/* Links - always at bottom */}
          <div className="flex items-center gap-2 pt-2 border-t border-border/50">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center h-8 px-3 text-sm font-medium rounded-md bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200 press-effect"
                aria-label={`${link.type === "github" ? "View source code on GitHub" : "View live demo"}`}
              >
                {link.type === "github" ? (
                  <>
                    <Github className="h-4 w-4 mr-1.5" />
                    Code
                  </>
                ) : (
                  <>
                    <ExternalLink className="h-4 w-4 mr-1.5" />
                    Demo
                  </>
                )}
              </a>
            ))}
          </div>
        </GlassCardContent>
      </GlassCard>

      {/* Image Gallery Modal */}
      <ImageGallery
        images={project.galleryImages}
        title={project.title}
        open={galleryOpen}
        onOpenChange={setGalleryOpen}
      />
    </>
  );
}
