import  { useEffect, useState } from "react";
import { Icons } from "../../../icons";
import { assets } from "../../../assets/assets";
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null); // Track parent menus
  const [openSubMenu, setOpenSubMenu] = useState({}); // Track nested submenus
  let [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab" || "Dashboard")
  );

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const [activeSubMenu, setActiveSubMenu] = useState({}); // Track active submenu item

  const menuItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <Icons.home />,
      subMenu: [],
    },
    {
      name: "Profile",
      icon: <Icons.User />,
      subMenu: [
        { name: "Users", link: "users" },
        { name: "Unverified Trainers", link: "unverified-trainer" },
        { name: "Verified Trainers", link: "verified-trainer" },
      ],
    },
    {
      name: "Blog management",
      link: "/dashboard",
      icon: <Icons.post_sidebaricon />,
      subMenu: [],
    },
    {
      name: "Call Management",
      icon: <Icons.call />,
      subMenu: [
        { name: "Completed Calls", link: "creators" },
        { name: "Rejected Calls", link: "brands" }, // may remove later 
      ],
    },
   
   


   
  ];

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index); // Toggle main menu
  };

  const toggleSubMenu = (parentIndex, subIndex) => {
    setOpenSubMenu((prev) => ({
      ...prev,
      [`${parentIndex}-${subIndex}`]: !prev[`${parentIndex}-${subIndex}`], // Toggle submenu
    }));
  };

  const renderSubMenu = (subMenu, parentIndex) => {
    return subMenu.map((subItem, subIndex) => (
      <div key={subIndex}>
        <Link
          to={subItem.link}
          className={`submenu-link ${
            activeSubMenu === subItem.name ? "active-text" : ""
          }`}
          onClick={() => {
            toggleSubMenu(parentIndex, subIndex);
            setActiveSubMenu(subItem.name);
          }}>
          <div className=" flex justify-between">
            {subItem.name}
            {subItem.subMenu && // Show toggle icon if nested submenu exists
              (openSubMenu[`${parentIndex}-${subIndex}`] ? (
                <Icons.Chevron size={15} className="mt-1" />
              ) : (
                <Icons.ChevroDown size={15} className="mt-1" />
              ))}
          </div>
        </Link>

        {/* Render nested submenu */}
        {subItem.subMenu && openSubMenu[`${parentIndex}-${subIndex}`] && (
          <div className="nested-submenu">
            {renderSubMenu(subItem.subMenu, `${parentIndex}-${subIndex}`)}
          </div>
        )}
      </div>
    ));
  };

  const handleLogout = () => {
    localStorage.removeItem('fitness_token');
    localStorage.removeItem('fitness_userId');
    localStorage.removeItem('fitness_userName');
    navigate('/login'); // Redirect to login page
};


  return (
    <div className="sidebar-main-container scrollbar-hide">
      {/* Logo */}
      <div className="sidebar-logo">
        <img src={assets.dashboaedlogo} alt="logo" />
      </div>
      {/* Menu */}
      <nav className="sidebar-menu ">
        {menuItems.map((item, index) => (
          <div key={index} className={`mb-2`}>
            {/* Parent Menu */}
            <Link
              to={item.link}
              className={`sidebar-parent-menu group ${
                activeTab === item.name ? "active " : ""
              }`}
              onClick={() => {
                toggleMenu(index);
                setActiveTab(item.name);
              }}>
              <div className="side-menu-icon">
                {item.icon}
                <span className="font-normal">{item.name}</span>
              </div>
              {/* Toggle Icon */}
              {item.subMenu.length > 0 &&
                (openMenu === index ? <Icons.Chevron /> : <Icons.ChevroDown />)}

              {/* Simulated Left Border */}
              <span className="side-Simulated-border"></span>
            </Link>

            {/* Submenu */}
            {openMenu === index && item.subMenu.length > 0 && (
              <div className="sidebar-submenu">
                {renderSubMenu(item.subMenu, index)}
              </div>
            )}
          </div>
        ))}
      </nav>
      {/* Footer */}
      <div className="sidebar-logout" onClick={()=> handleLogout()} >
        <span>
          <Icons.logout size={20} className="side-logout-icon" />
        </span>
        <span>Logout</span>
      </div>
    </div>
  );
};

export default SideBar;
