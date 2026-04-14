"use client";

import { useState } from "react";
import { Github, ExternalLink, Images } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImageGallery } from "./image-gallery";
import type { Project } from "@/lib/data";

interface EditorialProjectCardProps {
  project: Project;
  index: number;
}

export function EditorialProjectCard({
  project,
  index,
}: EditorialProjectCardProps) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const isReverse = index % 2 !== 0;
  const number = String(index + 1).padStart(2, "0");

  return (
    <>
      <div
        className={`group flex flex-col lg:flex-row ${
          isReverse ? "lg:flex-row-reverse" : ""
        } rounded-2xl border border-border/50 overflow-hidden bg-card hover-lift reveal`}
        style={{ transitionDelay: `${index * 60}ms` }}
      >
        {/* ── Image side ─────────────────────────────────── */}
        <div
          style={{ position: "relative", overflow: "hidden" }}
          className="w-full lg:w-[55%] aspect-[16/10] lg:aspect-auto lg:min-h-[460px] flex-shrink-0"
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundImage: `url(${project.heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
            }}
          />

          {/* Hover overlay */}
          <div
            style={{ position: "absolute", inset: 0 }}
            className="bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          />

          {/* Gallery trigger */}
          {project.galleryImages.length > 1 && (
            <button
              onClick={() => setGalleryOpen(true)}
              style={{ position: "absolute", bottom: 16, right: 16, zIndex: 10 }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black/60 text-white text-xs font-medium backdrop-blur-sm hover:bg-primary/80 transition-all duration-200 opacity-0 group-hover:opacity-100 press-effect"
              aria-label="View gallery"
            >
              <Images className="h-3.5 w-3.5" />
              {project.galleryImages.length} photos
            </button>
          )}
        </div>

        {/* ── Text side ──────────────────────────────────── */}
        <div
          className={`flex-1 flex flex-col justify-center gap-5 p-8 lg:p-12 xl:p-16 ${
            isReverse ? "lg:items-end lg:text-right" : ""
          }`}
        >
          <span className="font-mono text-6xl font-extrabold text-muted-foreground/10 select-none leading-none -mb-2">
            {number}
          </span>

          <div className={`flex flex-wrap gap-2 ${isReverse ? "lg:justify-end" : ""}`}>
            {project.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-mono">
                {tag}
              </Badge>
            ))}
          </div>

          <h3 className="text-2xl xl:text-3xl font-bold font-heading leading-snug group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-muted-foreground leading-relaxed text-sm max-w-md">
            {project.description}
          </p>

          <div className={`flex items-center gap-3 pt-1 ${isReverse ? "lg:justify-end" : ""}`}>
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center h-10 px-5 text-sm font-medium rounded-lg bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all duration-200 press-effect border border-primary/20 hover:border-transparent"
              >
                {link.type === "github" ? (
                  <><Github className="h-4 w-4 mr-2" />Source</>
                ) : (
                  <><ExternalLink className="h-4 w-4 mr-2" />Live Demo</>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      <ImageGallery
        images={project.galleryImages}
        title={project.title}
        open={galleryOpen}
        onOpenChange={setGalleryOpen}
      />
    </>
  );
}
