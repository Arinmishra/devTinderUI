import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) return;

  return user && <EditProfile user={user} />;
};

export default Profile;
