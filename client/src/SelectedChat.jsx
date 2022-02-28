import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { SERVER_URL } from './contants';
import { getMessageHTML } from './helpers/getMessageHTML';
import './styles/SelectedChat.css';

const SelectedChat = () => {
  const [chat, setChat] = useState(null);

  useEffect(() => {
    fetch(`${SERVER_URL}api/chat/selected`)
      .then((res) => res.json())
      .then((chat) => {
        setChat(chat);
      });
  }, []);

  useEffect(() => {
    const socket = io(SERVER_URL);

    socket.on('selected-chat', (chat) => {
      setChat(chat);
    });

    return () => {
      socket.off('selected-chat');
    };
  }, []);

  if (!chat) return null;

  return (
    // <pre>{JSON.stringify(chat, null, 4)}</pre>
    <div className="selected">
      <img className="selected__avatar" src={chat.userInfo.profile_image_url} />
      <div className="selected__username">{chat.userInfo['display_name']}</div>
      <div
        className="selected__message"
        dangerouslySetInnerHTML={{
          __html: getMessageHTML(chat.message, { emotes: chat.tags.emotes }),
        }}
      />
    </div>
  );
};
export default SelectedChat;
