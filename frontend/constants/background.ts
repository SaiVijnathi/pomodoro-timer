export type BackgroundMediaType = 'image' | 'video';

export const BACKGROUND_OVERLAY_OPACITY = 0.35;

export const BACKGROUND_MEDIA = {
  type: 'video' as BackgroundMediaType,
  image: require('../assets/background.png'),
  video: require('../assets/study-room.mp4'),
} as const;
