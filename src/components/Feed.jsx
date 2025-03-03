import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";

const Feed = () => {
  const dispatch = useDispatch();

  const feed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return feed && <FeedCard user={feed[0]} />;
};

export default Feed;
