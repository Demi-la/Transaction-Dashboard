import Image from 'next/image'
import user from "../../../public/assets/user.png"
import { IoIosNotifications } from "react-icons/io";

const Header = () => {
  return (
    <div className=" flex justify-between fixed top-0 left-0 w-full bg-white py-6 lg:px-8 md:px-8 px-4 h-[6rem] z-10">
      <h1 className="text-[#2d416f] font-bold lg:text-[2.5rem] md:text-[2rem] text-[1.5rem]">
        Intellisight
      </h1>
      <div className="flex gap-4">
        <div className="text-2xl hidden md:block lg:block text-[#2d416f] mt-4">
          <IoIosNotifications />
        </div>
        <Image src={user} alt="Profile picture" />
        <div>
          <p className="text-[#2d416f] lg:text-lg md:text-lg text-base font-semibold leading-[1.5rem]">
            Henry Okoro
          </p>
          <p className="text-[#818da9] lg:text-base md:text-base text-sm font-normal leading-[2rem]">
            Payroll Manager
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header
