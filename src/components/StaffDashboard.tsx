import React, { useState } from 'react';
import { ShieldCheck, Check, X, Users, Calendar, Clock, AlertTriangle } from 'lucide-react';
import type { CafeTable, Reservation, TableStatus, ReservationStatus } from '../types/reservation';

interface StaffDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  tables: CafeTable[];
  reservations: Reservation[];
  onUpdateReservationStatus: (id: string, newStatus: ReservationStatus, assignedTableId?: string) => void;
  onUpdateTableStatus: (tableId: string, newStatus: TableStatus) => void;
}

export const StaffDashboard: React.FC<StaffDashboardProps> = ({
  isOpen,
  onClose,
  tables,
  reservations,
  onUpdateReservationStatus,
  onUpdateTableStatus,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedTableForAssignment, setSelectedTableForAssignment] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  // Calculate summary stats
  const totalReservations = reservations.length;
  const totalGuests = reservations.reduce((acc, r) => acc + r.guests, 0);
  const pendingCount = reservations.filter((r) => r.status === 'pending').length;
  const confirmedCount = reservations.filter((r) => r.status === 'confirmed').length;

  const filteredReservations = filterStatus === 'all'
    ? reservations
    : reservations.filter((r) => r.status === filterStatus);

  const indoorTables = tables.filter((t) => t.area === 'indoor');
  const balconyTables = tables.filter((t) => t.area === 'balcony');

  return (
    <div className="fixed inset-0 z-50 bg-[#12100e]/98 backdrop-blur-xl flex flex-col overflow-y-auto p-4 md:p-8">
      
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pb-6 border-b border-[#2e2722]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#7d8c79]/20 border border-[#7d8c79]/40 flex items-center justify-center text-[#7d8c79]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-2xl md:text-3xl text-[#faf7f2]">The Leaf. Staff Portal</h2>
              <span className="text-[10px] font-mono uppercase bg-[#7d8c79] text-[#12100e] px-2 py-0.5 rounded-full font-bold">
                LIVE ADMIN
              </span>
            </div>
            <p className="text-xs text-[#c4bcae] font-mono">
              1st Floor, E7/161, Arera Colony, Bhopal · Real-time Table & Booking Manager
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-[#1c1815] hover:bg-[#2e2722] text-[#faf7f2] text-xs font-mono uppercase tracking-widest rounded-full border border-[#2e2722] cursor-pointer transition-colors"
        >
          Close Dashboard
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full py-8 space-y-12">
        
        {/* TODAY Summary Metrics */}
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#7d8c79]">TODAY OVERVIEW</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#1c1815] p-5 rounded-2xl border border-[#2e2722] space-y-1">
              <span className="text-xs text-[#c4bcae] font-mono uppercase">Total Bookings</span>
              <p className="font-serif text-3xl text-[#faf7f2] font-bold">{totalReservations}</p>
            </div>

            <div className="bg-[#1c1815] p-5 rounded-2xl border border-[#2e2722] space-y-1">
              <span className="text-xs text-[#c4bcae] font-mono uppercase">Total Guests</span>
              <p className="font-serif text-3xl text-[#eae3d2] font-bold">{totalGuests}</p>
            </div>

            <div className="bg-[#1c1815] p-5 rounded-2xl border border-[#2e2722] space-y-1">
              <span className="text-xs text-[#c4bcae] font-mono uppercase">Pending Requests</span>
              <p className="font-serif text-3xl text-[#d4a373] font-bold">{pendingCount}</p>
            </div>

            <div className="bg-[#1c1815] p-5 rounded-2xl border border-[#2e2722] space-y-1">
              <span className="text-xs text-[#c4bcae] font-mono uppercase">Confirmed</span>
              <p className="font-serif text-3xl text-[#7d8c79] font-bold">{confirmedCount}</p>
            </div>
          </div>
        </div>

        {/* Real-time Table Availability Map */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#7d8c79]">LIVE TABLE MAP & AVAILABILITY</span>
            <span className="text-xs text-[#c4bcae] font-mono">Click table to toggle status (Available ↔ Reserved ↔ Occupied)</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* INDOOR TABLES */}
            <div className="bg-[#1c1815] p-6 rounded-3xl border border-[#2e2722] space-y-4">
              <div className="flex items-center justify-between border-b border-[#2e2722] pb-3">
                <h3 className="font-serif text-xl text-[#faf7f2]">INDOOR AREA</h3>
                <span className="text-xs font-mono text-[#7d8c79]">{indoorTables.length} Tables</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {indoorTables.map((table) => (
                  <div
                    key={table.id}
                    className="p-4 rounded-2xl border border-[#2e2722] bg-[#12100e] space-y-2 text-center"
                  >
                    <span className="font-serif text-lg text-[#faf7f2] font-semibold block">{table.name}</span>
                    <span className="text-[11px] font-mono text-[#c4bcae] block">{table.capacity} seats</span>
                    
                    <button
                      onClick={() => {
                        const nextStatus: TableStatus =
                          table.status === 'available'
                            ? 'reserved'
                            : table.status === 'reserved'
                            ? 'occupied'
                            : 'available';
                        onUpdateTableStatus(table.id, nextStatus);
                      }}
                      className={`w-full py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer ${
                        table.status === 'available'
                          ? 'bg-[#7d8c79]/20 text-[#7d8c79] border border-[#7d8c79]/40'
                          : table.status === 'reserved'
                          ? 'bg-[#d4a373]/20 text-[#d4a373] border border-[#d4a373]/40'
                          : 'bg-red-500/20 text-red-400 border border-red-500/40'
                      }`}
                    >
                      {table.status}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* BALCONY TABLES */}
            <div className="bg-[#1c1815] p-6 rounded-3xl border border-[#2e2722] space-y-4">
              <div className="flex items-center justify-between border-b border-[#2e2722] pb-3">
                <h3 className="font-serif text-xl text-[#eae3d2]">BALCONY LEAF VIEW</h3>
                <span className="text-xs font-mono text-[#7d8c79]">{balconyTables.length} Tables</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {balconyTables.map((table) => (
                  <div
                    key={table.id}
                    className="p-4 rounded-2xl border border-[#2e2722] bg-[#12100e] space-y-2 text-center"
                  >
                    <span className="font-serif text-lg text-[#faf7f2] font-semibold block">{table.name}</span>
                    <span className="text-[11px] font-mono text-[#c4bcae] block">{table.capacity} seats</span>

                    <button
                      onClick={() => {
                        const nextStatus: TableStatus =
                          table.status === 'available'
                            ? 'reserved'
                            : table.status === 'reserved'
                            ? 'occupied'
                            : 'available';
                        onUpdateTableStatus(table.id, nextStatus);
                      }}
                      className={`w-full py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer ${
                        table.status === 'available'
                          ? 'bg-[#7d8c79]/20 text-[#7d8c79] border border-[#7d8c79]/40'
                          : table.status === 'reserved'
                          ? 'bg-[#d4a373]/20 text-[#d4a373] border border-[#d4a373]/40'
                          : 'bg-red-500/20 text-red-400 border border-red-500/40'
                      }`}
                    >
                      {table.status}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Reservations Manager List */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#7d8c79]">RESERVATIONS MANAGER</span>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {['all', 'pending', 'confirmed', 'seated', 'cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase rounded-full border cursor-pointer transition-colors ${
                    filterStatus === st
                      ? 'bg-[#7d8c79] text-[#12100e] border-[#7d8c79] font-bold'
                      : 'bg-[#1c1815] text-[#c4bcae] border-[#2e2722] hover:text-[#faf7f2]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredReservations.map((res) => (
              <div
                key={res.id}
                className="bg-[#1c1815] p-6 rounded-2xl border border-[#2e2722] hover:border-[#7d8c79]/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Details */}
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-[#7d8c79] font-bold">{res.id}</span>
                    <span className="font-serif text-xl text-[#faf7f2] font-semibold">{res.customerName}</span>
                    {res.isLargeGroup && (
                      <span className="bg-[#d4a373]/20 text-[#d4a373] border border-[#d4a373]/40 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Large Group Request
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs font-mono text-[#c4bcae]">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#7d8c79]" /> {res.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#7d8c79]" /> {res.time}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-[#7d8c79]" /> {res.guests} Guests ({res.guestCategory})</span>
                    <span className="uppercase text-[#eae3d2]">Area: {res.seatingPreference}</span>
                  </div>

                  {res.specialNotes && (
                    <p className="text-xs text-[#c4bcae] italic font-serif">“{res.specialNotes}”</p>
                  )}
                </div>

                {/* Actions & Assign Table */}
                <div className="flex flex-wrap items-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#2e2722]">
                  
                  {/* Table Assignment selector */}
                  <select
                    value={selectedTableForAssignment[res.id] || res.assignedTableIds[0] || ''}
                    onChange={(e) => setSelectedTableForAssignment({ ...selectedTableForAssignment, [res.id]: e.target.value })}
                    className="bg-[#12100e] border border-[#2e2722] rounded-xl px-3 py-2 text-xs font-mono text-[#faf7f2]"
                  >
                    <option value="">Assign Table...</option>
                    {tables.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.area}, {t.capacity}s) - {t.status}
                      </option>
                    ))}
                  </select>

                  {res.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          const tableId = selectedTableForAssignment[res.id] || 'tbl-03';
                          onUpdateReservationStatus(res.id, 'confirmed', tableId);
                        }}
                        className="px-4 py-2 bg-[#7d8c79] hover:bg-[#9ea99b] text-[#12100e] text-xs font-mono font-bold uppercase rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Confirm
                      </button>

                      <button
                        onClick={() => onUpdateReservationStatus(res.id, 'rejected')}
                        className="px-4 py-2 bg-[#12100e] hover:bg-red-900/30 text-red-400 border border-red-500/40 text-xs font-mono uppercase rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" /> Reject
                      </button>
                    </>
                  )}

                  {res.status === 'confirmed' && (
                    <button
                      onClick={() => onUpdateReservationStatus(res.id, 'seated')}
                      className="px-4 py-2 bg-[#eae3d2] hover:bg-[#faf7f2] text-[#12100e] text-xs font-mono font-bold uppercase rounded-xl transition-colors cursor-pointer"
                    >
                      Mark Seated
                    </button>
                  )}

                  {res.status !== 'cancelled' && res.status !== 'rejected' && (
                    <button
                      onClick={() => onUpdateReservationStatus(res.id, 'cancelled')}
                      className="px-3 py-2 text-xs font-mono text-[#c4bcae] hover:text-red-400 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
