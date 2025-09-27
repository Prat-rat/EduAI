import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { 
    MessageCircle, GraduationCap, BookOpen, Plus, Menu, Moon, Sun, 
    FileText, FileQuestion, PencilRuler, Bot, Archive 
} from "lucide-react";
import { Button } from "../components/ui/button";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  
  // If we're on the main dashboard, don't render layout
  if (location.pathname === '/') {
    return children;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}