import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { SERVER_URL } from '../contants';

const useSocketServer = () => {
  const [socket] = useState(io(SERVER_URL));

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocketServer;
