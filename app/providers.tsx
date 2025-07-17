'use client';


import { ThemeProvider, useTheme } from "next-themes";
import { toast, ToastContainer } from "react-toastify";
import { ReactNode, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable'; // 若以后要用





export function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Draggable);
  }, []);
  return <>{children}</>;
}
