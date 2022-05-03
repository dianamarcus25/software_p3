import React from 'react'

// importing icons for sidebar 
import * as HiIcons from "react-icons/hi";
import * as BiIcons from "react-icons/bi";
import * as FiIcons from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

export const Sidebar_elements = [

    {
        title: "Dashboard",
        icon:  <HiIcons.HiOutlineHome />,
        page: "/DashboardLoggedin",
        class_name:'nav-text'
    },
    {
        title: "Forum",
        icon: <FaIcons.FaEnvelopeOpenText />,
        page: "#",
        class_name:'nav-text'
    },
    {
        title: "Chat Room",
        icon: <MdIcons.MdOutlineForum />,
        page: "/join",
        class_name:'nav-text'
    },
    {
        title: "Search",
        icon: <BiIcons.BiSearchAlt />,
        page: "/search",
        class_name:'nav-text'
    },
    {
        title: "Settings",
        icon: <FiIcons.FiSettings />,
        page: "#",
        class_name:'nav-text'
    },
    {
        title: "Contact Us",
        icon: <FiIcons.FiFileText />,
        page: "#",
        class_name:'nav-text'
    },
    {
        title: "Help Center",
        icon: <BiIcons.BiHelpCircle />,
        page: "#",
        class_name:'nav-text'
    },
];
