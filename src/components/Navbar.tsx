import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Zap, LayoutDashboard, Trophy, BarChart3, BookOpen, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/topics", label: "Topics", icon: BookOpen },
    { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { to: "/performance", label: "Stats", icon: BarChart3 },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-gradient-primary">Codexium</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              <Button
                variant={isActive(link.to) ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:block">
            {user?.user_metadata?.username || user?.email}
          </span>
          <Button variant="ghost" size="icon" onClick={signOut}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
