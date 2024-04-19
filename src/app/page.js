'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import Modal from '@/components/Modal';
import dummy from '@/data.json';


export default function Home() {

  const [open, setOpen] = useState(true);
  const [data, setData] = useState(dummy);

  const columns = [
    "Date",
    "Report Name",
    "Download"
  ]
  return (
    <div className="h-screen w-full flex justify-center items-center">
      {open && (<>
        <div className="absolute left-0 top-0 bg-white/30 backdrop-blur-md h-screen w-full"></div>
        <Modal columns={columns} data={data} close = {()=> setOpen(false)} />
        </>
      )}
      <button type="button" onClick={()=> setOpen(true)} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Yellow</button>
    </div>
  );
}
