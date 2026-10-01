export type SeatingArea = 'indoor' | 'balcony' | 'any';
export type ReservationStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'seated';
export type TableStatus = 'available' | 'reserved' | 'occupied';

export interface CafeTable {
  id: string;
  name: string; // e.g. "Table 01"
  area: 'indoor' | 'balcony';
  capacity: number; // e.g. 2, 4, 6, 8, 12
  status: TableStatus;
  currentReservationId?: string;
}

export interface Reservation {
  id: string; // e.g. "TL-8492"
  customerName: string;
  phone: string;
  email?: string;
  date: string; // "YYYY-MM-DD"
  time: string; // "19:30"
  guests: number;
  guestCategory: '1-2' | '3-4' | '5-6' | '7-8' | '9-10' | '11-12+';
  seatingPreference: SeatingArea;
  assignedTableIds: string[];
  status: ReservationStatus;
  isLargeGroup: boolean;
  specialNotes?: string;
  createdAt: string;
}

export interface SlotAvailability {
  status: 'available' | 'limited' | 'fully_booked';
  statusLabel: string;
  indoorTablesAvailable: number;
  balconyTablesAvailable: number;
  recommendedArea: 'indoor' | 'balcony' | 'contact_staff';
  isLargeGroupReq: boolean;
  notes?: string;
}

export interface NotificationItem {
  id: string;
  recipient: 'customer' | 'staff';
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}
