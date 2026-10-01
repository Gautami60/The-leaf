import type { CafeTable, Reservation, SlotAvailability, NotificationItem } from '../types/reservation';

export const INITIAL_TABLES: CafeTable[] = [
  // Indoor Area
  { id: 'tbl-01', name: 'Table 01', area: 'indoor', capacity: 2, status: 'available' },
  { id: 'tbl-02', name: 'Table 02', area: 'indoor', capacity: 4, status: 'reserved' },
  { id: 'tbl-03', name: 'Table 03', area: 'indoor', capacity: 4, status: 'available' },
  { id: 'tbl-04', name: 'Table 04', area: 'indoor', capacity: 4, status: 'available' },
  { id: 'tbl-05', name: 'Table 05', area: 'indoor', capacity: 6, status: 'available' },
  { id: 'tbl-06', name: 'Table 06', area: 'indoor', capacity: 8, status: 'available' },
  
  // Balcony Area
  { id: 'tbl-07', name: 'Table 07', area: 'balcony', capacity: 2, status: 'reserved' },
  { id: 'tbl-08', name: 'Table 08', area: 'balcony', capacity: 4, status: 'available' },
  { id: 'tbl-09', name: 'Table 09', area: 'balcony', capacity: 6, status: 'available' },
  { id: 'tbl-10', name: 'Table 10', area: 'balcony', capacity: 4, status: 'available' }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'TL-8492',
    customerName: 'Ananya Verma',
    phone: '+91 98260 12345',
    email: 'ananya@example.com',
    date: new Date().toISOString().split('T')[0],
    time: '19:30',
    guests: 4,
    guestCategory: '3-4',
    seatingPreference: 'balcony',
    assignedTableIds: ['tbl-08'],
    status: 'confirmed',
    isLargeGroup: false,
    specialNotes: 'Anniversary dinner by balcony',
    createdAt: '10 mins ago'
  },
  {
    id: 'TL-9120',
    customerName: 'Rahul Mehta',
    phone: '+91 99770 54321',
    email: 'rahul.m@example.com',
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    guests: 2,
    guestCategory: '1-2',
    seatingPreference: 'indoor',
    assignedTableIds: ['tbl-01'],
    status: 'pending',
    isLargeGroup: false,
    specialNotes: 'Quiet corner for business discussion',
    createdAt: '25 mins ago'
  },
  {
    id: 'TL-7301',
    customerName: 'Vikramaditya Singh',
    phone: '+91 94250 88990',
    email: 'singh.v@example.com',
    date: new Date().toISOString().split('T')[0],
    time: '20:30',
    guests: 12,
    guestCategory: '11-12+',
    seatingPreference: 'any',
    assignedTableIds: [],
    status: 'pending',
    isLargeGroup: true,
    specialNotes: 'Corporate team reunion celebration (12 people)',
    createdAt: '1 hour ago'
  },
  {
    id: 'TL-5541',
    customerName: 'Pooja Saxena',
    phone: '+91 98930 44556',
    email: 'pooja.s@example.com',
    date: new Date().toISOString().split('T')[0],
    time: '18:00',
    guests: 4,
    guestCategory: '3-4',
    seatingPreference: 'indoor',
    assignedTableIds: ['tbl-02'],
    status: 'seated',
    isLargeGroup: false,
    specialNotes: 'Arrived at 6 PM',
    createdAt: '2 hours ago'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    recipient: 'staff',
    title: '⚠️ Large Group Request',
    message: 'Reservation TL-7301 (12 guests) requires table arrangement confirmation.',
    type: 'warning',
    timestamp: '1 hour ago',
    read: false
  },
  {
    id: 'notif-2',
    recipient: 'customer',
    title: 'Reservation Request Received',
    message: 'Your booking request TL-9120 for 2 guests at 8:00 PM is pending café confirmation.',
    type: 'info',
    timestamp: '25 mins ago',
    read: true
  },
  {
    id: 'notif-3',
    recipient: 'staff',
    title: 'New Booking Received',
    message: 'Reservation TL-8492 (4 guests, Balcony) has been confirmed.',
    type: 'success',
    timestamp: '10 mins ago',
    read: false
  }
];

/**
 * Dynamic Live Availability Calculator based on Tables + Existing Reservations + Guest Count + Time Slot
 */
export function calculateLiveAvailability(
  tables: CafeTable[],
  reservations: Reservation[],
  date: string,
  time: string,
  seatingPreference: 'indoor' | 'balcony' | 'any',
  guests: number
): SlotAvailability {
  // If 10+ guests, flagged as large group request
  if (guests >= 10) {
    return {
      status: 'limited',
      statusLabel: 'Large Group Request Required',
      indoorTablesAvailable: 1,
      balconyTablesAvailable: 0,
      recommendedArea: 'contact_staff',
      isLargeGroupReq: true,
      notes: 'Large group reservation — subject to table arrangement and café confirmation.'
    };
  }

  // Filter active reservations conflicting with slot (within +- 90 mins)
  const activeConflictingReservations = reservations.filter((r) => {
    if (r.date !== date || r.status === 'rejected' || r.status === 'cancelled') return false;
    
    // Check time overlap (assuming 1.5 hour booking slot)
    const [reqH, reqM] = time.split(':').map(Number);
    const [resH, resM] = r.time.split(':').map(Number);
    const reqMinutes = reqH * 60 + reqM;
    const resMinutes = resH * 60 + resM;

    return Math.abs(reqMinutes - resMinutes) < 90;
  });

  const assignedTableIds = new Set(activeConflictingReservations.flatMap((r) => r.assignedTableIds));

  // Count unassigned available tables per area suitable for guest count
  const unassignedTables = tables.filter((t) => !assignedTableIds.has(t.id) && t.status !== 'occupied');

  const availableIndoor = unassignedTables.filter((t) => t.area === 'indoor' && t.capacity >= guests).length;
  const availableBalcony = unassignedTables.filter((t) => t.area === 'balcony' && t.capacity >= guests).length;

  const totalMatching = seatingPreference === 'indoor'
    ? availableIndoor
    : seatingPreference === 'balcony'
    ? availableBalcony
    : availableIndoor + availableBalcony;

  let status: 'available' | 'limited' | 'fully_booked' = 'available';
  let statusLabel = '🟢 Tables Available';

  if (totalMatching === 0) {
    status = 'fully_booked';
    statusLabel = '🔴 Fully Booked';
  } else if (totalMatching <= 2) {
    status = 'limited';
    statusLabel = '🟡 Limited Availability';
  }

  return {
    status,
    statusLabel,
    indoorTablesAvailable: availableIndoor,
    balconyTablesAvailable: availableBalcony,
    recommendedArea: availableBalcony >= availableIndoor ? 'balcony' : 'indoor',
    isLargeGroupReq: false,
    notes: totalMatching > 0 ? `${totalMatching} suitable table(s) ready for your party.` : 'No direct single table matching party size for this exact time.'
  };
}
