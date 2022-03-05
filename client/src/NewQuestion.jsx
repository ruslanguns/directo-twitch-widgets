import { useEffect, useState } from 'react';
import { getMessageHTML } from './helpers/getMessageHTML';
import useSocketServer from './hooks/useSocketServer';
import './styles/NewQuestion.css';

const NewQuestion = () => {
  const [chat, setChat] = useState(null);
  const [notification] = useState(
    new Audio('/assets/audio/notification_alert1.mp3'),
  );

  const socket = useSocketServer();

  useEffect(() => {
    socket.on('new-question', (chat) => {
      setChat(chat);
      if (chat) {
        notification.play();
        setTimeout(() => {
          socket.emit('new-question', null);
        }, 15000);
      }
    });

    return () => {
      notification.pause();
      socket.off('new-question');
    };
  }, []);

  return (
    <>
      {chat && (
        <div className="new-question">
          <img
            className="new-question__avatar"
            src={chat.userInfo.profile_image_url}
          />
          <div className="new-question__username">
            {chat.userInfo['display_name']}
          </div>
          <div
            className="new-question__message"
            dangerouslySetInnerHTML={{
              __html: getMessageHTML(chat.message, {
                emotes: chat.tags.emotes,
              }),
            }}
          />
          <span className="water-mark">New Question</span>
        </div>
      )}
    </>
  );
};
export default NewQuestion;
