import { useEffect, useState } from "react";
import { Home } from "./components/Home";
import { ProfilePage } from "./pages/ProfilePage";

function currentRoute() {
  return window.location.hash.replace(/^#/, "") || "/";
}

export function App() {
  const [route, setRoute] = useState(currentRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(currentRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <div className="app">
      <nav className="app-nav">
        <a href="#/">Home</a>
        <a href="#/profile">Profile</a>
      </nav>
      {route === "/profile" ? <ProfilePage /> : <Home />}
    </div>
  );
}
