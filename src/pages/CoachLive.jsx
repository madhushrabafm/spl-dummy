import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SocketIOClient from "socket.io-client";

const CoachLive = () => {
  const [socket, setSocket] = useState(null);
  const socket_url = import.meta.env.VITE_REACT_APP_SOCKET_URL;
  const { id } = useParams();
  const [coachLiveData, setcoachLiveData] = useState();

  //   console.log(params);

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
    console.log(">>>>--------join_draft_room------>>>>>", socket.id);

    socket.on("draft_data", (data) => {
      console.log("COACH draft_data -----", data);
      setcoachLiveData(data);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from server with ID: " + socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket_url]);

  console.log(coachLiveData);

  const players = coachLiveData?.players;
  const coaches = coachLiveData?.coaches;
  const teams = coachLiveData?.teams;

  const playerSubmitHandler = (ids, count, relation_player_id) => {
    // setActiveClass(ids);

    socket.emit("select_player", {
      draftId: id,
      coachId: JSON.parse(localStorage.getItem("sportsLeague"))?.id,
      playerId: ids,
      playerCount: count,
      isAutomated: false,
    });

    console.log(
      ">>>>--------playerSubmitHandler select_player------>>>>>",
      socket.id
    );
    socket.emit("end_counter", { draftId: id });
    console.log(">>>>--------end_counter------>>>>>", socket.id);
  };

  return (
    <div>
      <div className="playerlsts p-4">
        {/* -----------------------------------------------  */}
        <h1>coaches</h1>
        <div className="boixes flex gap-2 flex-wrap text-white">
          {coaches?.map((e, idx) => {
            return (
              <div
                key={idx}
                className="m-3 bg-rose-800 flex justify-between flex-col p-1 text-sm cursor-pointer rounded-lg border"
              >
                {e.full_name}
              </div>
            );
          })}
        </div>
        {/* -----------------------------------------------  */}
        <h1>teams</h1>
        <div className="boixes flex gap-2 flex-wrap text-white">
          {teams?.map((e, idx) => {
            return (
              <div
                key={idx}
                className="m-3 bg-rose-800 flex justify-between flex-col p-1 text-sm cursor-pointer rounded-lg border"
              >
                {e.team_name}
              </div>
            );
          })}
        </div>

        {/* --------------------  */}
        <h1>players</h1>
        <div className="boixes flex gap-2 mb-12 flex-wrap text-white">
          {players?.map((e, idx) => {
            return (
              <div
                key={idx}
                onClick={
                  // () => console.log("emitt")
                  playerSubmitHandler(e._id, e.count, e?.relation_player_id)
                }
                className="m-3 bg-cyan-600 flex justify-between flex-col p-3 text-sm cursor-pointer rounded-lg border"
              >
                {e.full_name}
                <p className="bg-emerald-400 p-1 m-2 w-fit  rounded-full px-2.5">
                  {idx}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CoachLive;
