import {useEffect, useContext, useState, useCallback} from "react";
import {SocketContext} from "../../context/SocketContext";
import {ChatContext} from "../../context/ChatContext";
import {useLocation} from "react-router-dom";
import VideoRoomHeader from "../VideoRoomHeader/VideoRoomHeader";
import VideoContainer from "../VideosContainer/VideosContainer";
import ChatContainer from "../ChatContainer/ChatContainer";
import useStateToLocalStorage from "../../hooks/useStateToLocalStorage";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

import styles from "./RoomContainer.module.css";

const RoomContainer = () => {
  const {
    isHost,
    setParams,
    setDisplayName,
    roomName: hostRoomName,
    setRoomName: setHostRoomName,
    videoStreams,
    isTalking,
    gainStreams,
    hasPeerError,
    hasSocketError,
    sendPosition,
    positions
  } = useContext(SocketContext);
  const {isChatOpen, chatDimensions} = useContext(ChatContext);
  const location = useLocation();
  const [userName] = useStateToLocalStorage("userName");
  const [roomName, setRoomName] = useStateToLocalStorage("roomName");

  const searchParams = location.pathname.split("/");
  const roomID = searchParams[searchParams.length - 1];

  const getLocation =  useCallback(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        sendPosition(userName, position.coords)
      }, () => {
        console.log('Unable to retrieve your location');
      });
    }
  }, [userName])

  useEffect(() => {
    const id = setInterval(() => getLocation(), 5000)

    return () => clearInterval(id)
  }, [getLocation])

  useEffect(() => {
    setDisplayName(userName);
    setHostRoomName(roomName);
  }, [userName, setDisplayName, roomName, setHostRoomName]);

  useEffect(() => {
    setParams(roomID);

    return () => {
      setParams("");
    };
  }, [setParams, roomID, location]);

  function LocationMarker({name, position}) {
    const map = useMapEvents({
      click() {
        map.locate()
      },
    })
    map.flyTo(position, map.getZoom())

    return position === null ? null : (
        <Marker position={position}>
          <Popup>{name}</Popup>
        </Marker>
    )
  }

  return(
    <div
      className={styles.container}
      style={{paddingRight: isChatOpen ? chatDimensions.width : 0}}
    >
      <VideoRoomHeader room={hostRoomName ? hostRoomName : roomName} setRoomName={setRoomName} isHost={isHost} />
      <VideoContainer
        videos={videoStreams}
        isTalking={isTalking}
        gainStreams={gainStreams}
        hasPeerError={hasPeerError}
        hasSocketError={hasSocketError}
      />
      <MapContainer style={{width: 400, height: 400 }} center={[48.856614, 2.3522219]} zoom={7}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {positions && Object.keys(positions).length && Object.entries(positions).map(([key, value]) => (
            <LocationMarker key={key} name={key} position={[value.latitude, value.longitude]}/>
        ))}

      </MapContainer>
      <ChatContainer />
    </div>
  );
};

export default RoomContainer;
