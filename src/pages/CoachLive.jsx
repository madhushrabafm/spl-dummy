import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SocketIOClient from "socket.io-client";

const CoachLive = () => {
  const [socket, setSocket] = useState(null);
  const socket_url = import.meta.env.VITE_REACT_APP_SOCKET_URL;
  const { id } = useParams();
  const [coachLiveData, setCoachLiveData] = useState();
  const adminid = localStorage.getItem("adminid");

  useEffect(() => {
    const socket = SocketIOClient(socket_url);

    setSocket(socket);

    socket.on("connect", () => {
      console.log("Connected to server with ID: " + socket.id);
    });

    socket.emit("join_draft_room", {
      draftId: id,
      coachId: localStorage.getItem("adminid"),
    });

    socket.on("draft_data", (data) => {
      console.log("COACH draft_data -----", data);
      setCoachLiveData(data);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server with ID: " + socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket_url, id]);

  const players = coachLiveData?.players;
  const coaches = coachLiveData?.coaches;
  const teams = coachLiveData?.teams;

  const playerSubmitHandler = (playerId, playerCount) => {
    socket.emit("select_player", {
      draftId: id,
      coachId: adminid,
      playerId: playerId,
      playerCount: playerCount,
      isAutomated: false,
    });

    socket.emit("end_counter", { draftId: id });
  };

  return (
    <div>
      <div className="playerlsts p-4">
        <h1>Coaches</h1>
        <div className="boixes flex gap-2 flex-wrap text-white">
          {coaches?.map((coach, idx) => (
            <div
              key={idx}
              className="m-3 bg-rose-800 flex justify-between flex-col p-2 text-sm cursor-pointer rounded-lg border"
            >
              {coach.full_name}
            </div>
          ))}
        </div>

        <h1>Teams</h1>
        <div className="boixes flex gap-2 flex-wrap text-white">
          {teams?.map((team, idx) => (
            <div
              key={idx}
              className="m-3 bg-rose-800 flex justify-between flex-col p-3 text-sm cursor-pointer rounded-lg border"
            >
              {team.team_name}
            </div>
          ))}
        </div>

        <h1>Players</h1>
        <div className="boixes flex gap-2 mb-12 flex-wrap text-white">
          {players?.map((player, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (!player.is_player_selected) {
                  playerSubmitHandler(player._id, player.count);
                }
              }}
              className={`m-3 bg-cyan-600 flex justify-between flex-col p-3 text-sm  rounded-lg border ${
                player.is_player_selected ? "disabled " : " cursor-pointer"
              }`}
              style={{ opacity: player.is_player_selected ? 0.5 : 1 }}
              disabled={player.is_player_selected}
            >
              {player.full_name}
              <p className="bg-emerald-400 p-1 m-2 w-fit rounded-full px-2.5">
                {idx}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoachLive;
