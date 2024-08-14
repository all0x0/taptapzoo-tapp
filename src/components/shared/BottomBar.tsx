import React from "react";
import { Home, Search, User } from "lucide-react";

const BottomBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
        <BottomBarItem icon={<Home />} label="Home" />
        <BottomBarItem icon={<Search />} label="Search" />
        <BottomBarItem icon={<User />} label="Profile" />
      </div>
    </div>
  );
};

interface BottomBarItemProps {
  icon: React.ReactNode;
  label: string;
}

const BottomBarItem: React.FC<BottomBarItemProps> = ({ icon, label }) => {
  return (
    <button className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
      {React.cloneElement(icon as React.ReactElement, {
        className: "w-6 h-6 mb-1 text-gray-500 group-hover:text-blue-600",
      })}
      <span className="text-sm text-gray-500 group-hover:text-blue-600">
        {label}
      </span>
    </button>
  );
};

export default BottomBar;
