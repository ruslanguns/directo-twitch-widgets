import { Link } from 'react-router-dom';
import useSwr from 'swr';
import io from 'socket.io-client';
import { fetcher } from './helpers/fetcher';
import ChatItem from './components/ChatItem';

const Chats = () => {
  const { data = [], error } = useSwr(
    `http://localhost:3000/api/chat?skip=0&take=25`,
    fetcher,
  );

  if (error) return <div>failed to load chats</div>;

  const handleChatClick = (chat) => {
    const socket = io('http://localhost:3000');
    socket.emit('selected-chat', chat);
  };

  return (
    <div className="chat-wrapper">
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
          // <li key={chat.id} onClick={() => handleChatClick(chat)}>
          //   {chat.tags.username}: &nbsp; {chat.message}
          // </li>
          <ChatItem
            key={chat.id}
            avatarUrl={chat.userInfo.profile_image_url}
            username={chat.userInfo['display_name']}
            message={chat.message}
          />
        ))}
      </div>
    </div>
  );
};
export default Chats;
