import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, Search, User, Heart, PencilRulerIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '../ui/dark-mode-toggle';

import { ProfileMenu } from '../common/profile-menu';

const Header = () => {
  return (
    <SidebarInset>
      <div className="flex flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border rounded-md bg-background px-2">
          <SidebarTrigger />
          <div className="w-full flex-1">
            <form className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/5 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/spitfireGG"
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden md:inline-flex items-center gap-2 mr-2 px-2.5 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200"
            >
              <PencilRulerIcon
                className="h-3.5 w-3.5 text-red-500/80 group-hover:text-red-500 group-hover:rotate-12 transition-all duration-200"
                strokeWidth={1.75}
              />
              <span className="tracking-tight">
                Crafted by{' '}
                <span className="font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                  Raam Basnet
                </span>
              </span>
            </a>

            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <ProfileMenu />
            <ModeToggle />
          </div>
        </header>
      </div>
    </SidebarInset>
  );
};

export default Header;
