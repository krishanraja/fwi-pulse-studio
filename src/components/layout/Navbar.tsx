import { useState } from 'react';
import { Settings, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import SettingsSheet from '@/components/SettingsSheet';
import fractionlLogo from '@/assets/fractionl-logo.png';

const Navbar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container-width !px-4 sm:!px-6 lg:!px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Wordmark - aligned with content below */}
            <div className="flex items-center -ml-0">
              <img 
                src={fractionlLogo} 
                alt="Fractionl" 
                className="h-16 object-contain"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSettingsOpen(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Settings size={20} />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <User size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="cursor-pointer">
                    <LogIn size={16} className="mr-2" />
                    Sign In
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-muted-foreground text-sm">
                    Create Account
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <SettingsSheet open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
};

export default Navbar;
