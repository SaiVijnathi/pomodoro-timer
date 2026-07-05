import React, { useState } from 'react';
import { View } from 'react-native';
import { Background } from '../components';
import Timer from '../components/timer';

export default function Index() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  return (
    <Background isRunning={isTimerRunning}>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ translateY: -100 }]
      }}>
        <Timer onTimerStateChange={setIsTimerRunning} />
      </View>
    </Background>
  );
}