import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        <h2>{posts[currentPostIndex]?.text}</h2>
        {posts[currentPostIndex]?.photos && (
          <div>
            {posts[currentPostIndex].photos.map((photo, index) => (
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
