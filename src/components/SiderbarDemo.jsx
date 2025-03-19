"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
  IconArrowLeft,
  IconDashboard,
  IconNews,
  IconBriefcase,
  IconUser,
  IconSettings,
  IconUsersGroup,
  IconMessageCircle,
  IconHome,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Link, useLocation } from "react-router-dom";

export function SidebarDemo() {
  const location = useLocation();
  
  const links = [
    {
      label: "Kontrol Paneli",
      href: "/admin",
      icon: (
        <IconDashboard className="h-5 w-5 shrink-0 text-neutral-400" />
      ),
    },
    {
      label: "Blog Yönetimi",
      href: "/admin/blogs",
      icon: (
        <IconNews className="h-5 w-5 shrink-0 text-neutral-400" />
      ),
    },
    {
      label: "Referanslar",
      href: "/admin/references",
      icon: (
        <IconBriefcase className="h-5 w-5 shrink-0 text-neutral-400" />
      ),
    },
    {
      label: "Kullanıcılar",
      href: "/admin/users",
      icon: (
        <IconUsersGroup className="h-5 w-5 shrink-0 text-neutral-400" />
      ),
    },
    {
      label: "Mesajlar",
      href: "/admin/messages",
      icon: (
        <IconMessageCircle className="h-5 w-5 shrink-0 text-neutral-400" />
      ),
    },
    {
      label: "Ayarlar",
      href: "/admin/settings",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-400" />
      ),
    },
    {
      label: "Ana Sayfa",
      href: "/",
      icon: (
        <IconHome className="h-5 w-5 shrink-0 text-neutral-400" />
      ),
    },
    {
      label: "Çıkış",
      href: "/logout",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-400" />
      ),
    },
  ];
  
  const [open, setOpen] = useState(true);
  
  return (
    <div className="fixed top-0 left-0 h-screen z-40">
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10 h-screen bg-gray-900 border-r border-gray-800">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <div className="py-4 px-2">
              {open ? <Logo /> : <LogoIcon />}
            </div>
            <div className="mt-8 flex flex-col gap-2 px-2">
              {links.map((link, idx) => (
                <SidebarLink 
                  key={idx} 
                  link={link} 
                  className={location.pathname === link.href 
                    ? "bg-emerald-500/10 text-emerald-400 rounded-md border-l-2 border-emerald-500" 
                    : "hover:bg-gray-800 rounded-md text-gray-300 hover:text-white"}
                />
              ))}
            </div>
          </div>
          <div className="pb-4 px-2">
            <SidebarLink
              link={{
                label: "Admin Hesabı",
                href: "/admin/profile",
                icon: (
                  <div className="h-7 w-7 shrink-0 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                    A
                  </div>
                ),
              }} 
              className="hover:bg-gray-800 rounded-md text-gray-300 hover:text-white"
            />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      to="/admin"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white">
      <div
        className="h-6 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-emerald-500" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-white">
        Demirci Admin
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      to="/admin"
      className="relative z-20 flex items-center justify-center space-x-2 py-1 text-sm font-normal text-white">
      <div
        className="h-6 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-emerald-500" />
    </Link>
  );
};
