import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSwr from 'swr';
import io from 'socket.io-client';
import { fetcher } from './helpers/fetcher';
import ChatItem from './components/ChatItem';
import useScrolllToBottom from './hooks/useScrolllToBottom';

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

  if (error) return <div>failed to load chats</div>;

  const handleChatClick = (chat) => {
    const socket = io('http://localhost:3000');
    if (chat && chat.id !== selectedChat?.id) {
      socket.emit('selected-chat', chat);
      setSelectedChat(chat);
    } else {
      socket.emit('selected-chat', null);
      setSelectedChat(null);
    }
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
          <Link to="/widgets/stars">Stars</Link>
        </li>
      </ul>

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
