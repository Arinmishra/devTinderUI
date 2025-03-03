import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeCardFromFeed } from "../utils/feedSlice";
import { useState } from "react";

const FeedCard = ({ user }) => {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const handleSendRequest = async (status, toUserId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + toUserId,
        {},
        { withCredentials: true }
      );
      dispatch(removeCardFromFeed(_id));
    } catch (err) {
      if (toUserId === user._id) {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2700);
        console.log("haha ha u r sending req to yourselt");
      }
      console.log(err);
    }
  };

  if (!user)
    return (
      <div className="card bg-base-100 w-96 shadow-2xl block mx-auto mt-20 mb-70">
        <div className="card-body">
          <h2 className="card-title">
            You've reached end of feed. No more new users found in feed 🥲!
          </h2>
        </div>
      </div>
    );
  const { _id, firstName, lastName, age, gender, skills, about, photoURL } =
    user;

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-center z-20">
          <div className="alert alert-warning flex flex-col gap-0">
            <span>Haha.. You cannot ignore or reject yourself 😂.</span>
            <progress className="progress w-56"></progress>
          </div>
        </div>
      )}
      <div className="flex justify-center  ">
        <div className="card bg-base-100  w-96 h-[600px] shadow-2xl my-10 flex flex-col">
          {/* Image Section */}

          <figure className="h-fit flex justify-center overflow-hidden rounded-4xl">
            {photoURL ? (
              <img
                className="w-full max-w-xs h-auto rounded-4xl p-2 object-contain"
                src={photoURL}
                alt="Profile"
              />
            ) : null}
          </figure>

          {/* Card Body */}
          <div className="card-body flex flex-col justify-between">
            <div>
              <h2 className="card-title font-bold text-xl overflow-auto mb-2.5 text-black">
                {firstName + " " + lastName}
              </h2>
              <div className="font-medium">
                {/* Conditionally show age and gender if available */}
                {(age || gender) && (
                  <p className="text-lg  text-emerald-700 ">
                    {age && <span>{age}</span>}
                    {gender && <span>{" • " + gender}</span>}
                  </p>
                )}

                {/* Conditionally show skills if available */}
                {skills?.length > 0 && (
                  <p className="text-base  text-cyan-800 overflow-auto">
                    🌟 {skills.join(", ")}
                  </p>
                )}

                {/* Conditionally show about if available */}
                {about && (
                  <p className="text-base  text-emerald-700 overflow-auto">
                    • {about}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="card-actions justify-center">
              <button
                className="btn btn-success"
                onClick={() => handleSendRequest("interested", _id)}
              >
                Interested
              </button>
              <button
                className="btn btn-error"
                onClick={() => handleSendRequest("ignored", _id)}
              >
                Ignore
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedCard;
