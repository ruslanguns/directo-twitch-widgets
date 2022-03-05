import useBrowserDetect from './hooks/useBrowserDetect';

const DetectBrowser = () => {
  const browser = useBrowserDetect();
  return <h1>{browser}</h1>;
};
export default DetectBrowser;
