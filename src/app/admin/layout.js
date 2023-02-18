"use client"

import { Sidebar } from "@/components/AdminSidebar/Sidebar";
import { Role } from "@/utils/constants";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const [role, setRole] = useState("ADMIN");

  return (
    <div className="min-h-screen w-full">
      {role !== Role.employee ? (
        <>
          <Sidebar />
          <div className="ml-56 2xl:ml-64 min-h-screen min-w-[1024px] overflow-auto">
            <div className="w-full mt-14">
              <div className="fixed pl-56 2xl:pl-64 bg-white top-0 left-0 right-0 h-14 flex justify-center items-center text-5xl text-skyBlue-300 z-40">
                {role === Role.admin
                  ? "Nerusoku"
                  : role === Role.company
                  ? me?.company?.name
                  : me?.department?.name}
              </div>
              {children}
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/user/home" />
      )}
    </div>
  );
}
