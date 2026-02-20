import { useState } from 'react';

function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return [isFullscreen, toggleFullscreen];
}

export default useFullscreen;
