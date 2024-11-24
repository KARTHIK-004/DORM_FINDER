import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Heart, Calendar, MessageSquare, Menu } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { ModeToggle } from "@/components/theme/ModeToggle";

export default function StudentDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const stats = {
    savedListings: 8,
    upcomingViewings: 2,
    activeBookings: 1,
    unreadMessages: 3,
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        userRole="student"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col">
        <header className=" border-b px-4 py-2 flex items-center justify-between md:justify-end sticky top-0 z-30 h-16">
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <ModeToggle />
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto"></div>
        </main>
      </div>
    </div>
  );
}
