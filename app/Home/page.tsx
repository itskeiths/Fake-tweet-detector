'use client'
import React, { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoTicketSharp } from 'react-icons/io5';
import UserInput from './UserInput';
import Fake from './fake_tweet';
const sideBarItems = [
  {
    name: 'Home',
    icon: <IoTicketSharp />,
    component: <UserInput />,
  },

  {
    name: 'History',
    icon: <IoTicketSharp />,
    component: <Fake />,
  },
];

const Main: React.FC = () => {
  const [isCollapsedSidebar, setIsCollapsedSidebar] = useState<boolean>(false);
  const [selectedComponent, setSelectedComponent] = useState<React.ReactNode | null>(<UserInput />);

  const toggleSidebar = () => {
    setIsCollapsedSidebar(prev => !prev);
  };

  const handleItemClick = (component: React.ReactNode) => {
    setSelectedComponent(component);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`w-64 bg-gray-800 text-white transition-all duration-300 ease-in-out ${isCollapsedSidebar ? 'hidden' : 'block'}`}>
        <div className="flex items-center justify-center p-8">
          <div className="font-semibold">Fake Tweet Detector</div>
        </div>
        <aside className="p-4">
          <ul>
            {sideBarItems.map(({ name, icon: Icon, component }) => (
              <li key={name} className="mb-2">
                <button
                  className="flex items-center px-4 py-2 sm:w-full  text-gray-300 hover:bg-gray-700 rounded-md"
                  onClick={() => handleItemClick(component)}
                >
                  <span className="mr-2">{Icon}</span>
                  <span className='items-center'>{name}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex items-center bg-white p-4 shadow">
          <div className="font-semibold flex items-center justify-center md:flex">Fake Tweet Detector</div>
        </div>
        <div className="flex-1">{selectedComponent}</div>
      </div>
    </div>
  );
};

export default Main;
