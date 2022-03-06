import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSwr from 'swr';
import ChatItem from './components/ChatItem';
import Settings from './Settings';
import { fetcher } from './helpers/fetcher';
import useScrolllToBottom from './hooks/useScrolllToBottom';
import useSocketServer from './hooks/useSocketServer';
import { SERVER_URL } from './contants';

const Chats = () => {
  const socket = useSocketServer();
  const { data = [], error } = useSwr(
    `${SERVER_URL}/api/chat?skip=0&take=25`,
    fetcher,
    {
      refreshInterval: 1000,
    },
  );

  const [selectedChat, setSelectedChat] = useState(null);
  const [openSettings, setOpenSettings] = useState(false);

  const chatRef = useScrolllToBottom(data);

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

  return (
    <main className="container">
      <div className="grid">
        <aside>
          <ul>
            <li>
              <strong>Pantalla princpal</strong>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/widgets/selected-chat">SelectedChat</Link>
            </li>
            <li>
              <Link to="/widgets/confetti">Confetti</Link>
            </li>
            <li>
              <Link to="/widgets/hydrate">Hydrate</Link>
            </li>
            <li>
              <Link to="/widgets/new-question">New Question</Link>
            </li>
            <li>
              <Link to="/widgets/selected-background">Selected background</Link>
            </li>
            <li>
              <Link to="/widgets/detect-browser">Detect browser</Link>
            </li>
            <a
              href="#"
              role="button"
              className="contrast outline"
              onClick={() => setOpenSettings(!openSettings)}
            >
              Open settings
            </a>
          </ul>
        </aside>

        <Settings open={openSettings} setOpenSettings={setOpenSettings} />

        <figure className="chats-container" ref={chatRef}>
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
        </figure>
      </div>
    </main>
  );
};
export default Chats;
