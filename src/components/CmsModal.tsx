import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Check, X } from 'lucide-react';
import type { MenuItem, MenuCategory } from '../types';
import type { WhatsNewItem, OfferItem, EventItem } from '../data/cmsStore';

interface CmsModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onAddMenuItem: (item: MenuItem) => void;
  onToggleItemAvailability: (itemId: string) => void;
  onAddWhatsNew: (item: WhatsNewItem) => void;
  onAddOffer: (offer: OfferItem) => void;
  onAddEvent: (evt: EventItem) => void;
}

export const CmsModal: React.FC<CmsModalProps> = ({
  isOpen,
  onClose,
  menuItems,
  onAddMenuItem,
  onToggleItemAvailability,
  onAddWhatsNew: _onAddWhatsNew,
  onAddOffer: _onAddOffer,
  onAddEvent: _onAddEvent,
}) => {
  const [activeTab, setActiveTab] = useState<'manifest' | 'menu' | 'whatsnew' | 'offers' | 'events'>('manifest');

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
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Form states for adding items
  const [dishName, setDishName] = useState('');
  const [dishCategory, setDishCategory] = useState<MenuCategory>('pasta');
  const [dishPrice, setDishPrice] = useState(380);
  const [dishDesc, setDishDesc] = useState('');

  const [storyDraft, setStoryDraft] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const showToast = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  const handleAddDishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dishName) return;

    const newItem: MenuItem = {
      id: `menu-custom-${Date.now()}`,
      name: dishName,
      category: dishCategory,
      price: Number(dishPrice),
      description: dishDesc || 'Freshly prepared by our culinary team.',
      isSignature: true,
      dietary: ['Veg'],
      prepTime: '15 mins',
      availability: 'available'
    };

    onAddMenuItem(newItem);
    setDishName('');
    setDishDesc('');
    showToast(`Added ${dishName} to Menu!`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#090a0f] text-[#f5f4ee] font-sans flex overflow-hidden"
        >
          {/* Sidebar */}
          <aside className="w-64 bg-[#111218] border-r border-white/[0.07] flex flex-col justify-between p-5 shrink-0 hidden md:flex">
            <div className="space-y-7">
              {/* Brand Emblem */}
              <div className="flex items-center gap-3 pb-5 border-b border-white/[0.07]">
                <div className="w-9 h-9 rounded-full bg-[#161720] border border-white/10 flex items-center justify-center p-1.5 overflow-hidden">
                  <img
                    src="/images/the_leaf_official_logo.png"
                    alt="The Leaf Emblem"
                    className="w-full h-full object-contain block"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif-editorial text-[20px] tracking-wide text-[#f5f4ee] leading-none">The Leaf.</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#63616e] mt-1">Ops Studio v3.4</span>
                </div>
              </div>

              {/* Nav Chrome */}
              <nav className="flex flex-col space-y-1 font-mono text-[12px]">
                <button
                  onClick={() => setActiveTab('manifest')}
                  className={`flex items-center justify-between px-3 py-2 rounded-sm text-left transition-all cursor-pointer ${
                    activeTab === 'manifest'
                      ? 'bg-[#161720] border border-white/15 text-[#f5f4ee] font-medium'
                      : 'text-[#9e9ca7] hover:text-[#f5f4ee] hover:bg-[#161720]/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[17px] text-[#8ea89d]">dashboard</span>
                    <span>Studio Manifest</span>
                  </div>
                  {activeTab === 'manifest' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8ea89d] shadow-[0_0_8px_rgba(142,168,157,0.5)]" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('menu')}
                  className={`flex items-center justify-between px-3 py-2 rounded-sm text-left transition-all cursor-pointer ${
                    activeTab === 'menu'
                      ? 'bg-[#161720] border border-white/15 text-[#f5f4ee] font-medium'
                      : 'text-[#9e9ca7] hover:text-[#f5f4ee] hover:bg-[#161720]/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[17px] text-[#63616e]">restaurant_menu</span>
                    <span>Menu Curation</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('whatsnew')}
                  className={`flex items-center justify-between px-3 py-2 rounded-sm text-left transition-all cursor-pointer ${
                    activeTab === 'whatsnew'
                      ? 'bg-[#161720] border border-white/15 text-[#f5f4ee] font-medium'
                      : 'text-[#9e9ca7] hover:text-[#f5f4ee] hover:bg-[#161720]/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[17px] text-[#63616e]">auto_stories</span>
                    <span>What's New</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('offers')}
                  className={`flex items-center justify-between px-3 py-2 rounded-sm text-left transition-all cursor-pointer ${
                    activeTab === 'offers'
                      ? 'bg-[#161720] border border-white/15 text-[#f5f4ee] font-medium'
                      : 'text-[#9e9ca7] hover:text-[#f5f4ee] hover:bg-[#161720]/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[17px] text-[#63616e]">loyalty</span>
                    <span>Promo Offers</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('events')}
                  className={`flex items-center justify-between px-3 py-2 rounded-sm text-left transition-all cursor-pointer ${
                    activeTab === 'events'
                      ? 'bg-[#161720] border border-white/15 text-[#f5f4ee] font-medium'
                      : 'text-[#9e9ca7] hover:text-[#f5f4ee] hover:bg-[#161720]/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[17px] text-[#63616e]">event</span>
                    <span>Events & Culture</span>
                  </div>
                </button>
              </nav>

              {/* Active Shift Indicator */}
              <div className="p-3.5 bg-[#161720]/80 border border-white/[0.07] rounded-sm space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-[#63616e] uppercase">
                  <span>Active Shift</span>
                  <span className="text-[#d99750]">11:00 — 23:30</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8ea89d] animate-ping" />
                  <span className="text-[12px] font-medium text-[#f5f4ee]">Floor Concierge Live</span>
                </div>
                <div className="text-[11px] text-[#9e9ca7] leading-tight">
                  Balcony Terrace & Main Lounge mesh synchronized.
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.07]">
              <button
                onClick={onClose}
                className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-[#63616e] hover:text-[#f5f4ee] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">arrow_back</span>
                <span>Return to Guest Lounge</span>
              </button>
            </div>
          </aside>

          {/* Main Content Workspace */}
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            
            {/* Header Bar */}
            <header className="h-14 bg-[#111218]/90 backdrop-blur-md border-b border-white/[0.07] sticky top-0 z-40 px-6 sm:px-8 flex items-center justify-between">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase">
                <span className="tracking-[0.2em] text-[#63616e]">INTERNAL OPS HUB</span>
                <span className="text-white/20">/</span>
                <span className="tracking-[0.15em] text-[#8ea89d]">NOCTURNE PROTOCOL ACTIVE</span>
              </div>

              <div className="flex items-center gap-4 font-mono text-[10px]">
                <div className="flex items-center gap-2 px-2.5 py-1 bg-[#161720] border border-white/10 rounded-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8ea89d]" />
                  <span className="tracking-wider text-[#9e9ca7] uppercase">Cloud Sync: OK</span>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 text-[#9e9ca7] hover:text-[#f5f4ee] border border-white/10 rounded-sm hover:bg-white/5 cursor-pointer"
                  title="Close CMS Portal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Main Section */}
            <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-7">
              
              {/* Title & Cinematic Heading */}
              <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/[0.07]">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d99750]" />
                    <span className="tracking-[0.25em] text-[#9e9ca7]">DISPATCH TERMINAL • ZONE 01</span>
                    <span className="text-[#63616e]">•</span>
                    <span className="tracking-[0.15em] text-[#63616e]">ARERA COLONY BHOPAL</span>
                  </div>

                  <h1 className="font-serif-editorial text-4xl sm:text-5xl font-normal text-[#f5f4ee]">
                    CMS Portal <span className="italic font-light text-[#9e9ca7]">— Night Operations & Content</span>
                  </h1>
                </div>

                <div className="flex items-center gap-2.5 font-mono text-[11px]">
                  <button
                    onClick={() => showToast('Refreshed Floor Telemetry')}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#161720] hover:bg-[#1a1b25] border border-white/10 text-[#9e9ca7] hover:text-[#f5f4ee] tracking-wider uppercase rounded-sm transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px] text-[#63616e]">floor_lamp</span>
                    <span>Architectural View</span>
                  </button>

                  <button
                    onClick={() => showToast('Published Live Updates to Website')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#f5f4ee] text-[#090a0f] hover:bg-[#e4e2d8] font-medium tracking-wider uppercase rounded-sm transition-all cursor-pointer shadow-lg"
                  >
                    <span className="material-symbols-outlined text-[15px]">sync</span>
                    <span>Publish Live Updates</span>
                  </button>
                </div>
              </section>

              {successMsg && (
                <div className="p-3 bg-[#8ea89d]/20 border border-[#8ea89d] text-[#8ea89d] rounded-sm font-mono text-xs font-semibold flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" /> {successMsg}
                </div>
              )}

              {/* Metrics Bar */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.07] border border-white/[0.07] rounded-sm overflow-hidden font-mono">
                <div className="bg-[#111218] p-5 flex flex-col justify-between min-h-[130px]">
                  <div className="flex items-center justify-between text-[#63616e] text-[10px] uppercase tracking-[0.18em]">
                    <span>Balcony Seating</span>
                    <span className="text-[#8ea89d] text-xs">87.5%</span>
                  </div>
                  <div className="my-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif-editorial text-[38px] text-[#f5f4ee] leading-none">42</span>
                      <span className="text-[12px] text-[#63616e]">/ 48 Seats Allocated</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.07] text-[11px]">
                    <span className="text-[#63616e]">Zone Capacity</span>
                    <span className="text-[#8ea89d]">6 Covers Remaining</span>
                  </div>
                </div>

                <div className="bg-[#111218] p-5 flex flex-col justify-between min-h-[130px]">
                  <div className="flex items-center justify-between text-[#63616e] text-[10px] uppercase tracking-[0.18em]">
                    <span>Specialty Line</span>
                    <span className="px-1.5 py-0.5 bg-[#8ea89d]/20 text-[#8ea89d] text-[9px] tracking-widest uppercase">Live</span>
                  </div>
                  <div className="my-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif-editorial text-[38px] text-[#f5f4ee] leading-none">{menuItems.length}</span>
                      <span className="text-[11px] text-[#d99750]">Active Dishes</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.07] text-[11px]">
                    <span className="text-[#63616e]">Coffee Beans</span>
                    <span className="text-[#f5f4ee]">Chikmagalur 100% Arabica</span>
                  </div>
                </div>

                <div className="bg-[#111218] p-5 flex flex-col justify-between min-h-[130px]">
                  <div className="flex items-center justify-between text-[#63616e] text-[10px] uppercase tracking-[0.18em]">
                    <span>Average Evening Stay</span>
                    <span className="text-[#63616e]">±12m</span>
                  </div>
                  <div className="my-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif-editorial text-[38px] text-[#f5f4ee] leading-none">1h 45m</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.07] text-[11px]">
                    <span className="text-[#63616e]">Turn Rate</span>
                    <span className="text-[#8ea89d]">Nominal Cadence</span>
                  </div>
                </div>

                <div className="bg-[#111218] p-5 flex flex-col justify-between min-h-[130px]">
                  <div className="flex items-center justify-between text-[#63616e] text-[10px] uppercase tracking-[0.18em]">
                    <span>Atmosphere Rotation</span>
                    <span className="text-[#63616e]">Loop 04</span>
                  </div>
                  <div className="my-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif-editorial text-[28px] text-[#f5f4ee] truncate">Starry Night</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.07] text-[11px]">
                    <span className="text-[#63616e]">Art Projection</span>
                    <span className="text-[#63616e]">Next: 11:30 PM</span>
                  </div>
                </div>
              </section>

              {/* Main Workspace Layout */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                
                {/* Left: Floor Seating Manifest & Controls */}
                <section className="xl:col-span-8 bg-[#111218] border border-white/[0.07] rounded-sm p-6 flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.07]">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[18px] text-[#8ea89d]">table_restaurant</span>
                      <h3 className="font-serif-editorial text-[22px] tracking-wide text-[#f5f4ee]">Live Menu Availability & Additions</h3>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#8ea89d] px-2 py-0.5 bg-[#8ea89d]/20 rounded-sm">
                        Dispatch Live
                      </span>
                    </div>
                  </div>

                  {/* Toggle items & Quick Add forms */}
                  <div className="mt-6 space-y-6">
                    <form onSubmit={handleAddDishSubmit} className="p-5 bg-[#161720] border border-white/10 rounded-sm space-y-4">
                      <h4 className="font-serif-editorial text-xl text-[#f5f4ee] flex items-center gap-2">
                        <Plus className="w-4 h-4 text-[#8ea89d]" /> Add New Menu Item
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                        <input
                          type="text"
                          required
                          placeholder="Item Name *"
                          value={dishName}
                          onChange={(e) => setDishName(e.target.value)}
                          className="bg-[#090a0f] border border-white/10 rounded-sm px-3.5 py-2.5 text-[#f5f4ee] focus:outline-none focus:border-[#8ea89d]"
                        />

                        <select
                          value={dishCategory}
                          onChange={(e) => setDishCategory(e.target.value as MenuCategory)}
                          className="bg-[#090a0f] border border-white/10 rounded-sm px-3.5 py-2.5 text-[#f5f4ee] focus:outline-none focus:border-[#8ea89d]"
                        >
                          <option value="coffee">Coffee</option>
                          <option value="drinks">Drinks</option>
                          <option value="food">Food</option>
                          <option value="pasta">Pasta</option>
                          <option value="chinese">Chinese</option>
                          <option value="pizza">Pizza</option>
                          <option value="desserts">Desserts</option>
                        </select>

                        <input
                          type="number"
                          required
                          placeholder="Price in ₹ *"
                          value={dishPrice}
                          onChange={(e) => setDishPrice(Number(e.target.value))}
                          className="bg-[#090a0f] border border-white/10 rounded-sm px-3.5 py-2.5 text-[#f5f4ee] focus:outline-none focus:border-[#8ea89d]"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Description..."
                        value={dishDesc}
                        onChange={(e) => setDishDesc(e.target.value)}
                        className="w-full bg-[#090a0f] border border-white/10 rounded-sm px-3.5 py-2.5 font-mono text-xs text-[#f5f4ee] focus:outline-none focus:border-[#8ea89d]"
                      />

                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#f5f4ee] hover:bg-[#e4e2d8] text-[#090a0f] font-mono text-[11px] font-medium tracking-wider uppercase rounded-sm cursor-pointer transition-colors"
                      >
                        + Save Dish to Live Website
                      </button>
                    </form>

                    {/* Live Toggles Grid */}
                    <div className="space-y-3 pt-2">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#8ea89d] block">
                        Toggle Item Availability (Available ↔ Sold Out)
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {menuItems.map((item) => (
                          <div
                            key={item.id}
                            className="p-3.5 bg-[#161720]/60 border border-white/10 rounded-sm flex items-center justify-between font-mono"
                          >
                            <div>
                              <div className="font-serif-editorial text-[17px] text-[#f5f4ee]">{item.name}</div>
                              <div className="text-[10px] text-[#63616e]">₹{item.price} · {item.category}</div>
                            </div>

                            <button
                              onClick={() => onToggleItemAvailability(item.id)}
                              className={`px-3 py-1 rounded-sm text-[10px] uppercase font-semibold cursor-pointer transition-all ${
                                item.availability === 'available'
                                  ? 'bg-[#8ea89d]/20 text-[#8ea89d] border border-[#8ea89d]/40'
                                  : 'bg-red-500/20 text-red-400 border border-red-500/40'
                              }`}
                            >
                              {item.availability === 'available' ? 'Available' : 'Sold Out'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Right: Quick Toggles, Story Draft, & Sensory Mesh Monitor */}
                <div className="xl:col-span-4 flex flex-col gap-6">
                  
                  {/* Module 1: Botanical Story */}
                  <section className="bg-[#111218] border border-white/[0.07] rounded-sm p-5 flex flex-col">
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-[#8ea89d]">auto_stories</span>
                        <h4 className="font-serif-editorial text-[19px] tracking-wide text-[#f5f4ee]">Botanical Story</h4>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d99750] px-1.5 py-0.5 bg-[#d99750]/20 rounded-sm">Active Screen</span>
                    </div>

                    <div className="mt-3 p-3 bg-[#161720] border border-white/[0.07] rounded-sm">
                      <span className="font-mono text-[9px] text-[#8ea89d] uppercase tracking-[0.2em]">Featured Night Narrative</span>
                      <p className="font-serif-editorial italic text-[16px] text-[#f5f4ee] mt-1 leading-snug">
                        "Whispers Under Glass: Why We Age Mountain Teas in Charcoal Vats"
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-3 font-mono">
                      <input
                        type="text"
                        placeholder="Draft new story excerpt..."
                        value={storyDraft}
                        onChange={(e) => setStoryDraft(e.target.value)}
                        className="flex-1 bg-[#161720] border border-white/[0.07] px-3 py-1.5 text-[12px] text-[#f5f4ee] placeholder:text-[#63616e] rounded-sm focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          if (storyDraft) {
                            showToast('Published Story Excerpt!');
                            setStoryDraft('');
                          }
                        }}
                        className="px-3 py-1.5 bg-[#f5f4ee] text-[#090a0f] hover:bg-[#e4e2d8] rounded-sm transition-colors cursor-pointer"
                        title="Post Entry"
                      >
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    </div>
                  </section>

                  {/* Module 2: Space Architecture */}
                  <section className="bg-[#111218] border border-white/[0.07] rounded-sm p-5 flex flex-col font-mono">
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-[#8ea89d]">sensors</span>
                        <h4 className="font-serif-editorial text-[19px] tracking-wide text-[#f5f4ee]">Lounge Architecture</h4>
                      </div>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#8ea89d]">Sensor Mesh OK</span>
                    </div>

                    <div className="relative w-full h-36 rounded-sm overflow-hidden my-3 border border-white/[0.07]">
                      <img
                        src="/images/leaf_indoor_lounge.jpg"
                        alt="The Leaf Interior Atrium"
                        className="w-full h-full object-cover filter brightness-90 contrast-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111218] via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2.5 right-2.5 flex items-end justify-between">
                        <div>
                          <span className="text-[9px] uppercase tracking-[0.2em] text-[#9e9ca7]">Main Atrium Deck</span>
                          <div className="text-[11px] text-[#f5f4ee] font-medium">21.4°C • 62% RH</div>
                        </div>
                        <span className="text-[10px] text-[#8ea89d] bg-[#090a0f]/90 px-2 py-0.5 rounded-sm border border-white/10">
                          48 dB Ambient
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-left text-[10px]">
                      <div className="p-2.5 bg-[#161720] border border-white/[0.07] rounded-sm">
                        <span className="text-[#63616e] uppercase tracking-wider block">Lighting Temp</span>
                        <span className="text-[12px] text-[#f5f4ee] mt-0.5 block">2200K Lunar Amber</span>
                      </div>
                      <div className="p-2.5 bg-[#161720] border border-white/[0.07] rounded-sm">
                        <span className="text-[#63616e] uppercase tracking-wider block">Soundscape</span>
                        <span className="text-[12px] text-[#f5f4ee] mt-0.5 block truncate">Viridian Wave 04</span>
                      </div>
                    </div>
                  </section>

                </div>

              </div>
            </main>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
