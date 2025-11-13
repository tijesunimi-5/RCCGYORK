'use client'
import Boot from "@/components/Boot";
import Announcements from "@/components/hooks/Announcements";
import Events from "@/components/hooks/Events";
import NewsLetter from "@/components/hooks/NewsLetter";
import { Hero } from "@/components/hooks/Hero";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { ServiceTimes } from "@/components/hooks/ServiceTime";
import About from "@/components/hooks/About";
import Contact from "@/components/hooks/Contact";
import Ministers from "@/components/hooks/Ministers";
import { PastorMessage } from "@/components/hooks/PastorMessage";
import { Ministries } from "@/components/hooks/Minisitries";
import { Footer } from "@/components/hooks/Footer";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  })

  return (
    <section className=" overflow-x-hidden">
      {/* {loading && <Boot />} */}

      <Hero />
      <ServiceTimes />
      <About />
      <PastorMessage />
      <Ministers />
      <Ministries />
      <Contact />
      <Footer />
    </section>
  );
}
