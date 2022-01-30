import Router from "next/router";
import { useEffect } from "react";
import SuccessMessage from "./SuccessMessage";

const RouterPush = () => {
  useEffect(() => {
    Router.push({
      pathname: "/",
    });
  }, []);

  return (
    <SuccessMessage text="Redirecting">
      You are being redirected to the home page
    </SuccessMessage>
  );
};

export default RouterPush;
