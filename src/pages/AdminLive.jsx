import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SocketIOClient from "socket.io-client";

const AdminLive = () => {
  const [socket, setSocket] = useState(null);
  const [adminDraftData, setAdminDraftData] = useState();
  const socket_url = import.meta.env.VITE_REACT_APP_SOCKET_URL;
  const { id } = useParams();

  useEffect(() => {
    const socket = SocketIOClient(socket_url);

    setSocket(socket);

    socket.on("connect", () => {
      console.log("Connected to server with ID: " + socket.id);
    });

    socket.emit("join_draft_room", {
      draftId: id,
    });

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
  }, [socket_url, id]);

  const allPlayers = adminDraftData?.players;
  const allCoaches = adminDraftData?.coaches;
  const liveTeams = adminDraftData?.teams;

  return (
    <div className="p-8">
      <div className="flex gap-5">
        <div className="teamlist">
          <h1>Team List</h1>
          <div className="wrapper">
            {liveTeams?.map((team, idx) => (
              <div
                key={idx}
                className="m-3 bg-rose-800 w-fit text-white flex justify-between flex-col p-3 text-sm cursor-pointer rounded-lg border"
              >
                {team.team_name}
              </div>
            ))}
          </div>
        </div>
        <div className="currplayer">Current Player</div>
        <div className="timer">Timer</div>
      </div>
      <div className="playerlsts">
        <h1>Players</h1>
        <div className="boixes flex gap-2 flex-wrap text-white">
          {allPlayers?.map((player, idx) => (
            <div
              key={idx}
              className={`m-3 bg-rose-800 flex justify-between flex-col p-1 text-sm   rounded-lg border ${
                player.is_player_selected ? "disabled" : ""
              }`}
              style={{ opacity: player.is_player_selected ? 0.5 : 1 }}
            >
              {player.full_name}
              <p className="bg-emerald-400 p-1 m-2 w-fit rounded-full px-2.5">
                {idx}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="coaches">
        <h1>Coaches</h1>
        <div className="wrapper">
          {allCoaches?.map((coach, idx) => (
            <div
              key={idx}
              className="m-3 bg-rose-800 w-fit text-white flex justify-between flex-col p-3 text-sm cursor-pointer rounded-lg border"
            >
              {coach.full_name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminLive;
