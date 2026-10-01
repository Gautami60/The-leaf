import React, { useState } from 'react';
import { Settings, Plus, Check } from 'lucide-react';
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
  onAddWhatsNew,
  onAddOffer,
  onAddEvent,
}) => {
  const [activeTab, setActiveTab] = useState<'menu' | 'whatsnew' | 'offers' | 'events'>('menu');

  // Form states for adding items
  const [dishName, setDishName] = useState('');
  const [dishCategory, setDishCategory] = useState<MenuCategory>('pasta');
  const [dishPrice, setDishPrice] = useState(380);
  const [dishDesc, setDishDesc] = useState('');

  const [wnTitle, setWnTitle] = useState('');
  const [wnCategory, setWnCategory] = useState<'NEW DRINK' | 'NEW DISH' | 'NEW BAKE'>('NEW DISH');
  const [wnTagline, setWnTagline] = useState('Freshly added to the menu.');
  const [wnPrice, setWnPrice] = useState(295);
  const [wnDesc, setWnDesc] = useState('');

  const [offTitle, setOffTitle] = useState('');
  const [offCode, setOffCode] = useState('');
  const [offDesc, setOffDesc] = useState('');

  const [evtTitle, setEvtTitle] = useState('');
  const [evtDate, setEvtDate] = useState('Saturday · Next Week');
  const [evtDesc, setEvtDesc] = useState('');

  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

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
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
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

  const handleAddWhatsNewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wnTitle) return;

    const newWn: WhatsNewItem = {
      id: `wn-custom-${Date.now()}`,
      category: wnCategory,
      title: wnTitle,
      tagline: wnTagline,
      description: wnDesc || 'Newly launched item at The Leaf.',
      price: Number(wnPrice),
      image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
      launchDate: 'Today',
      isNew: true
    };

    onAddWhatsNew(newWn);
    setWnTitle('');
    setWnDesc('');
    showToast(`Published ${wnTitle} to What's New!`);
  };

  const handleAddOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offTitle || !offCode) return;

    const newOff: OfferItem = {
      id: `off-custom-${Date.now()}`,
      title: offTitle,
      subtitle: 'Exclusive Café Offer',
      description: offDesc || 'Special privilege for The Leaf guests.',
      code: offCode.toUpperCase(),
      expiry: 'Valid this month',
      badge: 'PROMO',
      terms: 'Applicable on dine-in orders.'
    };

    onAddOffer(newOff);
    setOffTitle('');
    setOffCode('');
    setOffDesc('');
    showToast(`Created offer ${offCode}!`);
  };

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evtTitle) return;

    const newEvt: EventItem = {
      id: `evt-custom-${Date.now()}`,
      title: evtTitle,
      date: evtDate,
      time: '7:00 PM onwards',
      description: evtDesc || 'Join us for a special evening at The Leaf.',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      category: 'Special Evening',
      isUpcoming: true
    };

    onAddEvent(newEvt);
    setEvtTitle('');
    setEvtDesc('');
    showToast(`Published event ${evtTitle}!`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#12100e]/98 backdrop-blur-xl flex flex-col overflow-y-auto p-4 md:p-8">
      
      {/* Top Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between pb-6 border-b border-[#2e2722]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#7d8c79]/20 border border-[#7d8c79]/40 flex items-center justify-center text-[#7d8c79]">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#faf7f2]">The Leaf. CMS Manager</h2>
            <p className="text-xs text-[#c4bcae] font-mono">Dynamic Content Management & Menu Availability Engine</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-[#1c1815] hover:bg-[#2e2722] text-[#faf7f2] text-xs font-mono uppercase tracking-widest rounded-full border border-[#2e2722] cursor-pointer"
        >
          Close Manager
        </button>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto w-full py-8 space-y-8">
        
        {successMsg && (
          <div className="p-4 bg-[#7d8c79]/20 border border-[#7d8c79] text-[#7d8c79] rounded-2xl text-xs font-mono font-bold text-center animate-fade-in flex items-center justify-center gap-2">
            <Check className="w-4 h-4" /> {successMsg}
          </div>
        )}

        {/* CMS Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#2e2722] pb-4">
          {[
            { id: 'menu', label: 'Menu Items & Availability' },
            { id: 'whatsnew', label: '+ Add What\'s New' },
            { id: 'offers', label: '+ Create Offer' },
            { id: 'events', label: '+ Add Event' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === t.id
                  ? 'bg-[#7d8c79] text-[#12100e] font-bold shadow-lg'
                  : 'bg-[#1c1815] text-[#c4bcae] border border-[#2e2722] hover:text-[#faf7f2]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Menu Items & Toggle Availability */}
        {activeTab === 'menu' && (
          <div className="space-y-8">
            
            {/* Add New Dish Form */}
            <form onSubmit={handleAddDishSubmit} className="bg-[#1c1815] p-6 rounded-3xl border border-[#2e2722] space-y-4">
              <h3 className="font-serif text-xl text-[#faf7f2] flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#7d8c79]" /> Add New Menu Item
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Item Name *"
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  className="bg-[#12100e] border border-[#2e2722] rounded-xl px-4 py-2.5 text-xs text-[#faf7f2] focus:outline-none"
                />

                <select
                  value={dishCategory}
                  onChange={(e) => setDishCategory(e.target.value as MenuCategory)}
                  className="bg-[#12100e] border border-[#2e2722] rounded-xl px-4 py-2.5 text-xs text-[#faf7f2] focus:outline-none"
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
                  className="bg-[#12100e] border border-[#2e2722] rounded-xl px-4 py-2.5 text-xs text-[#faf7f2] focus:outline-none"
                />
              </div>

              <input
                type="text"
                placeholder="Description..."
                value={dishDesc}
                onChange={(e) => setDishDesc(e.target.value)}
                className="w-full bg-[#12100e] border border-[#2e2722] rounded-xl px-4 py-2.5 text-xs text-[#faf7f2] focus:outline-none"
              />

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#faf7f2] hover:bg-[#eae3d2] text-[#12100e] text-xs font-mono font-bold uppercase tracking-widest rounded-full cursor-pointer"
              >
                + Save Dish to Live Website
              </button>
            </form>

            {/* Availability Manager List */}
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#7d8c79] uppercase tracking-wider block">
                Toggle Live Menu Availability (Available ↔ Sold Out Today)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-[#1c1815] rounded-2xl border border-[#2e2722] flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-serif text-lg text-[#faf7f2]">{item.name}</h4>
                      <span className="text-xs font-mono text-[#c4bcae]">₹{item.price} · {item.category}</span>
                    </div>

                    <button
                      onClick={() => onToggleItemAvailability(item.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase cursor-pointer transition-colors ${
                        item.availability === 'available'
                          ? 'bg-[#7d8c79]/20 text-[#7d8c79] border border-[#7d8c79]/40'
                          : 'bg-red-500/20 text-red-400 border border-red-500/40'
                      }`}
                    >
                      {item.availability === 'available' ? 'Available' : 'Sold Out Today'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Whats New */}
        {activeTab === 'whatsnew' && (
          <form onSubmit={handleAddWhatsNewSubmit} className="bg-[#1c1815] p-6 rounded-3xl border border-[#2e2722] space-y-4">
            <h3 className="font-serif text-xl text-[#faf7f2]">Publish to What's New Section</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                required
                placeholder="Item Title *"
                value={wnTitle}
                onChange={(e) => setWnTitle(e.target.value)}
                className="bg-[#12100e] border border-[#2e2722] rounded-xl px-4 py-2.5 text-xs text-[#faf7f2] focus:outline-none"
              />

              <select
                value={wnCategory}
                onChange={(e) => setWnCategory(e.target.value as any)}
                className="bg-[#12100e] border border-[#2e2722] rounded-xl px-4 py-2.5 text-xs text-[#faf7f2] focus:outline-none"
              >
                <option value="NEW DRINK">NEW DRINK</option>
                <option value="NEW DISH">NEW DISH</option>
                <option value="NEW BAKE">NEW BAKE</option>
              </select>

              <input
                type="number"
                required
                placeholder="Price in ₹ *"
                value={wnPrice}
                onChange={(e) => setWnPrice(Number(e.target.value))}
                className="bg-[#12100e] border border-[#2e2722] rounded-xl px-4 py-2.5 text-xs text-[#faf7f2] focus:outline-none"
              />
            </div>

            <input
              type="text"
              placeholder="Tagline (e.g. Now brewing at The Leaf.)"
              value={wnTagline}
              onChange={(e) => setWnTagline(e.target.value)}
              className="w-full bg-[#12100e] border border-[#2e2722] rounded-xl px-4 py-2.5 text-xs text-[#faf7f2] focus:outline-none"
            />

            <textarea
              rows={3}
              placeholder="Short description..."
              value={wnDesc}
              onChange={(e) => setWnDesc(e.target.value)}
              className="w-full bg-[#12100e] border border-[#2e2722] rounded-xl px-4 py-2.5 text-xs text-[#faf7f2] focus:outline-none"
            />

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#faf7f2] text-[#12100e] text-xs font-mono font-bold uppercase tracking-widest rounded-full cursor-pointer"
            >
              + Publish to What's New Section
            </button>
          </form>
        )}

        {/* Tab 3: Create Offer */}
        {activeTab === 'offers' && (
          <form onSubmit={handleAddOfferSubmit} className="bg-[#1c1815] p-6 rounded-3xl border border-[#2e2722] space-y-4">
            <h3 className="font-serif text-xl text-[#faf7f2]">Create Personal Café Offer</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Offer Title (e.g. 20% OFF COLD BREWS) *"
                value={offTitle}
                onChange={(e) => setOffTitle(e.target.value)}
                className="bg-[#12100e] border border-[#2e2722] rounded-xl px-4 py-2.5 text-xs text-[#faf7f2] focus:outline-none"
              />

              <input
                type="text"
                required
                placeholder="Promo Code (e.g. BREW20) *"
                value={offCode}
                onChange={(e) => setOffCode(e.target.value)}
                className="bg-[#12100e] border border-[#2e2722] rounded-xl px-4 py-2.5 text-xs text-[#faf7f2] focus:outline-none"
              />
            </div>

            <textarea
              rows={2}
              placeholder="Offer description..."
              value={offDesc}
              onChange={(e) => setOffDesc(e.target.value)}
              className="w-full bg-[#12100e] border border-[#2e2722] rounded-xl px-4 py-2.5 text-xs text-[#faf7f2] focus:outline-none"
            />

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#faf7f2] text-[#12100e] text-xs font-mono font-bold uppercase tracking-widest rounded-full cursor-pointer"
            >
              + Launch Personal Offer
            </button>
          </form>
        )}

        {/* Tab 4: Add Event */}
        {activeTab === 'events' && (
          <form onSubmit={handleAddEventSubmit} className="bg-[#1c1815] p-6 rounded-3xl border border-[#2e2722] space-y-4">
            <h3 className="font-serif text-xl text-[#faf7f2]">Publish Café Event / Happening</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Event Title (e.g. Jazz & Cold Brew Night) *"
                value={evtTitle}
                onChange={(e) => setEvtTitle(e.target.value)}
                className="bg-[#12100e] border border-[#2e2722] rounded-xl px-4 py-2.5 text-xs text-[#faf7f2] focus:outline-none"
              />

              <input
                type="text"
                required
                placeholder="Date & Time (e.g. Saturday · Oct 28) *"
                value={evtDate}
                onChange={(e) => setEvtDate(e.target.value)}
                className="bg-[#12100e] border border-[#2e2722] rounded-xl px-4 py-2.5 text-xs text-[#faf7f2] focus:outline-none"
              />
            </div>

            <textarea
              rows={2}
              placeholder="Event description..."
              value={evtDesc}
              onChange={(e) => setEvtDesc(e.target.value)}
              className="w-full bg-[#12100e] border border-[#2e2722] rounded-xl px-4 py-2.5 text-xs text-[#faf7f2] focus:outline-none"
            />

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#faf7f2] text-[#12100e] text-xs font-mono font-bold uppercase tracking-widest rounded-full cursor-pointer"
            >
              + Publish Event to Website
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
