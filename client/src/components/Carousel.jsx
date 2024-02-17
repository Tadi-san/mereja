import { useState, useEffect } from 'react';
import axios from 'axios';
import Data from './fake'

const Carousel = () => {
  const [posts, setPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };
// stop trying to make it compateble for the backend the backend and things that are related to it are my problem you just focus on building a sexy ui 
  const handleNext = () => {
    setCurrentPostIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  const handlePrev = () => {
    setCurrentPostIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='flex justify-between w-4/5 mx-auto bg-blue-400'>
      <button onClick={handlePrev}>Previous</button>
      <div>
        {/* another maping needed : tadi */}
      {/* make the photos appear on top */}

        <h2>{Data[0].text}</h2>
        {Data[0]?.photos && (
          <div>
            {Data[0]?.photos.map((photo, index) => (
              <img key={index} src={photo} alt={`Photo ${index}`} />
            ))}
          </div>
        )}
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Carousel;
