import React, { useState, useEffect } from "react";
import "./Playlist.css";

const Playlist = () => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("No Song Playing");
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    fetch("/songs.json")
      .then((response) => response.json())
      .then((data) => {
        if (data.songs && Array.isArray(data.songs)) {
          setItems(data.songs);
        } else {
          throw new Error("Invalid JSON structure");
        }
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  // Handle Double-Click to Play
  const handleDoubleClick = (index) => {
    setCurrentIndex(index);
    setStatus(`Playing: ${items[index].title || items[index].episodeTitle}`);
  };

  // Handle Next Button
  const handleNext = () => {
    if (items.length === 0) return;
    const nextIndex = currentIndex === null || currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    setStatus(`Playing: ${items[nextIndex].title || items[nextIndex].episodeTitle}`);
  };

  // Handle Prev Button
  const handlePrev = () => {
    if (items.length === 0) return;
    const prevIndex = currentIndex === null || currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setStatus(`Playing: ${items[prevIndex].title || items[prevIndex].episodeTitle}`);
  };

  // Handle Play/Pause Button
  const handlePlayPause = () => {
    if (status.startsWith("Playing")) {
      setStatus("Paused");
    } else if (currentIndex !== null) {
      setStatus(`Playing: ${items[currentIndex].title || items[currentIndex].episodeTitle}`);
    }
  };

  // Handle Shuffle Button
  const handleShuffle = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setItems(shuffled);
    setCurrentIndex(null);
    setStatus("No Song Playing");
  };

  return (
    <div className="playlist-container">
      {/* Left Section */}
      <div className="left-section">
        <h2 className="playlist-title">Hitendrasinh Playlist</h2>
        <div className="status-box">{status}</div>

        {/* Controls */}
        <div className="controls">
          <button onClick={handlePrev}>⏮</button>
          <button onClick={handlePlayPause}>▶️/⏸</button>
          <button onClick={handleNext}>⏭</button>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <ul className="playlist-list">
          {items.map((item, index) => (
            <li key={index} className="playlist-item" onDoubleClick={() => handleDoubleClick(index)}>
              {item.title || item.episodeTitle}
            </li>
          ))}
        </ul>
        <button className="shuffle-btn" onClick={handleShuffle}>🔀 Shuffle</button>
      </div>
    </div>
  );
};

export default Playlist;
