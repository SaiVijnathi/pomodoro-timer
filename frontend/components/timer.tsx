import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

const SIZE = 240;
const STROKE_WIDTH = 8;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CONTAINER_SIZE = SIZE + 36;

const DURATIONS: Record<TimerMode, number> = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export default function Timer({ onTimerStateChange }: { onTimerStateChange?: (isRunning: boolean) => void }) {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(DURATIONS.focus);
  const [isRunning, setIsRunning] = useState(false);
  const [completedFocusSessions, setCompletedFocusSessions] = useState(0);

  const duration = DURATIONS[mode];
  const progress = Math.max(0, Math.min(1, (duration - timeLeft) / duration));
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  useEffect(() => {
    onTimerStateChange?.(isRunning);
  }, [isRunning, onTimerStateChange]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((currentTime) => {
        if (currentTime <= 1) {
          const isFocusSession = mode === 'focus';
          const nextFocusCount = isFocusSession ? completedFocusSessions + 1 : completedFocusSessions;
          const nextMode: TimerMode = isFocusSession
            ? nextFocusCount % 3 === 0
              ? 'longBreak'
              : 'shortBreak'
            : 'focus';

          setMode(nextMode);
          if (isFocusSession) {
            setCompletedFocusSessions(nextFocusCount);
          }
          setIsRunning(true);
          return DURATIONS[nextMode];
        }

        return currentTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode, completedFocusSessions]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMode('focus');
    setTimeLeft(DURATIONS.focus);
  };

  const skipSession = () => {
    const nextMode: TimerMode = mode === 'focus' ? 'shortBreak' : 'focus';
    setMode(nextMode);
    setTimeLeft(DURATIONS[nextMode]);
    setIsRunning(false);
  };

  const formatTime = (value: number) => {
    const minutes = Math.floor(value / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (value % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const label =
    mode === 'focus'
      ? 'Focus'
      : mode === 'shortBreak'
        ? 'Short Break'
        : 'Long Break';

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.glow} />
        <Svg width={SIZE} height={SIZE}>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth={STROKE_WIDTH}
            fill="none"
          />

          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke="white"
            strokeWidth={STROKE_WIDTH}
            fill="none"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          />
        </Svg>

        <View style={styles.textContainer}>
          <Text style={styles.time}>{formatTime(timeLeft)}</Text>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.counter}>Pomodoros: {completedFocusSessions}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <Pressable
          style={styles.primaryButton}
          onPress={isRunning ? pauseTimer : startTimer}
        >
          <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={resetTimer}>
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={skipSession}>
          <Text style={styles.buttonText}>Skip</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    width: CONTAINER_SIZE,
    height: CONTAINER_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -50 }],
  },
  glow: {
    position: 'absolute',
    width: CONTAINER_SIZE,
    height: CONTAINER_SIZE,
    borderRadius: CONTAINER_SIZE / 2,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  time: {
    color: 'white',
    fontSize: 44,
    fontWeight: '700',
    letterSpacing: 1,
  },
  label: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 6,
  },
  counter: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 8,
  },
  controls: {
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    marginHorizontal: 6,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    marginHorizontal: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});