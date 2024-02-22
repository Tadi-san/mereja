import { useState, useEffect, useRef } from 'react';
import axios from "axios";

function App() {
  const Fields = ["Events", "Sport", "Code"]
  const [data, setData] = useState()
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  async function handleClick(ev, field) {
    ev.preventDefault();
    try {
      const response = await axios.post('/data', { field });
      setData(response.data);
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }

  useEffect(() => {
    const container = containerRef.current;

    const handleMouseDown = (event) => {
      setIsDragging(true);
      setStartX(event.pageX);
      setScrollOffset(container.scrollLeft);
    };

    const handleMouseMove = (event) => {
      if (!isDragging) return;
      const x = event.pageX - startX;
      container.scrollLeft = scrollOffset - x;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, scrollOffset, startX]);
  
  return (
    <div className={ !data?"w-full sm:w-fit":'flex flex-col items-center bg-[#180D30] w-fit sm:w-full'}>
    <div className="flex items-center justify-center h-fit fixed bg-[#160c2c] w-full p-1">
      <div
        className="flex gap-2 rounded-2xl mt-3 sm:mt-6 sm:w-3/6 bg-[#20113f] justify-center"
        ref={containerRef}
        style={{
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
        }}
      >
        {Fields.map((field) => (
          <button
            key={field}
            className="px-1 py-1 min-w-28 md:min-w-32 lg:min-w-48 bg-[#532ca2]  text-white rounded-md"
            onClick={(ev) => handleClick(ev,field)}
          >
            {field}
          </button>
        ))}
      </div>
    
    </div>
    {!data ?
     <div className={'bg-[#20113f] h-screen w-screen text-3xl flex justify-center items-center'}>
      <span className=' text-white font-semibold '>{"Pick a Category"} </span>
      </div>
      :
    <div className='flex items-center overflow-y-auto w-fit h-fit'>
    <div className="overflow-y-auto p-4 md:p-9 mt-5 mx-auto md:w-3/4 lg:w-2/3 xl:w-1/2">
      <div className="p-1 sm:p-4 md:p-9 bg-[#20113f] rounded-lg mt-5 h-fit"  >
        {data.map((post, index) => (
          <div key={index} >
            <div className='rounded-lg mb-3 sm:px-3 sm:mx-3 '>
              <div className="card py-3 px-2 rounded-lg bg-[#2f195fb9] flex flex-col items-center">
                {post.photos && (
                  <div className={post.photos.length < 2 ?"photo-container w-[400px]":"grid grid-cols-2"} >
                    {post.imgLink.map((photo, photoIndex) => (
                      photo && <img className='rounded-lg' key={photoIndex} src={photo} alt={`Photo ${photoIndex}`} />
                    ))}
                  </div>
                )}
                <div className="flex">
                  <h2 className='rounded-lg py-3 px-3 text-white text-md md:text-lg mt-5'>{post.text}
                  <span className=' font-semibold font-mono text-blue-400'>
                    <br></br>{post.channel}</span>
                  </h2>
                  
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
}
    </div>
  );
}

export default App;