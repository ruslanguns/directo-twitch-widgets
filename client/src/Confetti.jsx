import { useEffect, useRef, useState } from 'react';
import Confetti from 'react-dom-confetti';
import io from 'socket.io-client';
import { SERVER_URL } from './contants';
import './styles/Confetti.css';

const ConfettiWidget = () => {
  const [active, setActive] = useState(false);
  const confettiSound = useRef(new Audio('/assets/audio/confetti_sound2.mp3'));

  const handleConfetti = () => {
    const timer$ = setInterval(() => {
      setActive(true);

      confettiSound.current.play();

      setTimeout(() => {
        setActive(false);
      }, 1000);
    }, 1100);

    setTimeout(() => {
      clearInterval(timer$);
    }, 3500);
  };

  useEffect(() => {
    const socket = io(SERVER_URL);
    socket.on('confetti', handleConfetti);

    return () => {
      socket.off('confetti');
    };
  }, []);

  return (
    <div className="confetti">
      <Confetti
        active={active}
        config={{
          angle: 90,
          spread: 360,
          startVelocity: 40,
          elementCount: 70,
          dragFriction: 0.12,
          duration: 3000,
          stagger: 3,
          width: '10px',
          height: '10px',
          perspective: '500px',
          colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
        }}
      />
    </div>
  );
};
export default ConfettiWidget;
