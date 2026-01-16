import { observer } from "mobx-react-lite";
import { authStore } from "../modules/auth/authStore";
import { getFileUrl } from "../utils/fileUrl";
import ".././styles/header.scss";

const Header = observer(() => {
  const user = authStore.loggedInUser;

  if (!user) {
    return <div className="header" />;
  }

  return (
    <div className="header">
      <div className="headerUser">
        <img src={getFileUrl(user.photo)} alt="Profile" />
      </div>
      <div className="headerMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
    </div>
  );
});

export default Header;
