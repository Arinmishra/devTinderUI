import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, deleteRequest } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {
      if (err.response && err.response.status === 404) {
        dispatch(addRequests([])); // ✅ Still update Redux with empty array
      } else {
        console.error("Error fetching connections:", err); // ✅ Handle other errors
      }
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      dispatch(deleteRequest(requestId));
    } catch (err) {
      console.log(err);
    }
  };

  if (!requests) return;

  return requests.length === 0 ? (
    <div className="card bg-base-100 w-96 shadow-2xl block mx-auto mt-20 mb-70">
      <div className="card-body">
        <h2 className="card-title">No connection requests found!</h2>
      </div>
    </div>
  ) : (
    <div className="block mx-auto mt-20 mb-60 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <ul className="list bg-base-100 rounded-box shadow-2xl">
        <li className="p-4 mb-8 font-bold text-xl text-center tracking-wide border-b border-neutral-300">
          Requests 📥
        </li>

        {requests.map((r) => {
          const { _id, firstName, lastName, photoURL, about, skills } =
            r.fromUserId;
          // console.log(requests);
          return (
            <li
              className="list-row border-b-neutral-300 flex items-center gap-4 p-3 h-24 overflow-hidden"
              key={_id}
            >
              {/* Profile Picture */}
              <div className="min-w-[40px]">
                <img
                  className="w-10 h-10 rounded-box border border-success object-cover"
                  src={photoURL}
                  alt={firstName}
                />
              </div>

              {/* Name & Details */}
              <div className="flex-1 overflow-hidden">
                <div className="font-medium truncate">
                  {firstName + " " + lastName}
                </div>
                {(about || skills) && (
                  <div className="text-xs uppercase font-semibold opacity-60 truncate">
                    {about || skills}
                  </div>
                )}
              </div>

              <button
                className="btn btn-success text-xs p-2"
                onClick={() => reviewRequest("accepted", r._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-error text-xs p-2"
                onClick={() => reviewRequest("rejected", r._id)}
              >
                Reject
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Requests;
