import React from 'react'

const SideBar = () => {
  return (
    <aside className="fixed left-0 top-20 h-screen w-64 bg-white  text-[#818da9] p-8 ">
      <nav>
        <ul>
          <li className="p-2 hover:bg-gray-700 rounded">Home</li>
          <li className="p-2 hover:bg-gray-700 rounded">Transactions</li>
          <li className="p-2 hover:bg-gray-700 rounded">Settings</li>
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar
