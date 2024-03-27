import { useState, useEffect, useRef } from "react";
import axios from "axios";
function App() {
  const Fields = ["Events", "Sport", "Code"];
  const [data, setData] = useState();
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    console.log(darkMode)
    setDarkMode(!darkMode);
    console.log(darkMode)
  };
  async function handleClick(ev, field) {
    ev.preventDefault();
    try {
      const response = await axios.post("/data", { field });
      setData(response.data);
    } catch (error) {
      console.error("Error retrieving data:", error);
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

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, scrollOffset, startX]);

  
  return (
    <div className={`${darkMode && "dark"}` +" overflow-x-clip"}>
    <div
      className={
        !data
          ? "w-full sm:w-fit"
          : "flex flex-col items-center bg-[#f5f5f5] dark:bg-[#171717] w-fit sm:w-full"
      }
    >
      <div className="flex items-center justify-evenly h-fit fixed bg-[#f5f5f5] dark:bg-[#171717]  w-full ">
      <button className="font-bold text-xl dark:text-white" onClick={() => window.location.reload()}>
  MEREJa
</button>

        <div
          className="flex gap-2 rounded-2xl mb-4 mt-3 sm:mt-6 sm:w-3/6 bg-[#f5f5f5] dark:bg-[#171717] justify-center"
          ref={containerRef}
          style={{
            overflowX: "hidden",
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
          }}
        >
          {Fields.map((field) => (
            <button
              key={field}
              className="px-1 py-1 min-w-24 md:min-w-32 lg:min-w-45 bg-[#3b82f6] font-bold dark:text-[#3b82f6] dark:bg-white text-white rounded-md"
              onClick={(ev) => handleClick(ev, field)}
            >
              {field}
            </button>
          ))}
        </div>
      </div>
      <br />
      {!data ? (
        <div
          className={
            "bg-[#f5f5f5] dark:bg-[#171717] h-screen w-screen text-3xl flex justify-center items-center"
          }
        >
          <span className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight mx-auto w-3/6 text-center dark:text-[#3b82f6]">{"Easily consume fine-tuned Telegram News  with just a click of a button"} </span>
        </div>
      ) : (
        <div className="flex items-center overflow-y-auto w-fit h-fit">
          <div className="overflow-y-auto p-4 md:p-9 mt-5 mx-auto md:w-3/4 lg:w-2/3 xl:w-1/2">
            <div className="p-1 sm:p-4 md:p-9 rounded-lg mt-5 h-fit">
              {data.map((post, index) => (
                <div key={index}>
                  <div className="rounded-lg mb-3 sm:px-3 sm:mx-3 ring-2 ring-[#3b82f6]">
                    <div className="card py-3 px-2 rounded-lg bg-[#] flex flex-col items-center">
                      {post.photos && (
                        <div
                          className={
                            post.photos.length < 2
                              ? "photo-container w-[400px]"
                              : "grid grid-cols-2"
                          }
                        >
                          {post.imgLink.map(
                            (photo, photoIndex) =>
                              photo && (
                                <img
                                  className="rounded-lg"
                                  key={photoIndex}
                                  src={photo}
                                  alt={`Photo ${photoIndex}`}
                                />
                              )
                          )}
                        </div>
                      )}
                      <hr />
                      <div className="flex">
                        <h2 className="rounded-lg py-3 px-3 dark:text-white text-md md:text-lg mt-5">
                          {post.text}
                          <span className=" font-semibold font-mono text-blue-400">
                            <br></br><br />
                            <button className="bg-blue-500 hover:bg-blue-700 dark:bg-white dark:text-blue-600 text-white font-bold py-2 px-4 rounded">
                            {post.channel}
                            </button>
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;