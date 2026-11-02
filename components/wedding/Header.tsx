"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { weddingConfig as config } from "@/config/wedding";
import { Lotus } from "@/components/ui/Ornaments";
import Modal from "@/components/ui/Modal";

export default function Header() {
  const [open, setOpen] = useState(false);
  const initials = config.monogram;
  return (
    <>
      <header className="site-header">
        <a
          className="brand"
          href="#home"
          aria-label={`${config.couple.groom} and ${config.couple.bride}, home`}
        >
          <span className="brand-monogram">{initials}</span>
          <span className="brand-caption">{config.brand.caption}</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {config.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="icon-button mobile-menu-button"
          aria-label="Open navigation"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Menu size={20} />
        </button>
      </header>
      <AnimatePresence>
        {open && (
          <Modal
            label="Navigation"
            className="navigation-modal"
            onClose={() => setOpen(false)}
          >
            <Lotus className="menu-lotus" />
            <p className="eyebrow">{initials} · Our wedding</p>
            <nav aria-label="Mobile navigation">
              {config.navigation.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  <span>0{index + 1}</span>
                  {item.label}
                </a>
              ))}
            </nav>
            <p className="menu-signoff">{config.brand.menuSignOff}</p>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
