export type Locale = 'uz' | 'en' | 'ar';

export type Role = 'boss' | 'mechanic' | 'washer';

export type OrderStatus = 'pending' | 'active' | 'done' | 'cancelled';

export type WashStatus = 'washing' | 'empty' | 'booked' | 'waiting';

export interface User {
  name: string;
  role: Role;
  locale: Locale;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string;
  joinedAt: string;
  cars: number[];
}

export interface Car {
  id: number;
  plate: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  customerId: number;
  serviceHistory: ServiceRecord[];
}

export interface ServiceRecord {
  id: number;
  carId: number;
  date: string;
  type: string;
  description: string;
  cost: number;
  mechanicId: number;
  parts: Part[];
  status: OrderStatus;
}

export interface WorkOrder {
  id: number;
  orderNumber: string;
  customerId: number;
  carId: number;
  status: OrderStatus;
  mechanicIds: number[];
  startDate: string;
  endDate?: string;
  totalCost: number;
  description: string;
}

export interface Mechanic {
  id: number;
  name: string;
  specialty: string;
  kpi: number;
  completedOrders: number;
  monthlyRevenue: number;
  avatar?: string;
}

export interface Part {
  id: number;
  name: string;
  barcode: string;
  category: string;
  price: number;
  quantity: number;
  minThreshold: number;
  supplier: string;
}

export interface WashBay {
  id: number;
  bayNumber: number;
  status: WashStatus;
  carId?: number;
  washerId?: number;
  startedAt?: string;
  bookedAt?: string;
  carPlate?: string;
  carBrand?: string;
}

export interface Reminder {
  id: number;
  carId: number;
  type: 'oil' | 'tire' | 'brake' | 'service';
  nextKm: number;
  nextDate: string;
  smsStatus: 'scheduled' | 'sent' | 'failed';
  carPlate: string;
  ownerName: string;
  ownerPhone: string;
}

export interface DashboardStats {
  todayOrders: number;
  totalCustomers: number;
  monthlyRevenue: number;
  activeMechanics: number;
  revenueGrowth: number;
  ordersGrowth: number;
}
