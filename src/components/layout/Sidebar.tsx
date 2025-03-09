
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  BarChart2, 
  ChevronLeft, 
  ChevronRight, 
  Home 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', name: 'Dashboard', icon: Home },
  { path: '/users', name: 'Utilisateurs', icon: Users },
  { path: '/documents', name: 'Documents', icon: FileText },
  { path: '/statistics', name: 'Statistiques', icon: BarChart2 },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  return (
    <div 
      className={cn(
        "fixed top-0 left-0 h-full bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))] transition-width z-10",
        collapsed ? "w-[var(--sidebar-width-collapsed)]" : "w-[var(--sidebar-width)]"
      )}
    >
      <div className="flex flex-col h-full py-6">
        <div className="flex items-center justify-between px-4 mb-8">
          {!collapsed && (
            <h1 className="text-xl font-bold">SGDI Admin</h1>
          )}
          <button 
            onClick={onToggle}
            className="p-2 rounded-full hover:bg-white/10"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2 px-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center px-3 py-2 rounded-lg transition-colors",
                    isActive 
                      ? "bg-white/20 text-white" 
                      : "text-gray-300 hover:bg-white/10",
                    collapsed && "justify-center"
                  )}
                >
                  <item.icon size={20} />
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-4 mt-auto">
          <div className="text-sm text-gray-400">
            {!collapsed && <p>© 2023 SGDI Admin</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
