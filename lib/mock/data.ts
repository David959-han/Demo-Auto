import type {
  Customer, Car, WorkOrder, Mechanic,
  Part, WashBay, Reminder, DashboardStats, MonthlyAccounting,
} from '@/types';

export const mockStats: DashboardStats = {
  todayOrders: 14,
  totalCustomers: 248,
  monthlyRevenue: 42_800,
  activeMechanics: 6,
  revenueGrowth: 18,
  ordersGrowth: 12,
};

export const mockCustomers: Customer[] = [
  { id: 1, name: 'Ahmed Al-Mansouri',   phone: '+971 50 123 4567', joinedAt: '2024-01-15', cars: [1] },
  { id: 2, name: 'Mohammed Al-Rashid',  phone: '+971 55 234 5678', joinedAt: '2024-02-20', cars: [2, 3] },
  { id: 3, name: 'Fatima Al-Otaibi',    phone: '+966 50 345 6789', joinedAt: '2024-03-05', cars: [4] },
  { id: 4, name: 'Khalid Al-Said',      phone: '+971 56 456 7890', joinedAt: '2024-04-10', cars: [5] },
  { id: 5, name: 'Noura Al-Harbi',      phone: '+966 54 567 8901', joinedAt: '2024-05-18', cars: [6] },
  { id: 6, name: 'Abdullah Al-Zahrani', phone: '+971 52 678 9012', joinedAt: '2024-06-22', cars: [7] },
  { id: 7, name: 'Mona Al-Omari',       phone: '+966 55 789 0123', joinedAt: '2024-07-01', cars: [8] },
  { id: 8, name: 'Saad Al-Qahtani',     phone: '+971 58 890 1234', joinedAt: '2024-08-14', cars: [9] },
];

export const mockCars: Car[] = [
  { id: 1, plate: 'A 12345 B', brand: 'Toyota',  model: 'Land Cruiser', year: 2022, color: 'White',  customerId: 1, serviceHistory: [] },
  { id: 2, plate: 'B 23456 C', brand: 'Nissan',  model: 'Altima',       year: 2021, color: 'Silver', customerId: 2, serviceHistory: [] },
  { id: 3, plate: 'C 34567 D', brand: 'Toyota',  model: 'Prado',        year: 2023, color: 'Black',  customerId: 2, serviceHistory: [] },
  { id: 4, plate: 'D 45678 E', brand: 'Hyundai', model: 'Tucson',       year: 2022, color: 'Blue',   customerId: 3, serviceHistory: [] },
  { id: 5, plate: 'E 56789 F', brand: 'Kia',     model: 'Sportage',     year: 2020, color: 'White',  customerId: 4, serviceHistory: [] },
  { id: 6, plate: 'F 67890 G', brand: 'Toyota',  model: 'Camry',        year: 2021, color: 'Gray',   customerId: 5, serviceHistory: [] },
  { id: 7, plate: 'G 78901 H', brand: 'Toyota',  model: 'Hilux',        year: 2023, color: 'White',  customerId: 6, serviceHistory: [] },
  { id: 8, plate: 'H 89012 I', brand: 'Nissan',  model: 'Patrol',       year: 2019, color: 'Black',  customerId: 7, serviceHistory: [] },
  { id: 9, plate: 'I 90123 J', brand: 'Hyundai', model: 'Sonata',       year: 2021, color: 'Silver', customerId: 8, serviceHistory: [] },
];

export const mockMechanics: Mechanic[] = [
  { id: 1, name: 'Ahmed Al-Balushi',  specialty: 'Engine & Transmission', kpi: 94, completedOrders: 312, monthlyRevenue: 12_400 },
  { id: 2, name: 'Samir Al-Shamri',   specialty: 'Electrical Systems',    kpi: 87, completedOrders: 278, monthlyRevenue: 9_800  },
  { id: 3, name: 'Rashid Al-Kaabi',   specialty: 'Suspension & Brakes',   kpi: 82, completedOrders: 241, monthlyRevenue: 10_200 },
  { id: 4, name: 'Nasser Al-Mutairi', specialty: 'AC & Cooling',          kpi: 76, completedOrders: 198, monthlyRevenue: 8_600  },
  { id: 5, name: 'Fahad Al-Dosari',   specialty: 'Body & Paint',          kpi: 71, completedOrders: 167, monthlyRevenue: 7_200  },
  { id: 6, name: 'Omar Al-Ajmi',      specialty: 'Diagnostics',           kpi: 68, completedOrders: 143, monthlyRevenue: 6_500  },
];

export const mockOrders: WorkOrder[] = [
  { id: 1,  orderNumber: 'WO-0001', customerId: 1, carId: 1, status: 'active',    mechanicIds: [1], startDate: '2026-06-20', totalCost: 450,   description: 'Oil change + filter' },
  { id: 2,  orderNumber: 'WO-0002', customerId: 2, carId: 2, status: 'pending',   mechanicIds: [2], startDate: '2026-06-21', totalCost: 1_200, description: 'Brake pad replacement' },
  { id: 3,  orderNumber: 'WO-0003', customerId: 3, carId: 4, status: 'done',      mechanicIds: [3], startDate: '2026-06-19', endDate: '2026-06-20', totalCost: 2_800, description: 'Engine repair' },
  { id: 4,  orderNumber: 'WO-0004', customerId: 4, carId: 5, status: 'active',    mechanicIds: [1, 2], startDate: '2026-06-22', totalCost: 650,   description: 'Tire replacement' },
  { id: 5,  orderNumber: 'WO-0005', customerId: 5, carId: 6, status: 'pending',   mechanicIds: [4], startDate: '2026-06-22', totalCost: 380,   description: 'Technical inspection' },
  { id: 6,  orderNumber: 'WO-0006', customerId: 6, carId: 7, status: 'done',      mechanicIds: [5], startDate: '2026-06-18', endDate: '2026-06-19', totalCost: 920,   description: 'Electrical system repair' },
  { id: 7,  orderNumber: 'WO-0007', customerId: 7, carId: 8, status: 'cancelled', mechanicIds: [6], startDate: '2026-06-17', totalCost: 0,     description: 'Cancelled by client' },
  { id: 8,  orderNumber: 'WO-0008', customerId: 8, carId: 9, status: 'active',    mechanicIds: [3], startDate: '2026-06-22', totalCost: 540,   description: 'AC service' },
  { id: 9,  orderNumber: 'WO-0009', customerId: 1, carId: 1, status: 'done',      mechanicIds: [1], startDate: '2026-06-15', endDate: '2026-06-16', totalCost: 1_100, description: 'Transmission fluid change' },
  { id: 10, orderNumber: 'WO-0010', customerId: 2, carId: 3, status: 'pending',   mechanicIds: [2], startDate: '2026-06-22', totalCost: 300,   description: 'Safety inspection' },
  { id: 11, orderNumber: 'WO-0011', customerId: 4, carId: 5, status: 'done',      mechanicIds: [4], startDate: '2026-06-07', endDate: '2026-06-08', totalCost: 750,   description: 'Carburetor cleaning' },
  { id: 12, orderNumber: 'WO-0012', customerId: 5, carId: 6, status: 'done',      mechanicIds: [2], startDate: '2026-06-04', endDate: '2026-06-05', totalCost: 480,   description: 'Battery replacement' },
  { id: 13, orderNumber: 'WO-0013', customerId: 7, carId: 8, status: 'done',      mechanicIds: [3], startDate: '2026-06-10', endDate: '2026-06-11', totalCost: 1_350, description: 'Water pump repair' },
  { id: 14, orderNumber: 'WO-0014', customerId: 3, carId: 4, status: 'done',      mechanicIds: [5], startDate: '2026-05-28', endDate: '2026-05-30', totalCost: 2_100, description: 'Clutch replacement' },
  { id: 15, orderNumber: 'WO-0015', customerId: 6, carId: 7, status: 'done',      mechanicIds: [1], startDate: '2026-05-24', endDate: '2026-05-25', totalCost: 600,   description: 'Suspension repair' },
];

export const mockParts: Part[] = [
  { id: 1,  name: 'Oil Filter',          barcode: '4600012345678', category: 'Filters',    price: 25,  quantity: 24, minThreshold: 5,  supplier: 'Al-Futtaim Auto' },
  { id: 2,  name: 'Air Filter',          barcode: '4600023456789', category: 'Filters',    price: 38,  quantity: 18, minThreshold: 5,  supplier: 'Al-Futtaim Auto' },
  { id: 3,  name: 'Brake Pads (Front)',  barcode: '4600034567890', category: 'Brakes',     price: 180, quantity: 8,  minThreshold: 4,  supplier: 'Bosch ME' },
  { id: 4,  name: 'Engine Oil 5W-30',    barcode: '4600045678901', category: 'Fluids',     price: 85,  quantity: 3,  minThreshold: 10, supplier: 'Mobil 1' },
  { id: 5,  name: 'Spark Plugs (NGK)',   barcode: '4600056789012', category: 'Ignition',   price: 28,  quantity: 32, minThreshold: 8,  supplier: 'NGK' },
  { id: 6,  name: 'Battery 70Ah',        barcode: '4600067890123', category: 'Electrical', price: 320, quantity: 5,  minThreshold: 2,  supplier: 'Varta' },
  { id: 7,  name: 'Drive Belt',          barcode: '4600078901234', category: 'Engine',     price: 55,  quantity: 12, minThreshold: 3,  supplier: 'Gates' },
  { id: 8,  name: 'Brake Disc',          barcode: '4600089012345', category: 'Brakes',     price: 210, quantity: 6,  minThreshold: 2,  supplier: 'Brembo' },
  { id: 9,  name: 'Cabin Air Filter',    barcode: '4600090123456', category: 'Filters',    price: 32,  quantity: 2,  minThreshold: 5,  supplier: 'Al-Futtaim Auto' },
  { id: 10, name: 'Windshield Wipers',   barcode: '4600101234567', category: 'Exterior',   price: 55,  quantity: 9,  minThreshold: 2,  supplier: 'Bosch ME' },
];

export const mockWashBays: WashBay[] = [
  { id: 1, bayNumber: 1, status: 'washing', carId: 1, washerId: 1, startedAt: '10:30', carPlate: 'A 12345 B', carBrand: 'Toyota' },
  { id: 2, bayNumber: 2, status: 'empty' },
  { id: 3, bayNumber: 3, status: 'booked',  carId: 2, bookedAt: '11:00', carPlate: 'B 23456 C', carBrand: 'Nissan' },
  { id: 4, bayNumber: 4, status: 'waiting', carId: 4, carPlate: 'D 45678 E', carBrand: 'Hyundai' },
  { id: 5, bayNumber: 5, status: 'washing', carId: 5, washerId: 2, startedAt: '10:45', carPlate: 'E 56789 F', carBrand: 'Kia' },
  { id: 6, bayNumber: 6, status: 'empty' },
];

export const mockReminders: Reminder[] = [
  { id: 1, carId: 1, type: 'oil',     nextKm: 50000, nextDate: '2026-07-10', smsStatus: 'scheduled', carPlate: 'A 12345 B', ownerName: 'Ahmed Al-Mansouri',   ownerPhone: '+971 50 123 4567' },
  { id: 2, carId: 2, type: 'tire',    nextKm: 80000, nextDate: '2026-08-01', smsStatus: 'sent',      carPlate: 'B 23456 C', ownerName: 'Mohammed Al-Rashid',  ownerPhone: '+971 55 234 5678' },
  { id: 3, carId: 3, type: 'brake',   nextKm: 75000, nextDate: '2026-07-20', smsStatus: 'scheduled', carPlate: 'C 34567 D', ownerName: 'Mohammed Al-Rashid',  ownerPhone: '+971 55 234 5678' },
  { id: 4, carId: 4, type: 'service', nextKm: 90000, nextDate: '2026-09-01', smsStatus: 'failed',    carPlate: 'D 45678 E', ownerName: 'Fatima Al-Otaibi',    ownerPhone: '+966 50 345 6789' },
  { id: 5, carId: 6, type: 'oil',     nextKm: 45000, nextDate: '2026-07-05', smsStatus: 'scheduled', carPlate: 'F 67890 G', ownerName: 'Noura Al-Harbi',      ownerPhone: '+966 54 567 8901' },
];

export const mockRevenueChart = [
  { month: 'Jan', revenue: 28_000, orders: 89 },
  { month: 'Feb', revenue: 31_500, orders: 102 },
  { month: 'Mar', revenue: 27_800, orders: 91 },
  { month: 'Apr', revenue: 35_200, orders: 118 },
  { month: 'May', revenue: 38_900, orders: 127 },
  { month: 'Jun', revenue: 42_800, orders: 141 },
];

export const mockAccounting: MonthlyAccounting[] = [
  { month: '2026-01', income: 28_400, parts: 8_200, electricity: 1_350, utilities: 920, profit: 17_930 },
  { month: '2026-02', income: 31_800, parts: 9_100, electricity: 1_280, utilities: 880, profit: 20_540 },
  { month: '2026-03', income: 38_500, parts: 10_800, electricity: 950,  utilities: 820, profit: 25_930 },
  { month: '2026-04', income: 42_100, parts: 12_300, electricity: 880,  utilities: 780, profit: 28_140 },
  { month: '2026-05', income: 39_600, parts: 11_200, electricity: 1_050, utilities: 850, profit: 26_500 },
  { month: '2026-06', income: 43_200, parts: 11_800, electricity: 1_420, utilities: 950, profit: 29_030 },
];
