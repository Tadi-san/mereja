import { useState, useRef, useEffect } from 'react';
import Data from './fake'; // Importing the provided data directly

const Carousel = () => {
  const [firstVisibleIndex, setFirstVisibleIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const itemHeight = container.firstChild.clientHeight;
      const newFirstVisibleIndex = Math.floor(scrollTop / itemHeight);
      setFirstVisibleIndex(newFirstVisibleIndex);
    };

    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='flex items-center overflow-y-auto mx-auto h-screen'>
    <div className="overflow-y-auto p-4 md:p-9 mt-5 mx-auto md:w-3/4 lg:w-2/3 xl:w-1/2">
      <div className="overflow-y-auto p-4 md:p-9 ring-2 ring-[#3b82f6] rounded-lg mt-5" style={{ maxHeight: 'calc(100vh - 120px)' }} ref={containerRef}>
        <div style={{ paddingTop: firstVisibleIndex * 100 + '%' }}></div>
        {Data.map((post, index) => (
          <div key={index} className={`pb-4 ${index === firstVisibleIndex ? 'border-b-2 border-blue-800' : ''}`}>
            <div className='ring- rounded-lg mb-3 px-3 mx-3 '>
              <div className="card px-3 mx-3">
                {post.photos && (
                  <div className="photo-container">
                    {post.photos.map((photo, photoIndex) => (
                      <img key={photoIndex} src={photo} alt={`Photo ${photoIndex}`} />
                    ))}
                  </div>
                )}
                <div className="px-3 mx-3">
                  <h2 className='ring-2 ring-[#3b82f6] rounded-lg py-3 px-7 text-xl md:text-3xl mt-5'>{post.text}</h2>
                  <h1 className='bg-[#3b82f6] uppercase border-collapse rounded-lg py-2 px-4 text-white text-xl md:text-3xl mt-5 inline-flex items-center'>{post.channelName}</h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  
  );
};

export default Carousel;
