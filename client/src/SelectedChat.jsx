import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SelectedChat = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('selected-chat', (chat) => {
      setSelectedChat(chat);
    });

    return () => {
      socket.off('selected-chat');
    };
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/chat/selected`)
      .then((res) => res.json())
      .then((chat) => {
        setSelectedChat(chat);
      });
  }, []);

  if (!selectedChat) return null;

  return <pre>{JSON.stringify(selectedChat, null, 2)}</pre>;
};
export default SelectedChat;
