import { useUser } from "@auth0/nextjs-auth0";
import { Classes } from "@blueprintjs/core";
import type { NextPage } from "next";
import { Login } from "../components/login";
import { Logout } from "../components/logout";

const Home: NextPage = () => {
  const { user } = useUser();
  return (
    <>
      <h1 className={Classes.HEADING}>ホーム</h1>
      {user ? (
        <>
          <Logout />
          <p>{user.name}</p>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
