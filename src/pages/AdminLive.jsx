import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SocketIOClient from "socket.io-client";

const AdminLive = () => {
  const [socket, setSocket] = useState(null);
  const socket_url = import.meta.env.VITE_REACT_APP_SOCKET_URL;
  const { id } = useParams();

  //   console.log(params);

  useEffect(() => {
    const socket = SocketIOClient(socket_url);

    setSocket(socket);

    socket.on("connect", () => {
      console.log("Connected to server with ID: " + socket.id);
    });

    socket.emit("join_draft_room", {
      draftId: id,
      //   coachId: JSON.parse(localStorage.getItem("adminid")),
    });
    console.log(">>>>--------join_draft_room------>>>>>", socket.id);

    socket.on("disconnect", () => {
      console.log("Disconnected from server with ID: " + socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket_url]);

  return <div>AdminLive</div>;
};

export default AdminLive;
