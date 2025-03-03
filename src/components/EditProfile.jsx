import { useState } from "react";
import FeedCard from "./FeedCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [skills, setSkills] = useState(user?.skills || []);

  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const updatedUser = {
    firstName,
    lastName,
    age,
    gender,
    about,
    skills,
    photoURL,
  };

  const handleSaveProfile = async () => {
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", updatedUser, {
        withCredentials: true,
      });
      dispatch(addUser(res?.data?.data));
      setErrorMessage("");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    } catch (err) {
      setErrorMessage(err.response.data);
      console.log(err);
    }
  };

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-center z-20">
          <div className="alert alert-success flex flex-col gap-0">
            <span>👍 Profile saved successfully 🎉.</span>
            <progress className="progress w-56"></progress>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row justify-center gap-10 ">
          <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box mx-auto my-10">
            <legend className="fieldset-legend">Edit Profile</legend>

            <label className="fieldset-label">First Name</label>
            <input
              type="text"
              className="input"
              placeholder="first Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="fieldset-label">Last Name</label>
            <input
              type="text"
              className="input"
              placeholder="last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <label className="fieldset-label">Age</label>
            <input
              type="text"
              className="input"
              placeholder="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <label className="fieldset-label">Gender</label>
            <select
              className="input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label className="fieldset-label">Skills</label>
            <input
              type="text"
              className="input"
              placeholder="Enter skills (comma separated)"
              value={skills}
              onChange={(e) => setSkills(e.target.value.split(","))}
            />

            <label className="fieldset-label">About</label>
            <input
              type="text"
              className="input"
              placeholder="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />

            <label className="fieldset-label">Photo Url</label>
            <input
              type="text"
              className="input"
              placeholder="photo url"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />

            <p className="font-medium text-red-500">{errorMessage}</p>

            <button
              className="btn btn-neutral mt-4"
              onClick={handleSaveProfile}
            >
              Save Profile
            </button>
          </fieldset>

          <div className=" flex flex-col items-center w-full md:w-auto ">
            <h2 className="text-lg font-bold mt-2 md:mt-0 text-center md:text-left">
              Preview 👇
            </h2>

            <FeedCard user={updatedUser} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
