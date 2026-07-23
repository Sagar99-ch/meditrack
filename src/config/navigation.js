import {
  LayoutDashboard,
  Pill,
  ShoppingCart,
  Truck,
  Boxes,
  FileText,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Medicines",
    path: "/medicines",
    icon: Pill,
  },
  {
    title: "Purchase",
    path: "/purchase",
    icon: ShoppingCart,
  },

  {
    title: "Stock update",
    path: "/stock-update",
    icon: Boxes,
  },
  {
    title: "Suppliers",
    path: "/suppliers",
    icon: Truck,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];
