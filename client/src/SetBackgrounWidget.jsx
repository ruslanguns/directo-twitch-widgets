import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import StarsParallaxBackground from './components/StarsParallaxBackground';
import { SERVER_URL } from './contants';

const SetBackgrounWidget = () => {
  const [background, setBackground] = useState('stars');

  // useEffect(() => {
  //   fetch(`${SERVER_URL}/api/background/selected`)
  //     .then((res) => res.json())
  //     .then(({ name }) => {
  //       setBackground(name);
  //     });
  // }, []);

  useEffect(() => {
    const socket = io(SERVER_URL);

    socket.on('selected-background', (background) => {
      console.log('Background', background);
      setBackground(background);
    });

    return () => {
      socket.off('selected-background');
    };
  }, []);

  switch (background) {
    case 'stars':
      return <StarsParallaxBackground />;

    case 'none':
      return null;

    default:
      return <StarsParallaxBackground />;
  }
};
export default SetBackgrounWidget;
