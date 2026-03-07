import React from 'react';

/**
 * AdminBackgroundVideo - A full screen background video component for the admin panel
 * 
 * Features:
 * - Autoplay, muted, loop, playsInline for seamless playback
 * - Full screen coverage with object-fit: cover
 * - Fixed behind all content (z-index: -1)
 * - Gradient overlay for text readability
 * - Responsive for all screen sizes
 */
const AdminBackgroundVideo = () => {
  return (
    <>
      <div className="admin-video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="admin-video"
          poster=""
        >
          <source src="/videos/admin-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="admin-video-overlay" />
    </>
  );
};

export default AdminBackgroundVideo;

