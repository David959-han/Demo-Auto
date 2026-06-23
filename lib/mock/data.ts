import type {
  Customer, Car, WorkOrder, Mechanic,
  Part, WashBay, Reminder, DashboardStats, MonthlyAccounting,
} from '@/types';

export const mockStats: DashboardStats = {
  todayOrders: 14,
  totalCustomers: 248,
  monthlyRevenue: 42_800_000,
  activeMechanics: 6,
  revenueGrowth: 18,
  ordersGrowth: 12,
};

export const mockCustomers: Customer[] = [
  { id: 1, name: 'Jasur Toshmatov',  phone: '+998 90 123 45 67', joinedAt: '2024-01-15', cars: [1] },
  { id: 2, name: 'Sardor Alimov',    phone: '+998 91 234 56 78', joinedAt: '2024-02-20', cars: [2, 3] },
  { id: 3, name: 'Dilnoza Karimova', phone: '+998 93 345 67 89', joinedAt: '2024-03-05', cars: [4] },
  { id: 4, name: 'Bobur Nazarov',    phone: '+998 94 456 78 90', joinedAt: '2024-04-10', cars: [5] },
  { id: 5, name: 'Kamola Yusupova',  phone: '+998 99 567 89 01', joinedAt: '2024-05-18', cars: [6] },
  { id: 6, name: 'Otabek Rашидов',  phone: '+998 97 678 90 12', joinedAt: '2024-06-22', cars: [7] },
  { id: 7, name: 'Malika Sotvoldiyeva', phone: '+998 90 789 01 23', joinedAt: '2024-07-01', cars: [8] },
  { id: 8, name: 'Zafar Mirzayev',   phone: '+998 91 890 12 34', joinedAt: '2024-08-14', cars: [9] },
];

export const mockCars: Car[] = [
  { id: 1, plate: '01 A 777 AA', brand: 'Chevrolet', model: 'Cobalt',  year: 2022, color: 'Oq',     customerId: 1, serviceHistory: [] },
  { id: 2, plate: '10 B 234 CC', brand: 'Chevrolet', model: 'Nexia 3', year: 2021, color: 'Kumush', customerId: 2, serviceHistory: [] },
  { id: 3, plate: '30 D 456 EE', brand: 'Chevrolet', model: 'Malibu',  year: 2023, color: 'Qora',   customerId: 2, serviceHistory: [] },
  { id: 4, plate: '20 F 789 GG', brand: 'Chevrolet', model: 'Tracker', year: 2022, color: 'Ko\'k',  customerId: 3, serviceHistory: [] },
  { id: 5, plate: '40 H 012 II', brand: 'Hyundai',   model: 'Accent',  year: 2020, color: 'Qizil',  customerId: 4, serviceHistory: [] },
  { id: 6, plate: '70 J 345 KK', brand: 'Chevrolet', model: 'Spark',   year: 2019, color: 'Sariq',  customerId: 5, serviceHistory: [] },
  { id: 7, plate: '01 L 678 MM', brand: 'Toyota',    model: 'Camry',   year: 2023, color: 'Oq',     customerId: 6, serviceHistory: [] },
  { id: 8, plate: '50 N 901 OO', brand: 'Chevrolet', model: 'Lacetti', year: 2018, color: 'Kulrang', customerId: 7, serviceHistory: [] },
  { id: 9, plate: '60 P 234 QQ', brand: 'Hyundai',   model: 'Elantra', year: 2021, color: 'Oq',     customerId: 8, serviceHistory: [] },
];

export const mockMechanics: Mechanic[] = [
  { id: 1, name: 'Sardor Qodirov',   specialty: 'Dvigatel',    kpi: 94, completedOrders: 312, monthlyRevenue: 8_200_000 },
  { id: 2, name: 'Javlon Ergashev',  specialty: 'Elektrik',    kpi: 87, completedOrders: 278, monthlyRevenue: 7_100_000 },
  { id: 3, name: 'Bobur Xoliqov',    specialty: 'Tormoz',      kpi: 82, completedOrders: 241, monthlyRevenue: 6_500_000 },
  { id: 4, name: 'Ulug\'bek Saidov', specialty: 'Moy/filtr',   kpi: 76, completedOrders: 198, monthlyRevenue: 5_900_000 },
  { id: 5, name: 'Ravshan Normatov', specialty: 'Transmissiya', kpi: 71, completedOrders: 167, monthlyRevenue: 5_200_000 },
  { id: 6, name: 'Doniyor Tillayev', specialty: 'Universal',   kpi: 68, completedOrders: 143, monthlyRevenue: 4_800_000 },
];

export const mockOrders: WorkOrder[] = [
  { id: 1,  orderNumber: 'WO-2024-001', customerId: 1, carId: 1, status: 'active',    mechanicIds: [1], startDate: '2026-06-20', totalCost: 450_000, description: 'Moy almashtirish + filtr' },
  { id: 2,  orderNumber: 'WO-2024-002', customerId: 2, carId: 2, status: 'pending',   mechanicIds: [2], startDate: '2026-06-21', totalCost: 1_200_000, description: 'Tormoz kolodka almashtirish' },
  { id: 3,  orderNumber: 'WO-2024-003', customerId: 3, carId: 4, status: 'done',      mechanicIds: [3], startDate: '2026-06-19', endDate: '2026-06-20', totalCost: 2_800_000, description: 'Dvigatel ta\'miri' },
  { id: 4,  orderNumber: 'WO-2024-004', customerId: 4, carId: 5, status: 'active',    mechanicIds: [1, 2], startDate: '2026-06-22', totalCost: 650_000, description: 'Shina almashtirish' },
  { id: 5,  orderNumber: 'WO-2024-005', customerId: 5, carId: 6, status: 'pending',   mechanicIds: [4], startDate: '2026-06-22', totalCost: 380_000, description: 'Texnik ko\'rik' },
  { id: 6,  orderNumber: 'WO-2024-006', customerId: 6, carId: 7, status: 'done',      mechanicIds: [5], startDate: '2026-06-18', endDate: '2026-06-19', totalCost: 920_000, description: 'Elektr tizimi' },
  { id: 7,  orderNumber: 'WO-2024-007', customerId: 7, carId: 8, status: 'cancelled', mechanicIds: [6], startDate: '2026-06-17', totalCost: 0, description: 'Mijoz bekor qildi' },
  { id: 8,  orderNumber: 'WO-2024-008', customerId: 8, carId: 9, status: 'active',    mechanicIds: [3], startDate: '2026-06-22', totalCost: 540_000, description: 'Konditsioner ta\'miri' },
  { id: 9,  orderNumber: 'WO-2024-009', customerId: 1, carId: 1, status: 'done',    mechanicIds: [1], startDate: '2026-06-15', endDate: '2026-06-16', totalCost: 1_100_000, description: 'Transmissiya yog\'i' },
  { id: 10, orderNumber: 'WO-2024-010', customerId: 2, carId: 3, status: 'pending', mechanicIds: [2], startDate: '2026-06-22', totalCost: 300_000, description: 'Xavfsizlik tekshiruvi' },
  { id: 11, orderNumber: 'WO-2024-011', customerId: 4, carId: 5, status: 'done',    mechanicIds: [4], startDate: '2026-06-07', endDate: '2026-06-08', totalCost: 750_000, description: 'Karbyurator tozalash' },
  { id: 12, orderNumber: 'WO-2024-012', customerId: 5, carId: 6, status: 'done',    mechanicIds: [2], startDate: '2026-06-04', endDate: '2026-06-05', totalCost: 480_000, description: 'Akkumulyator almashtirish' },
  { id: 13, orderNumber: 'WO-2024-013', customerId: 7, carId: 8, status: 'done',    mechanicIds: [3], startDate: '2026-06-10', endDate: '2026-06-11', totalCost: 1_350_000, description: 'Suv nasosi ta\'miri' },
  { id: 14, orderNumber: 'WO-2024-014', customerId: 3, carId: 4, status: 'done',    mechanicIds: [5], startDate: '2026-05-28', endDate: '2026-05-30', totalCost: 2_100_000, description: 'Mufta almashtirish' },
  { id: 15, orderNumber: 'WO-2024-015', customerId: 6, carId: 7, status: 'done',    mechanicIds: [1], startDate: '2026-05-24', endDate: '2026-05-25', totalCost: 600_000, description: 'To\'xtatgich ta\'miri' },
];

export const mockParts: Part[] = [
  { id: 1, name: 'Moy filtri',         barcode: '4600012345678', category: 'Filtr',   price: 45_000,  quantity: 24, minThreshold: 5, supplier: 'AutoParts UZ' },
  { id: 2, name: 'Havo filtri',        barcode: '4600023456789', category: 'Filtr',   price: 38_000,  quantity: 18, minThreshold: 5, supplier: 'AutoParts UZ' },
  { id: 3, name: 'Tormoz kolodkasi',   barcode: '4600034567890', category: 'Tormoz',  price: 120_000, quantity: 8,  minThreshold: 4, supplier: 'Bosch UZ' },
  { id: 4, name: 'Motor moyi 5W-30',   barcode: '4600045678901', category: 'Moy',     price: 85_000,  quantity: 3,  minThreshold: 10, supplier: 'Mobil 1' },
  { id: 5, name: 'Spark plug NGK',     barcode: '4600056789012', category: 'Elektrik',price: 28_000,  quantity: 32, minThreshold: 8, supplier: 'NGK' },
  { id: 6, name: 'Akkumulyator 60Ah',  barcode: '4600067890123', category: 'Elektrik',price: 680_000, quantity: 5,  minThreshold: 2, supplier: 'Varta' },
  { id: 7, name: 'V-kamar',            barcode: '4600078901234', category: 'Motor',   price: 55_000,  quantity: 12, minThreshold: 3, supplier: 'Gates' },
  { id: 8, name: 'Tormoz diski',       barcode: '4600089012345', category: 'Tormoz',  price: 210_000, quantity: 6,  minThreshold: 2, supplier: 'Brembo' },
  { id: 9, name: 'Salон filtri',       barcode: '4600090123456', category: 'Filtr',   price: 32_000,  quantity: 2,  minThreshold: 5, supplier: 'AutoParts UZ' },
  { id: 10, name: 'Shamol qalqoni',    barcode: '4600101234567', category: 'Kuzov',   price: 95_000,  quantity: 9,  minThreshold: 2, supplier: 'Local' },
];

export const mockWashBays: WashBay[] = [
  { id: 1, bayNumber: 1, status: 'washing', carId: 1, washerId: 1, startedAt: '10:30', carPlate: '01 A 777 AA', carBrand: 'Cobalt' },
  { id: 2, bayNumber: 2, status: 'empty' },
  { id: 3, bayNumber: 3, status: 'booked', carId: 2, bookedAt: '11:00', carPlate: '10 B 234 CC', carBrand: 'Nexia 3' },
  { id: 4, bayNumber: 4, status: 'waiting', carId: 4, carPlate: '20 F 789 GG', carBrand: 'Tracker' },
  { id: 5, bayNumber: 5, status: 'washing', carId: 5, washerId: 2, startedAt: '10:45', carPlate: '40 H 012 II', carBrand: 'Accent' },
  { id: 6, bayNumber: 6, status: 'empty' },
];

export const mockReminders: Reminder[] = [
  { id: 1, carId: 1, type: 'oil',     nextKm: 5000,  nextDate: '2026-07-10', smsStatus: 'scheduled', carPlate: '01 A 777 AA', ownerName: 'Jasur Toshmatov',   ownerPhone: '+998 90 123 45 67' },
  { id: 2, carId: 2, type: 'tire',    nextKm: 15000, nextDate: '2026-08-01', smsStatus: 'sent',      carPlate: '10 B 234 CC', ownerName: 'Sardor Alimov',     ownerPhone: '+998 91 234 56 78' },
  { id: 3, carId: 3, type: 'brake',   nextKm: 8000,  nextDate: '2026-07-20', smsStatus: 'scheduled', carPlate: '30 D 456 EE', ownerName: 'Sardor Alimov',     ownerPhone: '+998 91 234 56 78' },
  { id: 4, carId: 4, type: 'service', nextKm: 10000, nextDate: '2026-09-01', smsStatus: 'failed',    carPlate: '20 F 789 GG', ownerName: 'Dilnoza Karimova',  ownerPhone: '+998 93 345 67 89' },
  { id: 5, carId: 6, type: 'oil',     nextKm: 3000,  nextDate: '2026-07-05', smsStatus: 'scheduled', carPlate: '70 J 345 KK', ownerName: 'Kamola Yusupova',   ownerPhone: '+998 99 567 89 01' },
];

export const mockRevenueChart = [
  { month: 'Yan', revenue: 28_000_000, orders: 89 },
  { month: 'Fev', revenue: 31_500_000, orders: 102 },
  { month: 'Mar', revenue: 27_800_000, orders: 91 },
  { month: 'Apr', revenue: 35_200_000, orders: 118 },
  { month: 'May', revenue: 38_900_000, orders: 127 },
  { month: 'Iyn', revenue: 42_800_000, orders: 141 },
];

export const mockAccounting: MonthlyAccounting[] = [
  { month: '2026-01', income: 28_400_000, parts: 8_200_000, electricity: 1_350_000, utilities: 920_000,  profit: 17_930_000 },
  { month: '2026-02', income: 31_800_000, parts: 9_100_000, electricity: 1_280_000, utilities: 880_000,  profit: 20_540_000 },
  { month: '2026-03', income: 38_500_000, parts: 10_800_000, electricity: 950_000,  utilities: 820_000,  profit: 25_930_000 },
  { month: '2026-04', income: 42_100_000, parts: 12_300_000, electricity: 880_000,  utilities: 780_000,  profit: 28_140_000 },
  { month: '2026-05', income: 39_600_000, parts: 11_200_000, electricity: 1_050_000, utilities: 850_000, profit: 26_500_000 },
  { month: '2026-06', income: 43_200_000, parts: 11_800_000, electricity: 1_420_000, utilities: 950_000, profit: 29_030_000 },
];
