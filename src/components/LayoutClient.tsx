"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import ClientWrapper from "@/components/ClientWrapper";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // ✅ Sidebar sirf "/" aur "/auth" par hide hoga
  const hideSidebar = pathname === "/" || pathname.startsWith("/auth");

  return (
    <>
      {!hideSidebar && <Sidebar />}
      {children}
      <ClientWrapper />
      <Footer />
    </>
  );
}
