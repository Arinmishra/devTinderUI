import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";
import { removeConnections } from "../utils/connectionsSlice";
import { removeRequests } from "../utils/requestsSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnections());
      dispatch(removeRequests());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          {user ? (
            <Link to="/" className="btn btn-ghost text-xl">
              ❤️‍🔥DevTinder
            </Link>
          ) : (
            <p className="btn btn-ghost text-xl"> ❤️‍🔥DevTinder</p>
          )}
        </div>

        {user && (
          <>
            <p className="m-3">Hey {user.firstName}👋</p>
            <div className="flex gap-2">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Profile" />
                    ) : null}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-4 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile 👤
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/connections">Connections 🤝</Link>
                  </li>
                  <li>
                    <Link to="/requests">Requests 📥</Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={handleLogout}>
                      Logout 📴
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
