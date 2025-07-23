import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Clock, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Moon,
  Sun,
  Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Entries", href: "/entries", icon: Clock },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout clicked");
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <div className={`chronos-sidebar h-screen flex flex-col transition-all duration-300 ${
      collapsed ? "w-16" : "w-64"
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/830712f0-3341-42ec-82ee-d8276850ce9d.png" 
              alt="Chronos Logo" 
              className="h-8 w-8"
            />
            <img 
              src="/lovable-uploads/382b0d96-2c8a-407b-a3c5-86c409e48bc6.png" 
              alt="Chronos" 
              className="h-6"
            />
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-hover"
        >
          {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-hover"
              }`}
            >
              <item.icon className={`h-5 w-5 ${collapsed ? "" : "mr-3"}`} />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-hover ${
            collapsed ? "px-2" : ""
          }`}
        >
          {getThemeIcon()}
          {!collapsed && <span className="ml-3">Theme</span>}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-hover ${
            collapsed ? "px-2" : ""
          }`}
        >
          <LogOut className={`h-4 w-4 ${collapsed ? "" : "mr-3"}`} />
          {!collapsed && <span>Log Out</span>}
        </Button>
      </div>
    </div>
  );
}