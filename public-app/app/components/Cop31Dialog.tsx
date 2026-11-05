import { useEffect, useRef, useState } from "react";
import blueMarble from "../../../assets/cop31/blue-marble.webp?url";
import copLogo from "../../../assets/cop31/cop31-logo-white.svg?url";
import { readConsent } from "../../../src/analytics-consent.js";
import { turkeyToday } from "../../../supabase/functions/_shared/land-of-legends-rules.js";
import { COP31_DAILY_RATE_EUR } from "../../../supabase/functions/_shared/cop31.js";
import { shouldShowCop31Dialog } from "../lib/cop31-paths";
import { cop31DialogCopy, cop31LanguageFor, cop31Path } from "../lib/cop31-dialog-copy";

const DISMISSED_KEY = "avl-cop31-dialog-dismissed";

const dismissedBefore = () => {
  try { return localStorage.getItem(DISMISSED_KEY) === "1"; } catch { return false; }
};

/**
 * Announces the COP31 summit chauffeur page once per visitor, on every page
 * but that one, until the summit ends. It waits for the cookie banner to be
 * answered so a first visit never opens on two overlays.
 */
export function Cop31Dialog({ language }: { language: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const copyLanguage = cop31LanguageFor(language);
  const copy = cop31DialogCopy[copyLanguage];

  useEffect(() => {
    if (!shouldShowCop31Dialog(window.location.pathname, turkeyToday(), dismissedBefore())) return;
    let timer = 0;
    const wait = () => {
      timer = window.setTimeout(() => (readConsent() !== "unknown" ? setOpen(true) : wait()), 1500);
    };
    wait();
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open || !dialog.current || dialog.current.open) return;
    dialog.current.showModal?.();
  }, [open]);

  const dismiss = () => {
    try { localStorage.setItem(DISMISSED_KEY, "1"); } catch { /* private mode: it shows again next visit */ }
    dialog.current?.close();
    setOpen(false);
  };

  if (!open) return null;
  return (
    <dialog
      ref={dialog}
      className="cop-dialog"
      aria-labelledby="cop-dialog-title"
      onCancel={dismiss}
      onClick={(event) => { if (event.target === dialog.current) dismiss(); }}
    >
      <div className="cop-dialog-art" style={{ backgroundImage: `url(${blueMarble})` }} aria-hidden="true">
        <span className="cop-dialog-orbit" />
      </div>
      <div className="cop-dialog-body">
        <button type="button" className="cop-dialog-close" aria-label={copy.close} onClick={dismiss}>×</button>
        <img className="cop-dialog-logo" src={copLogo} alt="COP31 Türkiye Antalya" width={1265} height={291} />
        <p className="cop-dialog-dates"><bdi>9–20.11.2026</bdi> · Antalya</p>
        <h2 id="cop-dialog-title">{copy.dialogTitle}</h2>
        <p>{copy.dialogBody}</p>
        <p className="cop-dialog-from">{copy.dialogFrom(copy.price(COP31_DAILY_RATE_EUR.vito))}</p>
        <a
          className="cop-dialog-cta"
          href={cop31Path(copyLanguage)}
          onClick={() => { try { localStorage.setItem(DISMISSED_KEY, "1"); } catch { /* ignore */ } }}
        >
          {copy.dialogCta} →
        </a>
        <button type="button" className="cop-dialog-later" onClick={dismiss}>{copy.dialogLater}</button>
      </div>
    </dialog>
  );
}
