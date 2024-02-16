import  { useRef, useState } from 'react';

const Homepage = () => {
  const containerRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handleClick = (index) => {
    switch (index) {
      case 0:
        // Action for button 1
        console.log("Button 1 clicked, performing action 1");
        break;
      case 1:
        // Action for button 2
        console.log("Button 2 clicked, performing action 2");
        break;
      case 2:
        // Action for button 3
        console.log("Button 3 clicked, performing action 3");
        break;
      case 3:
        // Action for button 4
        console.log("Button 4 clicked, performing action 4");
        break;
      default:
        // Default action
        console.log(`Button ${index + 1} clicked, performing default action`);
        break;
    }
  };

  return (
    <div className="flex items-center overflow-x-auto w-3/6 mt-6 mx-auto">
      <div
        className="flex space-x-4 p-9"
        ref={containerRef}
        onScroll={handleScroll}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <button
            key={index}
            className="px-2 py-2 w-6 md:w-32 lg:w-48 bg-blue-500 text-white rounded-md"
            onClick={() => handleClick(index)}
          >
             {index + 1}
          </button>
        ))}
      </div>
      <div
        className={`absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent to-white z-10 ${
          scrollLeft > 0 ? 'visible' : 'invisible'
        }`}
      />
      <div
        className={`absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-transparent to-white z-10 ${
          scrollLeft < containerRef.current?.scrollWidth - containerRef.current?.clientWidth ? 'visible' : 'invisible'
        }`}
      />
    </div>
  );
};

export default Homepage;