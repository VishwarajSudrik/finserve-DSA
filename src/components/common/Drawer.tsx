import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: 'left' | 'right';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const posClass = position === 'right' ? 'right-0 pl-4 sm:pl-10' : 'left-0 pr-4 sm:pr-10';
  const slideAnimation = position === 'right' ? 'slide-in-from-right' : 'slide-in-from-left';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />
      <div className={`fixed inset-y-0 ${posClass} max-w-full flex z-50`}>
        <div className={`w-screen max-w-xs sm:max-w-sm bg-white shadow-2xl flex flex-col animate-in fade-in ${slideAnimation} duration-300`}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/80 backdrop-blur-xs">
            <h3 className="text-base font-extrabold text-slate-900">{title || 'Menu'}</h3>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
