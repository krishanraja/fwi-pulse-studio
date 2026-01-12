import { useState, ReactNode } from 'react';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import SettingsSheet from '@/components/SettingsSheet';

interface AppShellProps {
  children: ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const AppShell = ({ children, activeTab = 'dashboard', onTabChange }: AppShellProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    onTabChange?.(tab);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Mobile Header - Minimal */}
      <header className="md:hidden sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-center h-14 px-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-xs">FWI</span>
            </div>
            <span className="font-semibold text-foreground text-sm">Fractional Working Index</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <BottomNav 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        onSettingsClick={() => setSettingsOpen(true)}
      />

      {/* Settings Sheet for mobile */}
      <SettingsSheet open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
};

export default AppShell;
