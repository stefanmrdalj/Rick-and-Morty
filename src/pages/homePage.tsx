import { getFileUrl } from "../utils/fileUrl";
import { authStore } from "../modules/auth/authStore";

const HomePage = () => {
  const user = authStore.loggedInUser;

  if (!user) {
    return <div className="homePage">Not logged in</div>;
  }

  return (
    <div className="homePage">
      <img src={getFileUrl(user.photo)} alt="Profile" />
      <p>
        {user.firstName} {user.lastName}
      </p>
    </div>
  );
};

export default HomePage;
