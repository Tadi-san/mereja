// import { useState, useRef, useEffect } from 'react';
import Data from './fake'; // Importing the provided data directly

const Carousel = () => {
//   const [firstVisibleIndex, setFirstVisibleIndex] = useState(0);
//   const containerRef = useRef(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const container = containerRef.current;
  //     const scrollTop = container.scrollTop;
  //     const itemHeight = container.firstChild.clientHeight;
  //     const newFirstVisibleIndex = Math.floor(scrollTop / itemHeight);
  //     setFirstVisibleIndex(newFirstVisibleIndex);
  //   };

  //   const container = containerRef.current;
  //   container.addEventListener('scroll', handleScroll);
  //   return () => {
  //     container.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <div className='flex items-center overflow-y-auto h-fit'>
    <div className="overflow-y-auto p-4 md:p-9 mt-5 mx-auto md:w-3/4 lg:w-2/3 xl:w-1/2">
      <div className="p-1 sm:p-4 md:p-9 bg-[#20113f] rounded-lg mt-5 h-fit"  >
        {Data.map((post, index) => (
          <div key={index} >
            <div className='rounded-lg mb-3 sm:px-3 sm:mx-3 '>
              <div className="card py-3 px-2 rounded-lg bg-[#2f195fb9]">
                {post.photos && (
                  <div className={post.photos.length < 2 ?"photo-container":"grid grid-cols-2"} >
                    {post.photos.map((photo, photoIndex) => (
                      <img className='rounded-lg' key={photoIndex} src={photo} alt={`Photo ${photoIndex}`} />
                    ))}
                  </div>
                )}
                <div className="flex">
                  <h2 className='rounded-lg py-3 px-3 text-white text-md md:text-lg mt-5'>{post.text}
                  <span className=' font-semibold font-mono text-blue-600'>
                    <br></br>{post.channelName}</span>
                  </h2>
                  
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
