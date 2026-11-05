import { cop31LanguageFor, cop31Path, type Cop31Language } from "./cop31-paths";

/**
 * The opening dialog's copy, kept apart from the page copy: the dialog renders
 * on every page of the site, and this keeps the page's full copy out of them.
 */
export type Cop31DialogCopy = {
  price: (eur: number) => string;
  dialogTitle: string;
  dialogBody: string;
  dialogFrom: (price: string) => string;
  dialogCta: string;
  dialogLater: string;
  close: string;
};

export { cop31LanguageFor, cop31Path, type Cop31Language };

export const cop31DialogCopy: Record<Cop31Language, Cop31DialogCopy> = {
  en: {
    price: (eur) => `€${eur}`,
    dialogTitle: "In Antalya for COP31?",
    dialogBody: "Book a private Mercedes with a dedicated driver for every summit day, from hotel to venue and back.",
    dialogFrom: (price) => `Daily chauffeur from ${price} per day, fuel included`,
    dialogCta: "Explore summit chauffeur",
    dialogLater: "Not now",
    close: "Close",
  },
  tr: {
    price: (eur) => `€${eur}`,
    dialogTitle: "COP31 için Antalya'da mısınız?",
    dialogBody: "Zirvenin her günü için özel şoförlü bir Mercedes ayırtın: otelden zirve alanına ve geri.",
    dialogFrom: (price) => `Günlük şoförlü araç ${price}'den, yakıt dahil`,
    dialogCta: "Zirve hizmetini incele",
    dialogLater: "Şimdi değil",
    close: "Kapat",
  },
  de: {
    price: (eur) => `${eur} €`,
    dialogTitle: "Zur COP31 in Antalya?",
    dialogBody: "Buchen Sie einen privaten Mercedes mit eigenem Fahrer für jeden Konferenztag, vom Hotel zum Gelände und zurück.",
    dialogFrom: (price) => `Fahrer pro Tag ab ${price}, Kraftstoff inklusive`,
    dialogCta: "Konferenz-Fahrdienst ansehen",
    dialogLater: "Nicht jetzt",
    close: "Schließen",
  },
  fr: {
    price: (eur) => `${eur} €`,
    dialogTitle: "À Antalya pour la COP31 ?",
    dialogBody: "Réservez une Mercedes privée avec chauffeur dédié pour chaque jour de conférence, de l'hôtel au site et retour.",
    dialogFrom: (price) => `Chauffeur à la journée dès ${price}, carburant inclus`,
    dialogCta: "Découvrir le service",
    dialogLater: "Plus tard",
    close: "Fermer",
  },
  ru: {
    price: (eur) => `€${eur}`,
    dialogTitle: "Едете в Анталью на COP31?",
    dialogBody: "Забронируйте частный Mercedes с личным водителем на каждый день конференции: из отеля на площадку и обратно.",
    dialogFrom: (price) => `Водитель на день от ${price}, топливо включено`,
    dialogCta: "Подробнее об услуге",
    dialogLater: "Не сейчас",
    close: "Закрыть",
  },
  ar: {
    price: (eur) => `${eur} يورو`,
    dialogTitle: "في أنطاليا لحضور COP31؟",
    dialogBody: "احجز سيارة مرسيدس خاصة مع سائق مخصص لكل يوم من أيام المؤتمر، من الفندق إلى الموقع والعودة.",
    dialogFrom: (price) => `سائق باليوم من ${price}، الوقود مشمول`,
    dialogCta: "اكتشف الخدمة",
    dialogLater: "ليس الآن",
    close: "إغلاق",
  },
  es: {
    price: (eur) => `${eur} €`,
    dialogTitle: "¿En Antalya para la COP31?",
    dialogBody: "Reserve un Mercedes privado con conductor dedicado para cada día de la cumbre, del hotel a la sede y de vuelta.",
    dialogFrom: (price) => `Conductor por día desde ${price}, combustible incluido`,
    dialogCta: "Ver el servicio",
    dialogLater: "Ahora no",
    close: "Cerrar",
  },
};
