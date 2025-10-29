'use client'
import Boot from "@/components/Boot";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  })

  return (
    <section>
      {loading && <Boot />}

      <div className="first-view pt-10 bg-blue-800 w-screen h-[60vh] flex flex-col justify-center items-center">
        <h1 className="text-white font-semibold text-2xl text-center">
          Church on a mission. People with purpose.
        </h1>

        <button className="px-4 shadow-lg bg-blue-700 py-1.5 border-white border text-white rounded-2xl mt-7">
          Online Church
        </button>
        <button className="btn mt-2">I'm New</button>
      </div>
    </section>
  );
}
