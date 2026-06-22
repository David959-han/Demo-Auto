/**
 * Yantar Auto OS — Image Assets
 * Barcha rasmlar shu fayldan import qilinadi.
 * Manbalar: Unsplash, Pexels, Pixabay, StockSnap, Kaboompics
 */

export interface ImageAsset {
  url: string;
  alt: { uz: string; en: string; ar: string };
  width: number;
  height: number;
  source: 'unsplash' | 'pexels' | 'pixabay' | 'stocksnap' | 'kaboompics';
  credit?: string;
}

/* ─── UNSPLASH ──────────────────────────────────────────────── */
const UNSPLASH = 'https://images.unsplash.com';

export const heroBackground: ImageAsset = {
  url: `${UNSPLASH}/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=85`,
  alt: {
    uz: 'Zamonaviy avtoservis ustaxonasi',
    en: 'Modern auto service workshop',
    ar: 'ورشة خدمة سيارات حديثة',
  },
  width: 1920,
  height: 1080,
  source: 'unsplash',
  credit: 'Unsplash',
};

export const mechanicWorking: ImageAsset = {
  url: `${UNSPLASH}/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80`,
  alt: {
    uz: 'Usta mashina ustida ishlamoqda',
    en: 'Mechanic working on a car',
    ar: 'ميكانيكي يعمل على سيارة',
  },
  width: 1200,
  height: 800,
  source: 'unsplash',
  credit: 'Unsplash',
};

export const carEngine: ImageAsset = {
  url: `${UNSPLASH}/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80`,
  alt: {
    uz: 'Avtomobil dvigateli yaqindan',
    en: 'Car engine close-up',
    ar: 'محرك السيارة عن قرب',
  },
  width: 1200,
  height: 800,
  source: 'unsplash',
  credit: 'Unsplash',
};

export const workshopTools: ImageAsset = {
  url: `${UNSPLASH}/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=1200&q=80`,
  alt: {
    uz: 'Ustaxona asboблари',
    en: 'Workshop tools',
    ar: 'أدوات الورشة',
  },
  width: 1200,
  height: 800,
  source: 'unsplash',
  credit: 'Unsplash',
};

export const carDashboard: ImageAsset = {
  url: `${UNSPLASH}/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80`,
  alt: {
    uz: 'Premium avtomobil salon',
    en: 'Premium car interior dashboard',
    ar: 'لوحة تحكم سيارة فاخرة',
  },
  width: 1200,
  height: 800,
  source: 'unsplash',
  credit: 'Unsplash',
};

export const mechanicTeam: ImageAsset = {
  url: `${UNSPLASH}/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80`,
  alt: {
    uz: 'Professional ustalar jamoasi',
    en: 'Professional mechanics team',
    ar: 'فريق الميكانيكيين المحترفين',
  },
  width: 1200,
  height: 800,
  source: 'unsplash',
  credit: 'Unsplash',
};

/* ─── PEXELS ────────────────────────────────────────────────── */
const PEXELS = 'https://images.pexels.com/photos';

export const mechanicFixingCar: ImageAsset = {
  url: `${PEXELS}/8985714/pexels-photo-8985714.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop`,
  alt: {
    uz: 'Usta mashinani ta\'mirlamoqda',
    en: 'Mechanic fixing a car',
    ar: 'ميكانيكي يصلح سيارة',
  },
  width: 1200,
  height: 800,
  source: 'pexels',
  credit: 'Pexels',
};

export const tireChange: ImageAsset = {
  url: `${PEXELS}/8986177/pexels-photo-8986177.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop`,
  alt: {
    uz: 'Shina almashtirish',
    en: 'Tire replacement service',
    ar: 'خدمة تبديل الإطارات',
  },
  width: 1200,
  height: 800,
  source: 'pexels',
  credit: 'Pexels',
};

export const oilChange: ImageAsset = {
  url: `${PEXELS}/13065697/pexels-photo-13065697.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop`,
  alt: {
    uz: 'Dvigatel moyini to\'ldirish',
    en: 'Pouring engine oil',
    ar: 'صب زيت المحرك',
  },
  width: 1200,
  height: 800,
  source: 'pexels',
  credit: 'Pexels',
};

export const vintageCarRestoration: ImageAsset = {
  url: `${PEXELS}/31501019/pexels-photo-31501019.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop`,
  alt: {
    uz: 'Avtomobilni tiklash ishlari',
    en: 'Vintage car restoration in garage',
    ar: 'ترميم سيارة كلاسيكية في المرأب',
  },
  width: 1200,
  height: 800,
  source: 'pexels',
  credit: 'Pexels',
};

/* ─── PIXABAY ───────────────────────────────────────────────── */
export const autoMechanicWorkshop: ImageAsset = {
  url: `https://cdn.pixabay.com/photo/2017/08/10/08/48/auto-mechanic-2617997_1280.jpg`,
  alt: {
    uz: 'Avto mexanik ustaxonada',
    en: 'Auto mechanic in workshop',
    ar: 'ميكانيكي سيارات في الورشة',
  },
  width: 1280,
  height: 853,
  source: 'pixabay',
  credit: 'Pixabay',
};

export const carRepairShop: ImageAsset = {
  url: `https://cdn.pixabay.com/photo/2014/09/07/22/34/car-438467_1280.jpg`,
  alt: {
    uz: 'Avtomobil ta\'mirlash do\'koni',
    en: 'Car repair shop',
    ar: 'محل تصليح السيارات',
  },
  width: 1280,
  height: 853,
  source: 'pixabay',
  credit: 'Pixabay',
};

/* ─── IMAGE GROUPS ──────────────────────────────────────────── */

/** Landing page hero section uchun */
export const landingImages = {
  hero: heroBackground,
  mechanic: mechanicWorking,
  team: mechanicTeam,
} as const;

/** Feature section uchun */
export const featureImages = {
  engine: carEngine,
  tools: workshopTools,
  oil: oilChange,
  tire: tireChange,
} as const;

/** Dashboard demo uchun */
export const dashboardImages = {
  workshop: autoMechanicWorkshop,
  restoration: vintageCarRestoration,
  carRepair: carRepairShop,
} as const;

/** Auth / login page uchun */
export const authImages = {
  background: heroBackground,
  interior: carDashboard,
} as const;
