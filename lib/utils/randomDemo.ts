import type { OrderStatus, WashStatus } from '@/types';

// ── Names ─────────────────────────────────────────────────────────
const firstNames = [
  'Ahmed','Mohammed','Khalid','Abdullah','Omar','Samir','Rashid','Nasser',
  'Fahad','Saad','Ali','Hassan','Yusuf','Ibrahim','Tariq','Bilal',
  'Fatima','Noura','Mona','Sara','Laila','Huda','Reem','Aisha',
];
const lastNames = [
  'Al-Mansouri','Al-Rashid','Al-Otaibi','Al-Said','Al-Harbi','Al-Zahrani',
  'Al-Omari','Al-Qahtani','Al-Balushi','Al-Shamri','Al-Kaabi','Al-Mutairi',
  'Al-Dosari','Al-Ajmi','Al-Hamdan','Al-Suwaidi','Al-Kuwaiti','Al-Farsi',
  'Al-Mazrouei','Al-Nuaimi',
];

// ── Plates ────────────────────────────────────────────────────────
const regions  = ['01','10','20','30','40','50','60','70'];
const pLetters = ['A','B','D','F','G','H','K','L','M','N','P','R','S','T','X'];

// ── Cars ──────────────────────────────────────────────────────────
const carPool = [
  { brand:'Chevrolet', models:['Cobalt','Nexia 3','Malibu','Tracker','Spark','Damas'] },
  { brand:'Hyundai',   models:['Accent','Elantra','Tucson','Santa Fe'] },
  { brand:'Toyota',    models:['Camry','Corolla','RAV4','Prius'] },
  { brand:'Kia',       models:['Rio','Sportage','Cerato','K5'] },
  { brand:'Daewoo',    models:['Matiz','Lacetti','Nexia'] },
  { brand:'Lada',      models:['Granta','Vesta','Niva'] },
];

// ── Services ──────────────────────────────────────────────────────
const services = [
  "Moy almashtirish + filtr",
  "Tormoz kolodka almashtirish",
  "Dvigatel ta'miri",
  "Shina almashtirish",
  "Texnik ko'rik",
  "Elektr tizimi ta'miri",
  "Konditsioner ta'miri",
  "Transmissiya yog'i",
  "Akkumulyator almashtirish",
  "Karbyurator tozalash",
  "Suv nasosi ta'miri",
  "Mufta almashtirish",
  "Generator ta'miri",
  "Amortizator almashtirish",
  "Radiator yuvish",
  "Yonilg'i nasosi ta'miri",
  "Termostot almashtirish",
  "V-kamar almashtirish",
];

// ── Mechanics ─────────────────────────────────────────────────────
const mechanicFirstNames = ['Ahmed','Samir','Rashid','Nasser','Fahad','Omar'];

// ── Helpers ───────────────────────────────────────────────────────
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function randomPlate() {
  const region = pick(regions);
  const l1 = pick(pLetters);
  const num = String(randInt(100, 999));
  const l2 = pick(pLetters);
  const l3 = pick(pLetters);
  return `${region} ${l1} ${num} ${l2}${l3}`;
}

function randomName() {
  return `${pick(firstNames)} ${pick(lastNames)}`;
}

function todayMinus(days: number) {
  const d = new Date('2026-06-22');
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

// ── Exported types ─────────────────────────────────────────────────
export interface RandomOrder {
  id: number;
  orderNumber: string;
  customerName: string;
  plate: string;
  brand: string;
  model: string;
  mechanicName: string;
  description: string;
  totalCost: number;
  startDate: string;
  status: OrderStatus;
}

export interface RandomWashBay {
  id: number;
  bayNumber: number;
  status: WashStatus;
  plate?: string;
  brand?: string;
  startedAt?: string;
  bookedAt?: string;
}

// ── Generators ────────────────────────────────────────────────────
export function generateRandomOrders(count = 12): RandomOrder[] {
  const statuses: OrderStatus[] = ['active','active','active','pending','pending','done','cancelled'];
  return Array.from({ length: count }, (_, i) => {
    const car = pick(carPool);
    const model = pick(car.models);
    const cost = randInt(200, 3500) * 1000;
    const status = pick(statuses);
    return {
      id: i + 1,
      orderNumber: `WO-${Date.now().toString().slice(-4)}-${String(i + 1).padStart(3, '0')}`,
      customerName: randomName(),
      plate: randomPlate(),
      brand: car.brand,
      model,
      mechanicName: pick(mechanicFirstNames),
      description: pick(services),
      totalCost: status === 'cancelled' ? 0 : cost,
      startDate: todayMinus(randInt(0, 14)),
      status,
    };
  });
}

const washStatuses: WashStatus[] = ['washing','washing','booked','waiting','empty','empty'];
const washHours = ['09:00','09:30','10:00','10:15','10:30','10:45','11:00','11:30','12:00'];

export function generateRandomWashBays(count = 6): RandomWashBay[] {
  return Array.from({ length: count }, (_, i) => {
    const status = pick(washStatuses);
    const car = pick(carPool);
    const hasVehicle = status !== 'empty';
    return {
      id: i + 1,
      bayNumber: i + 1,
      status,
      plate:    hasVehicle ? randomPlate() : undefined,
      brand:    hasVehicle ? `${car.brand} ${pick(car.models)}` : undefined,
      startedAt: status === 'washing' ? pick(washHours) : undefined,
      bookedAt:  status === 'booked'  ? pick(washHours) : undefined,
    };
  });
}
