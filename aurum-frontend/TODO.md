# TODO - Background Video Enhancement

## Task
Implement random video rotation for background videos across the website using all available video files in src/assets folder.

## Requirements
1. Use all 19 video files from src/assets folder
2. Implement random video selection per route
3. Ensure the same video does NOT repeat consecutively
4. Keep full screen video styling (position: fixed, 100vw, 100vh, object-fit: cover, z-index: -1)
5. No overlay/tint on video
6. Keep body/layout backgrounds transparent
7. Ensure page content stays above video with proper z-index

## Progress
- [x] Analyze codebase and understand current implementation
- [x] Plan implementation
- [x] Get user confirmation
- [x] Implement random video rotation in Layout.jsx
- [x] Verify solution works - BUILD SUCCESSFUL

## Implementation Details
1. Used Vite's `import.meta.glob('../../assets/*.mp4', { eager: true })` to dynamically import all 19 video files
2. Created `allVideos` array containing all video paths
3. Implemented `getRandomVideo()` function that ensures the new video is different from the current one
4. Added state `currentVideo` initialized with a random video
5. Added useEffect to change video when route changes (location.pathname)
6. The BackgroundVideo component receives the dynamically selected video

## Videos Included
All 19 videos from src/assets folder:
- home 1.mp4
- 13422840-uhd_3840_2160_30fps.mp4
- 7815968-hd_1920_1080_25fps.mp4
- 7815761-hd_1920_1080_25fps.mp4
- v12.mp4
- 13511496_3840_2160_25fps.mp4
- 7815949-hd_1920_1080_25fps.mp4
- 7815759-hd_1920_1080_25fps.mp4
- 8447599-uhd_4096_2160_25fps.mp4
- 7815972-hd_1920_1080_25fps.mp4
- 4884243-uhd_3840_2160_30fps.mp4
- 5084552-uhd_4096_2160_24fps.mp4
- vr.mp4
- v11.mp4
- 9582013-uhd_3840_2160_30fps.mp4
- 8447604-uhd_4096_2160_25fps.mp4
- 10536903-uhd_4096_2160_25fps.mp4
- 8447652-uhd_4096_2160_25fps.mp4
- 6392268-uhd_2732_1440_24fps.mp4

