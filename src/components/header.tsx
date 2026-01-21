import { observer } from "mobx-react-lite";
import { authStore } from "../modules/auth/authStore";
import { getFileUrl } from "../utils/fileUrl";
import ".././styles/header.scss";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const Header = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = authStore.loggedInUser;
  const isFavoritesPage = location.pathname === "/favorites";

  if (!user) {
    return <div className="header" />;
  }

  const onMenuItemClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "favorites") {
      navigate("/favorites");
      return;
    }
    if (key === "home") {
      navigate("/home");
      return;
    }
    if (key === "logout") {
      authStore.logOut();
    }
  };
  const menuItems: MenuProps["items"] = [
    isFavoritesPage
      ? { key: "home", label: "Home" }
      : { key: "favorites", label: "Favorites" },
    { key: "logout", label: "Log out" },
  ];

  return (
    <div className="header">
      <div className="headerUser">
        <img src={getFileUrl(user.photo)} alt="Profile" />
      </div>
      <div className="headerMenu">
        <Dropdown
          menu={{
            items: menuItems,
            onClick: onMenuItemClick,
            className: "headerDropdownMenu",
          }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <button type="button" className="headerMenuButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </Dropdown>
      </div>
    </div>
  );
});

export default Header;
