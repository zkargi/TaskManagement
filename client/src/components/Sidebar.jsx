import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";
import { MdDashboard } from "react-icons/md";
import { MdOutlineAddTask } from "react-icons/md";
import { MdAddTask } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import {MdSettings} from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

const linkData = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon:<MdDashboard />,
  },
  {
    label: "Tasks",
    link: "tasks",
    icon:<FaTasks />,
  },
  {
    label: "Completed",
    link: "completed/completed",
    icon:<IoCheckmarkDoneSharp />,
  },
  {
    label: "Team",
    link: "team",
    icon:<AiOutlineTeam />
  },
  {
    label: "Trash",
    link: "trash",
    icon:<FaRegTrashAlt/>
  },
  
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#E2C3FF]",
          path === el.link.split("/")[0] ? "bg-purple-700 text-neutral-100" : ""
        )}
      >
        {el.icon}
        <span className='hover:text-[#AA3AFD]'>{el.label}</span>
      </Link>
    );
  };
  return (
    <div className='w-full  h-full flex flex-col gap-6 p-5'>
      <h1 className='flex gap-1 items-center'>
       
        <span className='text-2xl font-bold text-black'>Task Management</span>
      </h1>

      <div className='flex-1 flex flex-col gap-y-5 py-8'>
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>
      
      <div className=''>
        <button className='w-full flex gap-2 p-2 items-center text-lg text-gray-800'>
          <MdSettings />
          <span>Settings</span>
        </button>
      </div>

      
    </div>
  );
};

export default Sidebar;
