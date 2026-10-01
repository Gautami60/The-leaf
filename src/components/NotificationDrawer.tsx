import React from 'react';
import { X, Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import type { NotificationItem } from '../types/reservation';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#12100e]/80 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-md bg-[#1c1815] border-l border-[#2e2722] h-full p-6 shadow-2xl flex flex-col justify-between animate-fade-in">
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#2e2722]">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#7d8c79]" />
              <h3 className="font-serif text-xl text-[#faf7f2]">Notifications Feed</h3>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-[#12100e] text-[#c4bcae] hover:text-[#faf7f2] border border-[#2e2722] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex justify-between items-center py-3 text-xs font-mono text-[#c4bcae]">
            <span>Real-time System Logs</span>
            <button
              onClick={onMarkAllRead}
              className="text-[#7d8c79] hover:underline cursor-pointer"
            >
              Mark all read
            </button>
          </div>

          {/* List */}
          <div className="space-y-3 mt-2 overflow-y-auto max-h-[70vh] pr-1">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-xl border transition-all ${
                  n.type === 'warning'
                    ? 'bg-[#d4a373]/10 border-[#d4a373]/30 text-[#d4a373]'
                    : n.type === 'success'
                    ? 'bg-[#7d8c79]/10 border-[#7d8c79]/30 text-[#7d8c79]'
                    : 'bg-[#12100e] border-[#2e2722] text-[#faf7f2]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif text-sm font-semibold flex items-center gap-1.5">
                    {n.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5" />}
                    {n.type === 'success' && <CheckCircle className="w-3.5 h-3.5" />}
                    {n.type === 'info' && <Info className="w-3.5 h-3.5" />}
                    {n.title}
                  </span>
                  <span className="text-[10px] font-mono opacity-60">{n.timestamp}</span>
                </div>

                <p className="text-xs text-[#c4bcae] font-light leading-relaxed">{n.message}</p>
                
                <span className="inline-block mt-2 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#12100e]/60 border border-[#2e2722] opacity-80">
                  Recipient: {n.recipient}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#12100e] hover:bg-[#2e2722] text-[#faf7f2] text-xs font-mono uppercase tracking-widest rounded-full border border-[#2e2722] transition-colors cursor-pointer mt-4"
        >
          Close Feed
        </button>

      </div>
    </div>
  );
};
