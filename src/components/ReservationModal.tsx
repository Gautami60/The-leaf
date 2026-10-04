import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar as CalendarIcon, Clock, Users, CheckCircle, AlertTriangle } from 'lucide-react';
import type { CafeTable, Reservation, SeatingArea } from '../types/reservation';
import { calculateLiveAvailability } from '../data/reservationStore';
import { modalVariants } from '../utils/motion';

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

  const handleClose = () => {
    setStep(1);
    setCreatedRes(null);
    onClose();
  };

  // Lock body scroll when open & restore on close
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Handle Escape keypress for desktop dismissal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

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
      status: 'pending',
      isLargeGroup,
      specialNotes,
      createdAt: 'Just now'
    };

    onNewReservation(newRes);
    setCreatedRes(newRes);
    setStep(2);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-[#0d0f0e]/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden cursor-pointer"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90dvh] sm:max-h-[85dvh] flex flex-col bg-[#1e201f] border border-[#4c463c]/30 rounded-none shadow-2xl text-[#e2e3e0] font-body-md cursor-default overflow-hidden"
          >
            {/* Persistent Sticky Modal Header */}
            <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 md:px-8 border-b border-[#4c463c]/30 bg-[#1e201f]/95 backdrop-blur-md shrink-0">
              <div className="min-w-0 pr-4">
                <span className="font-label-caps text-[11px] uppercase tracking-widest text-[#dac498] block">
                  05 / ACCESS • TABLE RESERVATION
                </span>
                <h3 className="font-headline-sm text-lg md:text-xl font-serif text-[#e2e3e0] truncate">
                  Reserve Your Corner at The Leaf.
                </h3>
              </div>

              {/* Prominent Accessible Close Button */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close reservation"
                className="w-11 h-11 rounded-full bg-[#0d0f0e] text-[#e2e3e0]/80 hover:text-[#dac498] hover:bg-[#0d0f0e] border border-[#4c463c]/40 flex items-center justify-center shrink-0 cursor-pointer transition-all duration-300 z-30"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            {/* Scrollable Inner Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 no-scrollbar space-y-6">
              {step === 1 ? (
                <form onSubmit={handleSubmitBooking} className="space-y-6">
                  
                  {/* Location Info Banner */}
                  <div className="p-3 bg-[#0d0f0e] border border-[#4c463c]/20 text-xs font-body-sm text-[#cfc5b7]">
                    📍 1st Floor, E7/161, Arera Colony, Bhopal · Open Daily 11:00 AM – 11:30 PM
                  </div>

                  {/* Selection Grid */}
                  <div className="space-y-6">
                    
                    {/* 1. Date & Time Selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-label-caps text-xs uppercase tracking-widest text-[#989083] mb-2 flex items-center gap-1.5">
                          <CalendarIcon className="w-3.5 h-3.5 text-[#dac498]" /> Date
                        </label>
                        <input
                          type="date"
                          required
                          min={todayStr}
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-[#0d0f0e] border border-[#4c463c]/40 focus:border-[#dac498] rounded-none px-4 py-3 text-sm text-[#e2e3e0] font-body-md focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block font-label-caps text-xs uppercase tracking-widest text-[#989083] mb-2 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#dac498]" /> Time Slot
                        </label>
                        <select
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full bg-[#0d0f0e] border border-[#4c463c]/40 focus:border-[#dac498] rounded-none px-4 py-3 text-sm text-[#e2e3e0] font-body-md focus:outline-none transition-colors"
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
                      <label className="block font-label-caps text-xs uppercase tracking-widest text-[#989083] mb-2 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#dac498]" /> Number of Guests
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {(['1-2', '3-4', '5-6', '7-8', '9-10', '11-12+'] as const).map((cat) => (
                          <button
                            type="button"
                            key={cat}
                            onClick={() => setGuestCategory(cat)}
                            className={`py-2.5 border text-xs font-label-caps transition-all cursor-pointer ${
                              guestCategory === cat
                                ? 'bg-[#dac498] text-[#3c2e0f] border-[#dac498] font-bold'
                                : 'bg-[#0d0f0e] text-[#cfc5b7] border-[#4c463c]/40 hover:border-[#dac498]/40'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      {/* Large Group Warning */}
                      {isLargeGroup && (
                        <div className="mt-3 p-3.5 bg-[#dac498]/10 border border-[#dac498]/30 flex items-start gap-2.5 text-xs text-[#dac498]">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#dac498]" />
                          <div>
                            <strong className="font-bold block text-[#e2e3e0]">Large group reservation</strong>
                            <span>Subject to table arrangement and café confirmation.</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 3. Seating Preference */}
                    <div>
                      <label className="block font-label-caps text-xs uppercase tracking-widest text-[#989083] mb-2">
                        Seating Preference
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'indoor', label: 'Indoor Velvet Salon' },
                          { id: 'balcony', label: 'Starlit Veranda' },
                          { id: 'any', label: 'Any Available' }
                        ].map((seat) => (
                          <button
                            type="button"
                            key={seat.id}
                            onClick={() => setSeatingPref(seat.id as any)}
                            className={`py-3 px-3 border text-xs font-label-caps transition-all cursor-pointer text-center ${
                              seatingPref === seat.id
                                ? 'bg-[#dac498] text-[#3c2e0f] border-[#dac498] font-bold'
                                : 'bg-[#0d0f0e] text-[#cfc5b7] border-[#4c463c]/40 hover:border-[#dac498]/40'
                            }`}
                          >
                            {seat.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 4. Live Availability Engine Card */}
                    <div className="p-4 bg-[#0d0f0e] border border-[#4c463c]/30 space-y-3">
                      <div className="flex items-center justify-between text-xs font-label-caps">
                        <span className="text-[#cfc5b7] uppercase tracking-wider">
                          {date} · {time}
                        </span>
                        <span className={`px-2.5 py-1 text-[11px] font-bold ${
                          availability.status === 'available'
                            ? 'bg-[#dac498]/20 text-[#dac498] border border-[#dac498]/40'
                            : availability.status === 'limited'
                            ? 'bg-[#dac498]/10 text-[#dac498] border border-[#dac498]/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/40'
                        }`}>
                          {availability.statusLabel}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#4c463c]/20 text-xs font-body-sm">
                        <div className="flex items-center justify-between bg-[#1e201f] p-2.5 border border-[#4c463c]/30">
                          <span className="text-[#989083]">Indoor</span>
                          <span className="text-[#e2e3e0] font-medium">
                            ● {availability.indoorTablesAvailable} tables free
                          </span>
                        </div>

                        <div className="flex items-center justify-between bg-[#1e201f] p-2.5 border border-[#4c463c]/30">
                          <span className="text-[#989083]">Balcony</span>
                          <span className="text-[#e2e3e0] font-medium">
                            ● {availability.balconyTablesAvailable} tables free
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 5. Customer Contact Info */}
                    <div className="space-y-4 pt-2 border-t border-[#4c463c]/20">
                      <span className="font-label-caps text-xs uppercase tracking-widest text-[#dac498] block">
                        Name for the Ledger
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name *"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-[#0d0f0e] border border-[#4c463c]/40 focus:border-[#dac498] px-4 py-3 text-sm text-[#e2e3e0] font-body-md focus:outline-none placeholder:text-[#989083]"
                        />

                        <input
                          type="tel"
                          required
                          placeholder="Phone Number *"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-[#0d0f0e] border border-[#4c463c]/40 focus:border-[#dac498] px-4 py-3 text-sm text-[#e2e3e0] font-body-md focus:outline-none placeholder:text-[#989083]"
                        />
                      </div>

                      <textarea
                        rows={2}
                        placeholder="Special requests or occasion notes..."
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                        className="w-full bg-[#0d0f0e] border border-[#4c463c]/40 focus:border-[#dac498] px-4 py-2.5 text-xs text-[#e2e3e0] font-body-md focus:outline-none placeholder:text-[#989083]"
                      />
                    </div>

                  </div>

                  <button
                    type="submit"
                    disabled={availability.status === 'fully_booked'}
                    className={`w-full py-4 font-label-caps text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                      availability.status === 'fully_booked'
                        ? 'bg-white/10 text-[#989083] cursor-not-allowed'
                        : 'bg-[#dac498] text-[#3c2e0f] hover:bg-[#b9a47a] font-bold'
                    }`}
                  >
                    CONFIRM SANCTUARY RESERVATION
                  </button>
                </form>
              ) : (
                /* Step 2: Confirmation & Booking Receipt */
                <div className="py-6 space-y-6 text-center font-body-md">
                  <div className="w-16 h-16 rounded-full bg-[#dac498]/20 border border-[#dac498] text-[#dac498] flex items-center justify-center mx-auto shadow-xl">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="font-label-caps text-xs uppercase tracking-widest text-[#dac498]">BOOKING RECEIPT</span>
                    <h3 className="font-headline-md text-3xl md:text-4xl font-serif text-[#e2e3e0]">
                      Reservation Request Received
                    </h3>
                    <p className="font-body-sm text-xs text-[#cfc5b7] font-light max-w-md mx-auto">
                      Thank you, <strong className="text-[#e2e3e0]">{createdRes?.customerName}</strong>. Your reservation request for The Leaf. in Arera Colony, Bhopal has been logged.
                    </p>
                  </div>

                  {/* Receipt Card */}
                  <div className="bg-[#0d0f0e] p-6 border border-[#4c463c]/30 text-xs font-label-caps text-left space-y-3 max-w-md mx-auto">
                    <div className="flex justify-between items-center pb-2 border-b border-[#4c463c]/20">
                      <span className="text-[#989083]">BOOKING ID:</span>
                      <span className="text-[#dac498] font-bold text-sm">{createdRes?.id}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#989083]">Date:</span>
                      <span className="text-[#e2e3e0]">{createdRes?.date}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#989083]">Time:</span>
                      <span className="text-[#e2e3e0]">{createdRes?.time}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#989083]">Guests:</span>
                      <span className="text-[#e2e3e0]">{createdRes?.guests} ({createdRes?.guestCategory})</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#989083]">Seating:</span>
                      <span className="text-[#e2e3e0] uppercase">{createdRes?.seatingPreference}</span>
                    </div>

                    <div className="flex justify-between pt-2 border-t border-[#4c463c]/20">
                      <span className="text-[#989083]">Status:</span>
                      <span className="px-2.5 py-0.5 bg-[#dac498]/20 text-[#dac498] border border-[#dac498]/30 font-bold uppercase">
                        Pending confirmation
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleClose}
                      className="w-full sm:w-auto px-8 py-3 bg-[#dac498] text-[#3c2e0f] font-label-caps text-xs uppercase tracking-widest font-bold hover:bg-[#b9a47a] transition-colors cursor-pointer"
                    >
                      CLOSE RECEIPT
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

