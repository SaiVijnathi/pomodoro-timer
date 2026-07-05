import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useAnimatedProps } from 'react-native-reanimated';

const SIZE = 200;
const STROKE_WIDTH = 10;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type ProgressValue = { value: number } | number | undefined;

export default function ProgressRing({ progress }: { progress?: ProgressValue }) {
  const resolvedProgress = React.useMemo(() => {
    if (typeof progress === 'number') {
      return { value: progress };
    }

    if (progress && typeof progress === 'object' && 'value' in progress) {
      return progress;
    }

    return { value: 0 };
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE - CIRCUMFERENCE * resolvedProgress.value,
  }));

  return (
    <Svg width={SIZE} height={SIZE}>
      {/* Background ring */}
      <Circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        stroke="#333"
        strokeWidth={STROKE_WIDTH}
        fill="none"
      />

      {/* Animated ring */}
      <AnimatedCircle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        stroke="white"
        strokeWidth={STROKE_WIDTH}
        fill="none"
        strokeDasharray={CIRCUMFERENCE}
        animatedProps={animatedProps}
        strokeLinecap="round"
      />
    </Svg>
  );
}