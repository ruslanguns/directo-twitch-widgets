import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSwr from 'swr';
import io from 'socket.io-client';
import { fetcher } from './helpers/fetcher';
import ChatItem from './components/ChatItem';
import useScrolllToBottom from './hooks/useScrolllToBottom';
import { SERVER_URL } from './contants';

const Chats = () => {
  const { data = [], error } = useSwr(
    `http://localhost:3000/api/chat?skip=0&take=25`,
    fetcher,
    {
      refreshInterval: 1000,
    },
  );

  const [selectedChat, setSelectedChat] = useState(null);
  const chatRef = useScrolllToBottom(data);
  const [socket] = useState(io(SERVER_URL));

  if (error) return <div>failed to load chats</div>;

  const handleChatClick = (chat) => {
    if (chat && chat.id !== selectedChat?.id) {
      socket.emit('selected-chat', chat);
      setSelectedChat(chat);
    } else {
      socket.emit('selected-chat', null);
      setSelectedChat(null);
    }
  };

  const handleSelectedBackground = (e) => {
    socket.emit('selected-background', e.target.value);
  };

  const handleConfetti = () => {
    socket.emit('confetti');
  };

  return (
    <div className="chat-wrapper" ref={chatRef}>
      <h1>Los Chats</h1>
      <ul>
        <li>
          <Link to="/widgets/selected-chat">SelectedChat</Link>
        </li>
        <li>
          <Link to="/widgets/confetti">Confetti</Link>
        </li>
        <li>
          <Link to="/widgets/new-question">New Question</Link>
        </li>
        <li>
          <Link to="/widgets/selected-background">Selected background</Link>
        </li>
      </ul>

      <div onChange={handleSelectedBackground}>
        <h4>Background seleccionado</h4>
        <input type="radio" value="none" name="selectedBackground" /> Ninguno
        <br />
        <input type="radio" value="stars" name="selectedBackground" /> Stars
        parallax
      </div>

      <div>
        <button onClick={handleConfetti}>Lanzar confetti!</button>
      </div>

      <div>
        {data.map((chat) => (
          <ChatItem
            onClick={() => handleChatClick(chat)}
            key={chat.id}
            avatarUrl={chat.userInfo.profile_image_url}
            username={chat.userInfo['display_name']}
            message={chat.message}
            emotes={chat.tags.emotes}
            isSelected={chat.id === selectedChat?.id}
          />
        ))}
      </div>
    </div>
  );
};
export default Chats;
