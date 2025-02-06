import { GrTransaction } from "react-icons/gr";
const SideBar = () => {
  return (
    <aside className="fixed left-0 top-20 h-screen w-64 bg-white  text-[#818da9] p-8 ">
      <nav>
        <ul>
          <li className="p-4 flex gap-2 text-[1.2rem] hover:bg-gray-700 rounded ">
            <span className="mt-[6px]">
              <GrTransaction />
            </span>
            Transactions
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
