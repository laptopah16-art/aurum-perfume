import React from 'react';
import './BackgroundVideo.css';

/**
 * BackgroundVideo - A full screen background video component
 * 
 * @param {string} videoSrc - Path to the video file
 * @param {string} className - Additional wrapper class
 * @param {boolean} showOverlay - Whether to show gradient overlay for text readability
 * 
 * Features:
 * - Autoplay, muted, loop, playsInline for seamless playback
 * - Full screen coverage with object-fit: cover
 * - Fixed behind content (z-index: -1)
 * - Optional gradient overlay for text readability
 * - Responsive for all screen sizes
 */
export default function BackgroundVideo({ 
  videoSrc,
  className = '',
  showOverlay = true
}) {
  if (!videoSrc) return null;
  
  return (
    <>
      <div className={`background-video-wrapper ${className}`}>
        <video
          src={videoSrc}
          className="background-video"
          autoPlay
          loop
          muted
          playsInline
          poster=""
        >
          Your browser does not support the video tag.
        </video>
      </div>
      {showOverlay && <div className="background-video-overlay" />}
    </>
  );
}

