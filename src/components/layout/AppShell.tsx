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
      {/* Navbar - renders on all devices */}
      <Navbar />

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
