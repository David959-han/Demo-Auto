import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ─── TENANT ─────────────────────────────────────────────────────────────────
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'yantar-demo' },
    update: {},
    create: {
      name: 'Yantar Auto Service',
      slug: 'yantar-demo',
      phone: '+971501234567',
      email: 'info@yantar-auto.ae',
      address: 'Sheikh Zayed Road, Dubai',
      city: 'Dubai',
      country: 'AE',
      currency: 'AED',
      vatRate: 5,
      vatNumber: 'AE123456789',
    },
  })

  console.log('✓ Tenant created:', tenant.slug)

  // ─── USERS ──────────────────────────────────────────────────────────────────
  const password = await bcrypt.hash('demo1234', 12)

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'boss@demo.yantar' },
      update: {},
      create: {
        email: 'boss@demo.yantar',
        passwordHash: password,
        name: 'Ahmed Al-Mansouri',
        role: 'boss',
        tenantId: tenant.id,
      },
    }),
    prisma.user.upsert({
      where: { email: 'mechanic@demo.yantar' },
      update: {},
      create: {
        email: 'mechanic@demo.yantar',
        passwordHash: password,
        name: 'Samir Al-Shamri',
        role: 'mechanic',
        tenantId: tenant.id,
      },
    }),
    prisma.user.upsert({
      where: { email: 'washer@demo.yantar' },
      update: {},
      create: {
        email: 'washer@demo.yantar',
        passwordHash: password,
        name: 'Fahad Al-Dosari',
        role: 'washer',
        tenantId: tenant.id,
      },
    }),
  ])

  console.log(`✓ ${users.length} users created`)

  // ─── MECHANICS ──────────────────────────────────────────────────────────────
  const mechanicData = [
    { name: 'Ahmed Al-Balushi', specialty: 'Engine & Transmission', kpi: 94, completedOrders: 87, monthlyRevenue: 12400 },
    { name: 'Samir Al-Shamri', specialty: 'Electrical Systems', kpi: 88, completedOrders: 72, monthlyRevenue: 9800 },
    { name: 'Rashid Al-Kaabi', specialty: 'Suspension & Brakes', kpi: 91, completedOrders: 65, monthlyRevenue: 10200 },
    { name: 'Nasser Al-Mutairi', specialty: 'AC & Cooling', kpi: 85, completedOrders: 58, monthlyRevenue: 8600 },
    { name: 'Fahad Al-Dosari', specialty: 'Body & Paint', kpi: 79, completedOrders: 43, monthlyRevenue: 7200 },
    { name: 'Omar Al-Ajmi', specialty: 'Diagnostics', kpi: 96, completedOrders: 102, monthlyRevenue: 15800 },
  ]

  const mechanics = await Promise.all(
    mechanicData.map((m) =>
      prisma.mechanic.create({ data: { ...m, phone: '+97150' + Math.floor(1000000 + Math.random() * 9000000), tenantId: tenant.id } })
    )
  )

  console.log(`✓ ${mechanics.length} mechanics created`)

  // ─── CUSTOMERS ──────────────────────────────────────────────────────────────
  const customerData = [
    { name: 'Ahmed Al-Mansouri', phone: '+971501234567', email: 'ahmed@example.ae', isVip: true },
    { name: 'Mohammed Al-Rashid', phone: '+971552345678', email: 'mohammed@example.ae', isVip: true },
    { name: 'Fatima Al-Otaibi', phone: '+966501234567', email: 'fatima@example.sa', isVip: false },
    { name: 'Khalid Al-Said', phone: '+966552345678', email: 'khalid@example.sa', isVip: false },
    { name: 'Noura Al-Harbi', phone: '+971503456789', isVip: true },
    { name: 'Abdullah Al-Zahrani', phone: '+966503456789', isVip: false },
    { name: 'Mona Al-Omari', phone: '+971504567890', isVip: false },
    { name: 'Saad Al-Qahtani', phone: '+966504567890', isVip: true },
  ]

  const customers = await Promise.all(
    customerData.map((c) =>
      prisma.customer.create({ data: { ...c, tenantId: tenant.id } })
    )
  )

  console.log(`✓ ${customers.length} customers created`)

  // ─── VEHICLES ───────────────────────────────────────────────────────────────
  const vehicleData = [
    { plate: 'A 12345 B', brand: 'Toyota', model: 'Land Cruiser', year: 2022, color: 'White', mileage: 45200 },
    { plate: 'B 67890 C', brand: 'Nissan', model: 'Patrol', year: 2021, color: 'Silver', mileage: 62100 },
    { plate: 'C 11111 D', brand: 'Hyundai', model: 'Sonata', year: 2023, color: 'Black', mileage: 18500 },
    { plate: 'D 22222 E', brand: 'Kia', model: 'Sportage', year: 2020, color: 'Blue', mileage: 78300 },
    { plate: 'E 33333 F', brand: 'Toyota', model: 'Camry', year: 2022, color: 'Gray', mileage: 33700 },
    { plate: 'F 44444 G', brand: 'Nissan', model: 'Altima', year: 2019, color: 'White', mileage: 95400 },
    { plate: 'G 55555 H', brand: 'Hyundai', model: 'Tucson', year: 2021, color: 'Silver', mileage: 41200 },
    { plate: 'H 66666 I', brand: 'Toyota', model: 'Hilux', year: 2023, color: 'Black', mileage: 12800 },
  ]

  const vehicles = await Promise.all(
    vehicleData.map((v, i) =>
      prisma.vehicle.create({
        data: { ...v, customerId: customers[i % customers.length].id, tenantId: tenant.id },
      })
    )
  )

  console.log(`✓ ${vehicles.length} vehicles created`)

  // ─── PARTS ──────────────────────────────────────────────────────────────────
  const partsData = [
    { name: 'Engine Oil 5W-30 (4L)', category: 'Fluids', price: 85, quantity: 42, minThreshold: 10, supplier: 'Al-Futtaim Auto' },
    { name: 'Oil Filter', category: 'Filters', price: 25, quantity: 38, minThreshold: 10 },
    { name: 'Air Filter', category: 'Filters', price: 45, quantity: 22, minThreshold: 8 },
    { name: 'Brake Pads (Front)', category: 'Brakes', price: 180, quantity: 16, minThreshold: 5 },
    { name: 'Brake Pads (Rear)', category: 'Brakes', price: 150, quantity: 14, minThreshold: 5 },
    { name: 'Spark Plugs Set (4)', category: 'Ignition', price: 120, quantity: 9, minThreshold: 5 },
    { name: 'AC Filter', category: 'AC System', price: 65, quantity: 3, minThreshold: 5 },
    { name: 'Coolant (1L)', category: 'Fluids', price: 35, quantity: 2, minThreshold: 8 },
    { name: 'Wiper Blades', category: 'Exterior', price: 55, quantity: 18, minThreshold: 5 },
    { name: 'Battery 70Ah', category: 'Electrical', price: 320, quantity: 6, minThreshold: 3 },
  ]

  await Promise.all(
    partsData.map((p) =>
      prisma.part.create({ data: { ...p, tenantId: tenant.id } })
    )
  )

  console.log(`✓ ${partsData.length} parts created`)

  // ─── WASH BAYS ──────────────────────────────────────────────────────────────
  const bayData = [
    { bayNumber: 1, status: 'washing', plate: 'A 12345 B', brand: 'Toyota' },
    { bayNumber: 2, status: 'booked', plate: 'C 11111 D', brand: 'Hyundai' },
    { bayNumber: 3, status: 'empty' },
    { bayNumber: 4, status: 'waiting', plate: 'E 33333 F', brand: 'Toyota' },
  ]

  await Promise.all(
    bayData.map((b) =>
      prisma.washBay.upsert({
        where: { tenantId_bayNumber: { tenantId: tenant.id, bayNumber: b.bayNumber } },
        update: b,
        create: { ...b, tenantId: tenant.id },
      })
    )
  )

  console.log('✓ 4 wash bays created')

  // ─── WORK ORDERS ────────────────────────────────────────────────────────────
  const orderStatuses = ['done', 'done', 'active', 'pending', 'done', 'active']
  const orders = await Promise.all(
    orderStatuses.map(async (status, i) => {
      const order = await prisma.workOrder.create({
        data: {
          orderNumber: `WO-${String(i + 1).padStart(4, '0')}`,
          status,
          description: ['Oil change + filter', 'Brake pad replacement', 'AC service', 'Full inspection', 'Transmission service', 'Electrical diagnostics'][i],
          totalCost: [350, 280, 420, 650, 890, 180][i],
          customerId: customers[i % customers.length].id,
          vehicleId: vehicles[i % vehicles.length].id,
          tenantId: tenant.id,
          endDate: status === 'done' ? new Date() : null,
        },
      })

      await prisma.orderMechanic.create({
        data: { workOrderId: order.id, mechanicId: mechanics[i % mechanics.length].id },
      })

      if (status === 'done') {
        await prisma.payment.create({
          data: {
            amount: [350, 280, 420, 650, 890, 180][i],
            method: ['cash', 'card', 'cash'][i % 3],
            isPaid: true,
            paidAt: new Date(),
            workOrderId: order.id,
            tenantId: tenant.id,
          },
        })
      }

      return order
    })
  )

  console.log(`✓ ${orders.length} work orders created`)

  // ─── REMINDERS ──────────────────────────────────────────────────────────────
  await Promise.all([
    prisma.reminder.create({
      data: {
        type: 'oil',
        nextKm: 50000,
        nextDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        vehicleId: vehicles[0].id,
        customerId: customers[0].id,
        tenantId: tenant.id,
      },
    }),
    prisma.reminder.create({
      data: {
        type: 'tire',
        nextKm: 80000,
        nextDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        vehicleId: vehicles[1].id,
        customerId: customers[1].id,
        tenantId: tenant.id,
      },
    }),
  ])

  console.log('✓ 2 reminders created')
  console.log('\n✅ Seed complete!')
  console.log('\nDemo login credentials:')
  console.log('  boss@demo.yantar     / demo1234')
  console.log('  mechanic@demo.yantar / demo1234')
  console.log('  washer@demo.yantar   / demo1234')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
