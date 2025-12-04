import { useState } from "react";
import Navbar from "../components/Navbar";
import type { NotificationItem } from "../types/notifcations";
import type { Document } from "../types/documents";
import SearchBarDocument from "./SearchBarDocumnent";
import { ListOfDocumentClient } from "./ListOfDocumentClient";
import { useTheme } from "../Zustand/themeStore";

export default function DashboardClient() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Document[]>([]);
  const theme = useTheme();
  const isDark = theme === "dark";
  // Sample notifications - replace with your actual data
  const notifications: NotificationItem[] = [
    {
      id: 1,
      title: "Welcome",
      message: "Welcome to your dashboard",
      time: "Just now",
      type: "info",
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (results: Document[]) => {
    setSearchResults(results);
  };

  const handleViewMore = (document: Document) => {
    console.log("View more:", document);
    // Add your view more logic here
  };

  const handleSummarize = (document: Document) => {
    console.log("Summarize:", document);
    // Add your summarize logic here
  };

  return (
    <div className={`min-h-screen ${isDark ? "bg-neutral-950" : "bg-gray-50"}`}>
      <Navbar
        onToggleSidebar={toggleSidebar}
        isOpen={isSidebarOpen}
        notifications={notifications}
      />

      <main className={`pt-16 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
        <SearchBarDocument onSearch={handleSearch} />

        <div className="mt-6">
          <ListOfDocumentClient
            documents={searchResults}
            onViewMore={handleViewMore}
            onSummarize={handleSummarize}
          />
        </div>
      </main>
    </div>
  );
}
