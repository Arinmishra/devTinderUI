import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import { Link } from "react-router";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
    } catch (err) {
      if (err.response && err.response.status === 404) {
        dispatch(addConnections([])); // ✅ Still update Redux with empty array
      } else {
        console.error("Error fetching connections:", err); // ✅ Handle other errors
      }
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  return connections.length === 0 ? (
    <div className="card bg-base-100 w-96 shadow-2xl block mx-auto mt-20 mb-70">
      <div className="card-body">
        <h2 className="card-title">No connections yet!</h2>
        <p>Go to feed and make connections</p>
      </div>
    </div>
  ) : (
    <div className="block mx-auto mt-20 mb-60 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <ul className="list bg-base-100 rounded-box shadow-2xl">
        <li className="p-4 mb-8 font-bold text-xl text-center tracking-wide border-b border-neutral-300">
          Your Connections 🤝
        </li>

        {connections.map((c) => (
          <li
            className="list-row border-b-neutral-300 flex items-center gap-4 p-3 h-24 overflow-hidden"
            key={c._id}
          >
            {/* Profile Picture */}
            <div className="min-w-[40px]">
              <img
                className="w-10 h-10 rounded-box border border-success object-cover"
                src={c.photoURL}
                alt={c.firstName}
              />
            </div>

            {/* Name & Details */}
            <div className="flex-1 overflow-hidden">
              <div className="font-medium truncate">
                {c.firstName + " " + c.lastName}
              </div>
              {(c.about || c.skills) && (
                <div className="text-xs uppercase font-semibold opacity-60 truncate">
                  {c.about || c.skills}
                </div>
              )}
            </div>

            {/*Remove Button */}
            <Link to={"/chat/" + c._id}>
              <button className="btn btn-info text-sm  px-4">Chat</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connections;
