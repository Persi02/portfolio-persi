import Image from "next/image";

import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/types";

type ProjectGalleryProps = {
  images: ProjectImage[];
};

export function ProjectGallery({ images }: ProjectGalleryProps) {
  return (
    <div
      className={cn("grid gap-4", images.length > 1 && "sm:grid-cols-2")}
    >
      {images.map((image) => (
        <figure key={image.src}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-muted/50">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          {image.caption ? (
            <figcaption className="mt-2 text-sm text-muted-foreground">
              {image.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
