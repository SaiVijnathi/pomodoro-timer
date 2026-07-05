import { ImageBackground, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, PropsWithChildren } from 'react';
import { VideoView, useVideoPlayer } from 'expo-video';

import { BACKGROUND_MEDIA, BACKGROUND_OVERLAY_OPACITY } from '../constants/background';

type BackgroundProps = PropsWithChildren<{
  isRunning?: boolean;
}>;

function BackgroundLayer({ isRunning = false }: { isRunning?: boolean }) {
  const isVideo = BACKGROUND_MEDIA.type === 'video';
  const player = useVideoPlayer(isVideo ? BACKGROUND_MEDIA.video : null);

  useEffect(() => {
    if (!isVideo || !player) return;

    const syncVideo = async () => {
      try {
        player.loop = true;
        player.muted = false;

        if (isRunning) {
          await player.play();
        } else {
          player.pause();
        }
      } catch (e) {
        console.log('video play blocked:', e);
      }
    };

    syncVideo();
  }, [player, isVideo, isRunning]);
  
    if (!isVideo) {
      return (
        <ImageBackground
          source={BACKGROUND_MEDIA.image}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
      );
    }
  
    return (
      <VideoView
        player={player}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
        }}
        contentFit="cover"
        nativeControls={false}
      />
    );
}

export function Background({ children, isRunning }: BackgroundProps) {
  return (
    <View style={styles.root}>
      <BackgroundLayer isRunning={isRunning} />
      <View style={styles.overlay} pointerEvents="none" />
      <SafeAreaView style={styles.content}>{children}</SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1, 
    width: '100%',
    height: '100%' 
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: `rgba(0, 0, 0, ${BACKGROUND_OVERLAY_OPACITY})`,
  },
  content: {
    flex: 1,
  },
});
