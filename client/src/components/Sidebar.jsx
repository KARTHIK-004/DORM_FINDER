import { useState, useEffect } from "react";
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

export default function Sidebar({ userRole, isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("");
  const { toast } = useToast();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
      const response = await fetch(`/api/auth/signout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "You have been successfully logged out.",
        });
        navigate("/sign-in");
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to logout");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during logout",
      });
    }
  };

  const getNavItems = () => {
    switch (userRole) {
      case "student":
        return [
          { name: "Profile", icon: User, path: "/dashboard/profile" },
          { name: "Favorites", icon: Heart, path: "/dashboard/favorites" },
          { name: "Invoices", icon: FileText, path: "/dashboard/invoices" },
          {
            name: "Booked Hostels",
            icon: Home,
            path: "/dashboard/booked-hostels",
          },
        ];
      case "agent":
        return [
          { name: "Dashboard", icon: Home, path: "/dashboard" },
          { name: "Profile", icon: User, path: "/dashboard/profile" },
          { name: "Favorites", icon: Heart, path: "/dashboard/favorites" },
          { name: "Invoices", icon: FileText, path: "/dashboard/invoices" },
          {
            name: "Booked Hostels",
            icon: Home,
            path: "/dashboard/booked-hostels",
          },
          { name: "Listings", icon: List, path: "/dashboard/listings" },
        ];
      case "admin":
        return [
          { name: "Dashboard", icon: Home, path: "/dashboard" },
          {
            name: "Agent Requests",
            icon: User,
            path: "/dashboard/agent-requests",
          },
          {
            name: "Approved Agents",
            icon: User,
            path: "/dashboard/approved-agents",
          },
          { name: "All Listings", icon: List, path: "/dashboard/all-listings" },
        ];
      default:
        return commonItems;
    }
  };

  const navItems = getNavItems();

  const SidebarContent = ({ isMobileView = false }) => (
    <TooltipProvider>
      <div className={`border-b  p-4 flex items-center justify-between h-16`}>
        <Link to="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-primary" />
          {(!isSidebarCollapsed || isMobileView) && (
            <span className="font-bold">DormMap</span>
          )}
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <TooltipProvider key={item.name} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={
                        activeTab === item.name.toLowerCase()
                          ? "secondary"
                          : "ghost"
                      }
                      className="w-full justify-start"
                      onClick={() => {
                        navigate(item.path);
                        if (isMobileView) onClose();
                      }}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {(!isSidebarCollapsed || isMobileView) && (
                        <span>{item.name}</span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  {!isMobileView && isSidebarCollapsed && (
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ))}
          </nav>
        </div>
      </ScrollArea>
      <Separator className="my-4" />
      <div className="p-4 space-y-2">
        {!isMobileView && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-center md:justify-start"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              >
                {isSidebarCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    <span>Collapse</span>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>
                {isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              </p>
            </TooltipContent>
          </Tooltip>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {(!isSidebarCollapsed || isMobileView) && <span>Logout</span>}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to logout?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action will end your current session. You'll need to log in
                again to access your account.
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
    </TooltipProvider>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-[280px] sm:w-[360px] p-0">
          <div className="flex flex-col h-full">
            <SidebarContent isMobileView={true} />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className={`${
        isSidebarCollapsed ? "w-20" : "w-64"
      } flex flex-col h-screen bg-background border-r fixed top-0 left-0 z-40 transition-all duration-300 ease-in-out`}
    >
      <SidebarContent />
    </div>
  );
}
