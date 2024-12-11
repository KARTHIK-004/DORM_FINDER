import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Heart,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  FileText,
  Home,
  List,
  Calendar,
  Star,
  FilePlus,
  MessageSquare,
  UserCheck,
  UserPlus,
  BarChart,
  Building,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { logout } from "@/utils/api";

const Sidebar = ({ userRole, isOpen, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("");
  const { toast } = useToast();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const path = location.pathname.split("/")[2] || "dashboard";
    setActiveTab(path);
  }, [location]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
        variant: "success",
      });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getNavItems = () => {
    switch (userRole) {
      case "student":
        return [
          {
            name: "Profile",
            icon: User,
            path: "/dashboard/student/profile",
          },
          {
            name: "Favorites",
            icon: Heart,
            path: "/dashboard/student/favorites",
          },
          {
            name: "Invoices",
            icon: FileText,
            path: "/dashboard/student/invoices",
          },
          {
            name: "Booked Hostels",
            icon: Building,
            path: "/dashboard/student/booked-hostels",
          },
          {
            name: "Reviews",
            icon: Star,
            path: "/dashboard/student/reviews",
          },
        ];

      case "agent":
        return [
          { name: "Dashboard", icon: Home, path: "/agent" },
          { name: "Profile", icon: User, path: "/agent/profile" },
          {
            name: "Manage Listings",
            icon: List,
            path: "/agent/manage-listings",
          },
          {
            name: "Bookings",
            icon: Calendar,
            path: "/agent/bookings",
          },
          { name: "Reviews", icon: Star, path: "/agent/reviews" },
        ];

      case "admin":
        return [
          { name: "Dashboard", icon: Home, path: "/admin/dashboard" },
          {
            name: "Agent Requests",
            icon: UserPlus,
            path: "/admin/dashboard/agent-requests",
          },
          {
            name: "Approved Agents",
            icon: UserCheck,
            path: "/admin/dashboard/approved-agents",
          },
          {
            name: "All Listings",
            icon: List,
            path: "/admin/dashboard/all-listings",
          },
          {
            name: "User Feedback",
            icon: MessageSquare,
            path: "/admin/dashboard/user-feedback",
          },
          {
            name: "System Reports",
            icon: BarChart,
            path: "/admin/dashboard/reports",
          },
        ];

      default:
        return [
          { name: "Profile", icon: User, path: "/dashboard/student/profile" },
          { name: "Favorites", icon: Heart, path: "/dashboard/favorites" },
          { name: "Invoices", icon: FileText, path: "/dashboard/invoices" },
          {
            name: "Booked Hostels",
            icon: Home,
            path: "/dashboard/booked-hostels",
          },
        ];
    }
  };

  const navItems = getNavItems();

  const SidebarContent = ({ isMobileView = false }) => (
    <TooltipProvider>
      <div className="flex flex-col h-full">
        <div className="border-b p-4 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-primary" />
            {(isOpen || isMobileView) && (
              <span className="font-bold">DormMap</span>
            )}
          </Link>
        </div>
        <ScrollArea className="flex-1">
          <nav
            className={`p-4 space-y-2 ${
              isMobileView ? "flex flex-col items-start" : ""
            }`}
          >
            {navItems.map((item) => (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Button
                    variant={
                      activeTab === item.path.split("/").pop()
                        ? "secondary"
                        : "ghost"
                    }
                    className={`w-full justify-start ${
                      activeTab === item.path.split("/").pop()
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                    onClick={() => {
                      navigate(item.path);
                      setActiveTab(item.path.split("/").pop());
                      if (isMobileView) onToggle();
                    }}
                  >
                    <item.icon className={`h-4 w-4 ${isOpen ? "mr-2" : ""}`} />
                    {(isOpen || isMobileView) && <span>{item.name}</span>}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side={isOpen ? "bottom" : "right"}>
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>
        </ScrollArea>
        <Separator className="my-4" />
        <div className="p-4 space-y-2 justify-start">
          {!isMobileView && (
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={onToggle}
            >
              {isOpen ? (
                <>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  <span>Collapse</span>
                </>
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {(isOpen || isMobileView) && <span>Logout</span>}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to logout?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action will end your current session. You'll need to log
                  in again to access your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </TooltipProvider>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onToggle}>
        <SheetContent side="left" className="w-[280px] sm:w-[360px] p-0">
          <SidebarContent isMobileView={true} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } h-screen bg-background border-r fixed top-0 left-0 z-40 transition-all duration-300 ease-in-out`}
    >
      <SidebarContent />
    </aside>
  );
};

export default Sidebar;
