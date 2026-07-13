import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// ─── FETCH HELPER ─────────────────────────────────────────────────────────────
async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`)
  }
  return res.json()
}

// ─── STATS ────────────────────────────────────────────────────────────────────
export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: () => apiFetch<Record<string, unknown>>('/api/stats'),
    refetchInterval: 60_000,
  })
}

// ─── CUSTOMERS ────────────────────────────────────────────────────────────────
export function useCustomers(params?: { search?: string; page?: number }) {
  const search = params?.search ?? ''
  const page = params?.page ?? 1
  return useQuery({
    queryKey: ['customers', search, page],
    queryFn: () =>
      apiFetch<{ items: unknown[]; total: number }>(
        `/api/customers?search=${encodeURIComponent(search)}&page=${page}`
      ),
  })
}

export function useCreateCustomer() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      apiFetch('/api/customers', { method: 'POST', body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['customers'] }),
  })
}

export function useUpdateCustomer() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Record<string, unknown>) =>
      apiFetch(`/api/customers/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['customers'] }),
  })
}

export function useDeleteCustomer() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiFetch(`/api/customers/${id}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['customers'] }),
  })
}

// ─── ORDERS ───────────────────────────────────────────────────────────────────
export function useOrders(params?: { status?: string; page?: number }) {
  const status = params?.status ?? ''
  const page = params?.page ?? 1
  return useQuery({
    queryKey: ['orders', status, page],
    queryFn: () =>
      apiFetch<{ items: unknown[]; total: number }>(
        `/api/orders?${status ? `status=${status}&` : ''}page=${page}`
      ),
    refetchInterval: 30_000,
  })
}

export function useCreateOrder() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      apiFetch('/api/orders', { method: 'POST', body: JSON.stringify(data) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['orders'] })
      qc.invalidateQueries({ queryKey: ['stats'] })
    },
  })
}

export function useUpdateOrder() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Record<string, unknown>) =>
      apiFetch(`/api/orders/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['orders'] })
      qc.invalidateQueries({ queryKey: ['stats'] })
    },
  })
}

// ─── MECHANICS ────────────────────────────────────────────────────────────────
export function useMechanics() {
  return useQuery({
    queryKey: ['mechanics'],
    queryFn: () => apiFetch<{ items: unknown[] }>('/api/mechanics'),
  })
}

// ─── PARTS ────────────────────────────────────────────────────────────────────
export function useParts(lowStock = false) {
  return useQuery({
    queryKey: ['parts', lowStock],
    queryFn: () =>
      apiFetch<{ items: unknown[] }>(`/api/parts${lowStock ? '?lowStock=true' : ''}`),
  })
}

// ─── WASH BAYS ────────────────────────────────────────────────────────────────
export function useWashBays() {
  return useQuery({
    queryKey: ['wash-bays'],
    queryFn: () => apiFetch<{ items: unknown[] }>('/api/wash-bays'),
    refetchInterval: 15_000,
  })
}

export function useUpdateWashBay() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      apiFetch('/api/wash-bays', { method: 'PATCH', body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['wash-bays'] }),
  })
}

// ─── REMINDERS ────────────────────────────────────────────────────────────────
export function useReminders(upcoming = false) {
  return useQuery({
    queryKey: ['reminders', upcoming],
    queryFn: () =>
      apiFetch<{ items: unknown[] }>(`/api/reminders${upcoming ? '?upcoming=true' : ''}`),
  })
}
