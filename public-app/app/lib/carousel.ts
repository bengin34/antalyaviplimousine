import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import { useCallback, useEffect, useState } from "react";

/** Embla's duration unit is ~10ms per step; 25 is its default glide. */
const GLIDE_DURATION = 26;

/**
 * Reduced-motion users still get the slide change, just without the travel.
 * Embla honours a duration of 0 by jumping straight to the snap point.
 */
const reducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export type CarouselOptions = EmblaOptionsType;

export type Carousel = {
  /** Attach to the overflow-hidden viewport element. */
  ref: (node: HTMLElement | null) => void;
  api: EmblaCarouselType | undefined;
  selectedIndex: number;
  snapCount: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
};

/**
 * Thin wrapper over embla-carousel-react so both home-page sliders share one
 * source of truth for selection state, edge state and reduced-motion timing.
 * Embla drives touch, pen and mouse drag from the same pointer pipeline, which
 * is why phone, tablet and desktop all behave the same without extra branches.
 */
export function useCarousel(options: CarouselOptions = {}): Carousel {
  const [ref, api] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    duration: reducedMotion() ? 0 : GLIDE_DURATION,
    ...options,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;
    const sync = () => {
      setSelectedIndex(api.selectedScrollSnap());
      setSnapCount(api.scrollSnapList().length);
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    sync();
    api.on("select", sync).on("reInit", sync);
    return () => {
      api.off("select", sync).off("reInit", sync);
    };
  }, [api]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);
  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  return {
    ref,
    api,
    selectedIndex,
    snapCount,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    scrollTo,
  };
}
