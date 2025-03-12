import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./Login";
import Body from "./Body";
import Profile from "./Profile";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import Feed from "./Feed";
import Connections from "./Connections";
import Requests from "./Requests";
import Chat from "./chat";

const isAuthenticated = document.cookie.includes("token");
function App() {
  return (
    <div>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />

              {/* other routes*/}
              <Route
                path="*"
                element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
