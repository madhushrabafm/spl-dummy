import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SocketIOClient from "socket.io-client";

const AdminLive = () => {
  const [socket, setSocket] = useState(null);
  const [adminDraftData, setAdminDraftData] = useState();
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
      // coachId: JSON.parse(localStorage.getItem("adminid")),
    });
    console.log(">>>>--------join_draft_room------>>>>>", socket.id);

    socket.on("draft_data", (data) => {
      console.log("org draft_data -----", data);
      setAdminDraftData(data);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from server with ID: " + socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket_url]);

  console.log(adminDraftData?.players, ".......>>>>>>>>>>>.........");
  const allPlayers = adminDraftData?.players;
  const allcoaches = adminDraftData?.coaches;
  const liveTeam = adminDraftData?.teams;

  return (
    <div className="p-8">
      <div className="flex gap-5">
        <div className="teamlist">
          <h1>teamlist</h1>
          <div className="wrapper">
            {liveTeam?.map((e, idx) => {
              return (
                <div className="m-3 bg-rose-800 w-fit text-white  flex justify-between flex-col p-3 text-sm cursor-pointer rounded-lg border">
                  {e.team_name}
                </div>
              );
            })}
          </div>
        </div>
        <div className="currplayer">current player</div>
        <div className="timer">timer</div>
      </div>
      <div className="playerlsts">
        <h1>players</h1>
        <div className="boixes flex gap-2 flex-wrap text-white">
          {allPlayers?.map((e, idx) => {
            return (
              <div className="m-3 bg-rose-800 flex justify-between flex-col p-1 text-sm cursor-pointer rounded-lg border">
                {e.full_name}
                <p className="bg-emerald-400 p-1 m-2 w-fit  rounded-full px-2.5">
                  {idx}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="coaches">
        <h1>coaches</h1>
        <div className="wrapper">
          {allcoaches?.map((e, idx) => {
            return (
              <div className="m-3 bg-rose-800 w-fit text-white  flex justify-between flex-col p-3 text-sm cursor-pointer rounded-lg border">
                {e.full_name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminLive;
