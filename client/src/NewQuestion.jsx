import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { SERVER_URL } from './contants';
import { getMessageHTML } from './helpers/getMessageHTML';
import './styles/NewQuestion.css';

const NewQuestion = () => {
  const [chat, setChat] = useState(null);
  const [notification] = useState(
    new Audio('/assets/audio/notification_alert1.mp3'),
  );

  useEffect(() => {
    fetch(`${SERVER_URL}/api/chat/selected`)
      .then((res) => {
        if (res) {
          return res.json();
        }
      })
      .then((chat) => {
        setChat(chat);
      });
  }, []);

  useEffect(() => {
    if (chat) {
      setTimeout(() => {
        notification.play();
      }, 300);
    }
  }, [chat]);

  useEffect(() => {
    const socket = io(SERVER_URL);

    socket.on('new-question', (chat) => {
      setChat(chat);
      if (chat) {
        setTimeout(() => {
          console.log('Se esta quitando');
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
