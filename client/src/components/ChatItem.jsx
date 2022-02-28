import { getMessageHTML } from '../helpers/getMessageHTML';
import '../styles/ChatItem.css';

const ChatItem = ({
  avatarUrl,
  username,
  message,
  emotes,
  isSelected,
  onClick,
}) => {
  return (
    <div className={`chat ${isSelected && 'chat-selected'}`} onClick={onClick}>
      <img className="chat__avatar" src={avatarUrl} />
      <div className="chat__username">{username}</div>
      <div
        className="chat__message"
        dangerouslySetInnerHTML={{
          __html: getMessageHTML(message, { emotes }),
        }}
      />
    </div>
  );
};
export default ChatItem;
