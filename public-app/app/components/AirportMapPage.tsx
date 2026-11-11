import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { StaticPageHeader } from "./StaticPageHeader";
import { arrivalRoutes, terminalLevels, type TerminalId, type ViewId } from "../lib/airport-map";
import { airportMapCopy, type AirportMapLanguage, type AirportStepId } from "../lib/airport-map-copy";
import type { AirportScene } from "../lib/airport-scene";
import { track } from "../lib/track";

/** Seconds the walker spends on one route step. */
const STEP_SECONDS = 4.5;

/**
 * The interactive airport map. The 3D scene is an enhancement: the route is
 * always present as an ordered list, which is what crawlers, screen readers
 * and browsers without WebGL get.
 */
export function AirportMapPage({ language }: { language: AirportMapLanguage }) {
  const copy = airportMapCopy[language];
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<AirportScene | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "unsupported">("loading");
  const [view, setView] = useState<ViewId>("t2");
  const [level, setLevel] = useState("ground");
  const [step, setStep] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [full, setFull] = useState(false);
  const terminal: TerminalId = view === "overview" ? "t2" : view;
  const route = arrivalRoutes[terminal];

  const openView = (next: ViewId, nextLevel = "ground") => {
    setPlaying(false);
    setStep(null);
    setView(next);
    setLevel(nextLevel);
  };

  useEffect(() => {
    track("landing_view", { route: "airport_map" });
    let disposed = false;
    // three.js is only fetched here, so no other page pays for it.
    void import("../lib/airport-scene").then(({ createAirportScene }) => {
      if (disposed || !host.current) return;
      try {
        scene.current = createAirportScene(host.current, { ...copy.places, ...copy.views }, (picked) => openView(picked));
        setStatus("ready");
      } catch {
        setStatus("unsupported");
      }
    }).catch(() => setStatus("unsupported"));
    return () => {
      disposed = true;
      scene.current?.dispose();
      scene.current = null;
    };
    // The scene is built once; language never changes without a page load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === "ready" && step === null) scene.current?.show(view, level);
  }, [status, view, level, step]);

  useEffect(() => {
    if (!playing || step === null || status !== "ready") return;
    let frame = 0;
    let start = 0;
    const animate = (now: number) => {
      start ||= now;
      const progress = (now - start) / 1000 / STEP_SECONDS;
      scene.current?.walkTo(terminal, step, progress);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else if (step < route.length - 1) {
        setLevel(route[step + 1].level);
        setStep(step + 1);
      } else {
        setPlaying(false);
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [playing, step, status, terminal, route]);

  // Full screen is a fixed overlay, not the Fullscreen API: iPhone Safari has none for page elements.
  useEffect(() => {
    if (!full) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setFull(false); };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [full]);

  const goToStep = (index: number) => {
    if (view === "overview") setView("t2");
    setLevel(route[index].level);
    setStep(index);
    // With reduced motion the walker jumps to the end of the step instead of gliding there.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(false);
      scene.current?.walkTo(terminal, index, 1, true);
    } else {
      setPlaying(true);
    }
  };

  const homeHref = language === "en" ? "/" : `/${language}/`;
  const bookingHref = `${homeHref}#booking`;
  const stepCopy = copy.steps[terminal] as Record<AirportStepId, readonly [string, string]>;

  return (
    <>
      <StaticPageHeader
        homeHref={homeHref}
        homeLabel={copy.home}
        secondaryHref={`${homeHref}#routes`}
        secondaryLabel={copy.transfers}
        ctaHref={bookingHref}
        ctaLabel={copy.bookNow}
      />
      <main className="am-page">
        <section className="am-hero">
          <h1>{copy.heading}</h1>
          <p>{copy.intro}</p>
        </section>

        <section className="am-stage" aria-label={copy.views[view]}>
          <div className="am-tabs">
            {(["t2", "t1", "overview"] as const).map((id) => (
              <button key={id} type="button" aria-pressed={view === id} onClick={() => openView(id)}>{copy.views[id]}</button>
            ))}
          </div>
          <div className="am-body">
            <div className={full ? "am-map is-full" : "am-map"}>
              <div className={`am-canvas is-${status}`} ref={host} role="img" aria-label={copy.canvasLabel} />
              {status === "ready" && (
                <button type="button" className="am-full" aria-pressed={full} aria-label={full ? copy.exitFullscreen : copy.fullscreen} title={full ? copy.exitFullscreen : copy.fullscreen} onClick={() => setFull(!full)}>
                  <Icon name={full ? "close" : "expand"} className="icon" />
                </button>
              )}
              {status === "loading" && <p className="am-status">{copy.loading}</p>}
              {status === "unsupported" && <p className="am-status">{copy.noWebgl}</p>}
              {view !== "overview" && (
                <div className="am-levels" role="group" aria-label={copy.views[view]}>
                  {terminalLevels[view].map((id) => (
                    <button key={id} type="button" aria-pressed={level === id} onClick={() => openView(view, id)}>{copy.levels[id as keyof typeof copy.levels]}</button>
                  ))}
                </div>
              )}
              <p className="am-hint">{view === "overview" ? copy.overviewHint : copy.dragHint}</p>
            </div>

            <div className="am-route">
              <h2>{copy.routeTitle[terminal]}</h2>
              <button
                type="button"
                className="am-walk"
                disabled={status !== "ready"}
                onClick={() => (playing ? setPlaying(false) : goToStep(step !== null && step < route.length - 1 ? step : 0))}
              >
                {playing ? copy.pause : copy.walk}
              </button>
              <ol>
                {route.map((routeStep, index) => (
                  <li key={routeStep.id} className={step === index ? "is-current" : undefined}>
                    <button type="button" aria-current={step === index ? "step" : undefined} onClick={() => goToStep(index)}>
                      <strong>{stepCopy[routeStep.id as AirportStepId][0]}</strong>
                      <span>{stepCopy[routeStep.id as AirportStepId][1]}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <div className="am-content">
          <section className="am-greeter" aria-labelledby="am-greeter-title">
            <h2 id="am-greeter-title">{copy.greeterTitle}</h2>
            {copy.greeterText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <a className="quote-submit am-cta" href={bookingHref}>
              <span>{copy.bookNow}</span><Icon name="arrow-right" className="icon" />
            </a>
          </section>

          <section aria-labelledby="am-faq-title">
            <h2 id="am-faq-title">{copy.faqTitle}</h2>
            {copy.faq.map(([question, answer]) => (
              <details key={question} className="am-faq">
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </section>

          <section className="am-sources" aria-labelledby="am-sources-title">
            <h2 id="am-sources-title">{copy.sourcesTitle}</h2>
            <p>{copy.sources}</p>
          </section>
        </div>
      </main>
    </>
  );
}
