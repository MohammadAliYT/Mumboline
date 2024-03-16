import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";

export default function Signout() {
  let history = useHistory();

  useEffect(() => {
    axios.get("/api/logout", { withCredentials: true });
    history.push("/");
  }, []);

  return (<div>Farewell</div>);
}
