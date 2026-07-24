import {
  LayoutDashboard,
  Pill,
  ShoppingCart,
  Truck,
  Boxes,
  FileText,
  Settings,
  Wallet,
  ChevronRight,
  Receipt,
  PlusCircle,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },

  {
    title: "Inventory",
    icon: Pill,
    children: [
      {
        title: "Medicines",
        path: "/medicines",
        icon: Pill,
      },
      {
        title: "Stock Update",
        path: "/stock-update",
        icon: Boxes,
      },
    ],
  },

  {
    title: "Purchase",
    icon: ShoppingCart,
    children: [
      {
        title: "Purchase",
        path: "/purchase",
        icon: ShoppingCart,
      },
      {
        title: "Suppliers",
        path: "/suppliers",
        icon: Truck,
      },
    ],
  },

  {
    title: "Accounts",
    icon: Wallet,
    children: [
      {
        title: "Add Transaction",
        path: "/accounts/add-transaction",
        icon: PlusCircle,
      },
      {
        title: "Transactions",
        path: "/accounts/transactions",
        icon: Receipt,
      },
    ],
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
