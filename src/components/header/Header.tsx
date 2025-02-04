import Image from 'next/image'
import React from 'react'
import user from "../../../public/assets/user.png"
import { IoIosNotifications } from "react-icons/io";

const Header = () => {
  return (
    <div className=" flex justify-between fixed top-0 left-0 w-full bg-white py-6 px-8 h-[6rem] z-10">
      <h1 className="text-[#2d416f] font-bold text-[2.5rem]">Intellisight</h1>
      <div className="flex gap-4">
        <div className="text-2xl text-[#2d416f] mt-4">
          <IoIosNotifications />
        </div>
        <Image src={user} alt="Profile picture" />
        <div>
          <p className="text-[#2d416f] text-lg font-semibold leading-[1.5rem]">
            Henry Okoro
          </p>
          <p className="text-[#818da9] text-base font-normal leading-[2rem]">
            Payroll Manager
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header
