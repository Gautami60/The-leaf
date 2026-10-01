import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, Users, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';
import type { CafeTable, Reservation, SeatingArea } from '../types/reservation';
import { calculateLiveAvailability } from '../data/reservationStore';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tables: CafeTable[];
  reservations: Reservation[];
  onNewReservation: (newRes: Reservation) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  tables,
  reservations,
  onNewReservation,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState('19:30');
  const [guestCategory, setGuestCategory] = useState<'1-2' | '3-4' | '5-6' | '7-8' | '9-10' | '11-12+'>('3-4');
  const [seatingPref, setSeatingPref] = useState<SeatingArea>('balcony');
  
  // Customer details
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  const [step, setStep] = useState<1 | 2>(1); // Step 1: Slot & Availability, Step 2: Confirmation
  const [createdRes, setCreatedRes] = useState<Reservation | null>(null);

  if (!isOpen) return null;

  // Derive numeric guest count for calculation
  const numericGuestsMap: Record<string, number> = {
    '1-2': 2,
    '3-4': 4,
    '5-6': 6,
    '7-8': 8,
    '9-10': 10,
    '11-12+': 12
  };
  const currentGuestNum = numericGuestsMap[guestCategory] || 4;
  const isLargeGroup = guestCategory === '11-12+';

  // Live Availability Engine Calculation
  const availability = calculateLiveAvailability(
    tables,
    reservations,
    date,
    time,
    seatingPref,
    currentGuestNum
  );

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Generate unique TL-XXXX Booking ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `TL-${randomNum}`;

    const newRes: Reservation = {
      id: bookingId,
      customerName: name,
      phone,
      email,
      date,
      time,
      guests: currentGuestNum,
      guestCategory,
      seatingPreference: seatingPref,
      assignedTableIds: [],
      status: isLargeGroup ? 'pending' : 'pending',
      isLargeGroup,
      specialNotes,
      createdAt: 'Just now'
    };

    onNewReservation(newRes);
    setCreatedRes(newRes);
    setStep(2);
  };

  const handleClose = () => {
    setStep(1);
    setCreatedRes(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#12100e]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#1c1815] border border-[#2e2722] rounded-3xl p-6 md:p-10 shadow-2xl animate-fade-in my-8">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#12100e] text-[#c4bcae] hover:text-[#faf7f2] border border-[#2e2722] cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 ? (
          <form onSubmit={handleSubmitBooking} className="space-y-8">
            
            {/* Modal Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#7d8c79]">
                <Sparkles className="w-3.5 h-3.5" />
                TABLE RESERVATION
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-[#faf7f2]">
                Reserve Your Corner at <span className="italic text-[#eae3d2] font-serif">The Leaf.</span>
              </h3>
              <p className="text-xs text-[#c4bcae] font-light">
                1st Floor, E7/161, E-7, Arera Colony, Bhopal · Open Daily 11:00 AM – 11:30 PM
              </p>
            </div>

            {/* Selection Grid */}
            <div className="space-y-6">
              
              {/* 1. Date & Time Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#c4bcae] mb-1.5 flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#7d8c79]" /> Date
                  </label>
                  <input
                    type="date"
                    required
                    min={todayStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#12100e] border border-[#2e2722] focus:border-[#7d8c79] rounded-xl px-4 py-3 text-sm text-[#faf7f2] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#c4bcae] mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#7d8c79]" /> Time Slot
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#12100e] border border-[#2e2722] focus:border-[#7d8c79] rounded-xl px-4 py-3 text-sm text-[#faf7f2] focus:outline-none transition-colors"
                  >
                    <option value="12:00">12:00 PM (Lunch)</option>
                    <option value="13:30">01:30 PM (Afternoon)</option>
                    <option value="16:00">04:00 PM (High Tea)</option>
                    <option value="18:00">06:00 PM (Early Evening)</option>
                    <option value="19:30">07:30 PM (Dinner Prime)</option>
                    <option value="20:30">08:30 PM (Dinner Late)</option>
                    <option value="21:30">09:30 PM (Late Night Brew)</option>
                  </select>
                </div>
              </div>

              {/* 2. Number of Guests Selection */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-widest text-[#c4bcae] mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#7d8c79]" /> Number of Guests
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {(['1-2', '3-4', '5-6', '7-8', '9-10', '11-12+'] as const).map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setGuestCategory(cat)}
                      className={`py-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                        guestCategory === cat
                          ? 'bg-[#7d8c79] text-[#12100e] border-[#7d8c79] font-bold shadow-md'
                          : 'bg-[#12100e] text-[#c4bcae] border-[#2e2722] hover:border-[#7d8c79]/40'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Large Group Warning */}
                {isLargeGroup && (
                  <div className="mt-3 p-3.5 bg-[#d4a373]/10 border border-[#d4a373]/30 rounded-xl flex items-start gap-2.5 text-xs text-[#d4a373]">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold block text-[#faf7f2]">Large group reservation</strong>
                      <span>Large group reservation — subject to table arrangement and café confirmation.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Seating Preference */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-widest text-[#c4bcae] mb-2">
                  Seating Preference
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'indoor', label: 'Indoor' },
                    { id: 'balcony', label: 'Balcony' },
                    { id: 'any', label: 'Any available seating' }
                  ].map((seat) => (
                    <button
                      type="button"
                      key={seat.id}
                      onClick={() => setSeatingPref(seat.id as any)}
                      className={`py-3 px-3 rounded-xl border text-xs font-manrope font-medium transition-all cursor-pointer text-center ${
                        seatingPref === seat.id
                          ? 'bg-[#7d8c79] text-[#12100e] border-[#7d8c79] font-bold shadow-md'
                          : 'bg-[#12100e] text-[#c4bcae] border-[#2e2722] hover:border-[#7d8c79]/40'
                      }`}
                    >
                      {seat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Live Availability UI Card */}
              <div className="p-4 bg-[#12100e] rounded-2xl border border-[#2e2722] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#c4bcae] uppercase tracking-wider">
                    {date} · {time}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                    availability.status === 'available'
                      ? 'bg-[#7d8c79]/20 text-[#7d8c79] border border-[#7d8c79]/40'
                      : availability.status === 'limited'
                      ? 'bg-[#d4a373]/20 text-[#d4a373] border border-[#d4a373]/40'
                      : 'bg-red-500/20 text-red-400 border border-red-500/40'
                  }`}>
                    {availability.statusLabel}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#2e2722]/80 text-xs">
                  <div className="flex items-center justify-between bg-[#1c1815] p-2.5 rounded-xl border border-[#2e2722]">
                    <span className="text-[#c4bcae]">Indoor</span>
                    <span className="font-mono text-[#faf7f2] font-semibold">
                      ● {availability.indoorTablesAvailable} tables available
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-[#1c1815] p-2.5 rounded-xl border border-[#2e2722]">
                    <span className="text-[#c4bcae]">Balcony</span>
                    <span className="font-mono text-[#faf7f2] font-semibold">
                      ● {availability.balconyTablesAvailable} tables available
                    </span>
                  </div>
                </div>
              </div>

              {/* 5. Customer Contact Info */}
              <div className="space-y-4 pt-2 border-t border-[#2e2722]/60">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#7d8c79] block">
                  Customer Details
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#12100e] border border-[#2e2722] focus:border-[#7d8c79] rounded-xl px-4 py-3 text-sm text-[#faf7f2] focus:outline-none"
                  />

                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#12100e] border border-[#2e2722] focus:border-[#7d8c79] rounded-xl px-4 py-3 text-sm text-[#faf7f2] focus:outline-none"
                  />
                </div>

                <textarea
                  rows={2}
                  placeholder="Special requests or occasion notes..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full bg-[#12100e] border border-[#2e2722] focus:border-[#7d8c79] rounded-xl px-4 py-2.5 text-xs text-[#faf7f2] focus:outline-none"
                />
              </div>

            </div>

            <button
              type="submit"
              disabled={availability.status === 'fully_booked'}
              className={`w-full py-4 rounded-full text-xs font-manrope font-bold uppercase tracking-widest transition-all duration-300 shadow-xl cursor-pointer ${
                availability.status === 'fully_booked'
                  ? 'bg-[#2e2722] text-[#c4bcae] cursor-not-allowed'
                  : 'bg-[#faf7f2] hover:bg-[#eae3d2] text-[#12100e]'
              }`}
            >
              CONFIRM RESERVATION
            </button>
          </form>
        ) : (
          /* Step 2: Confirmation & Booking Receipt */
          <div className="py-6 space-y-6 animate-fade-in text-center">
            
            <div className="w-16 h-16 rounded-full bg-[#7d8c79]/20 border border-[#7d8c79] text-[#7d8c79] flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#7d8c79]">BOOKING RECEIPT</span>
              <h3 className="font-serif text-3xl md:text-4xl text-[#faf7f2]">
                Reservation Request Received
              </h3>
              <p className="text-xs text-[#c4bcae] font-light max-w-md mx-auto">
                Thank you, <strong className="text-[#faf7f2]">{createdRes?.customerName}</strong>. Your reservation request for The Leaf. in Arera Colony, Bhopal has been logged.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="bg-[#12100e] p-6 rounded-2xl border border-[#2e2722] text-xs font-mono text-left space-y-3 max-w-md mx-auto shadow-inner">
              <div className="flex justify-between items-center pb-2 border-b border-[#2e2722]">
                <span className="text-[#c4bcae]">BOOKING ID:</span>
                <span className="text-[#7d8c79] font-bold text-sm">{createdRes?.id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#c4bcae]">Date:</span>
                <span className="text-[#faf7f2]">{createdRes?.date}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#c4bcae]">Time:</span>
                <span className="text-[#faf7f2]">{createdRes?.time}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#c4bcae]">Guests:</span>
                <span className="text-[#faf7f2]">{createdRes?.guests} ({createdRes?.guestCategory})</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#c4bcae]">Seating:</span>
                <span className="text-[#faf7f2] uppercase">{createdRes?.seatingPreference}</span>
              </div>

              <div className="flex justify-between pt-2 border-t border-[#2e2722]">
                <span className="text-[#c4bcae]">Status:</span>
                <span className="px-2 py-0.5 bg-[#d4a373]/20 text-[#d4a373] rounded-full text-[10px] font-bold uppercase">
                  {createdRes?.status === 'pending' ? 'Pending confirmation' : '✓ Confirmed'}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#c4bcae] font-serif italic max-w-md mx-auto">
              “The café will confirm your reservation shortly.”
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-8 py-3 bg-[#faf7f2] text-[#12100e] text-xs uppercase font-bold tracking-widest rounded-full hover:bg-[#eae3d2] transition-colors cursor-pointer"
              >
                CLOSE RECEIPT
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
