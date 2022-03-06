import { useEffect, useState } from 'react';
import useSocketServer from './hooks/useSocketServer';
import './styles/Hydrate.css';

const Hydrate = () => {
  const [user, setUser] = useState(null);
  const socket = useSocketServer();
  const [notification] = useState(new Audio('/assets/audio/hydrate_sound.mp3'));

  useEffect(() => {
    const speech = new SpeechSynthesisUtterance();
    speech.lang = 'es-ES';
    speech.rate = 1;
    speech.volume = 1;
    speech.pitch = 1;
    speech.voice = speechSynthesis.getVoices()[0];

    socket.on('hydrate', (_user) => {
      speech.text = `${_user} quiere que te hidrates!`;

      setUser(_user);

      speechSynthesis.speak(speech);
      notification.play();

      setTimeout(() => {
        notification.pause();
        setUser(null);
      }, 15000);
    });

    return () => {
      socket.off('hydrate');
    };
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="hydrate">
      <img src="/assets/images/hydrate.png" />
      <h1>{user} quiere que te hidrates! </h1>
    </div>
  );
};
export default Hydrate;
