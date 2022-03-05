import useSocketServer from './hooks/useSocketServer';

const Settings = ({ open, setOpenSettings }) => {
  const socket = useSocketServer();

  const handleSelectedBackground = (e) => {
    socket.emit('selected-background', e.target.value);
  };

  const handleConfetti = () => {
    socket.emit('confetti');
  };

  const handleSettingsModal = () => {
    setOpenSettings(!open);
  };

  return (
    <dialog data-theme="dark" open={open}>
      <article>
        <header>
          <a
            href="#close"
            aria-label="Close"
            className="close"
            onClick={handleSettingsModal}
          ></a>
          <h1>Settings</h1>
        </header>
        <div className="col" onChange={handleSelectedBackground}>
          Seleccionar background:
          <label>
            <input type="radio" value="none" name="selectedBackground" />{' '}
            Ninguno
          </label>
          <label>
            <input type="radio" value="stars" name="selectedBackground" /> Stars
            parallax
          </label>
        </div>
        <hr />
        <label className="play-input">
          Lanzar confetti: &nbsp;
          <a href="#" aria-pressed={false} onClick={handleConfetti}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </label>
      </article>
    </dialog>
  );
};
export default Settings;
