import '../styles/ChatItem.css';

const ChatItem = ({ avatarUrl, username, message }) => {
  return (
    <div className="chat">
      <img className="chat__avatar" src={avatarUrl} />
      <div className="chat__username">{username}</div>
      <div className="chat__message">{message}</div>
    </div>
  );
};
export default ChatItem;
