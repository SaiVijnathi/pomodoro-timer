import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Background, BottomNavigation, Calendar, Todos } from '../components';
import Timer from '../components/timer';

type TabKey = 'pomodoro' | 'todos' | 'calendar';

export default function Index() {
  const [activeTab, setActiveTab] = useState<TabKey>('pomodoro');
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const renderScreen = () => {
    if (activeTab === 'todos') {
      return <Todos />;
    }

    if (activeTab === 'calendar') {
      return <Calendar />;
    }

    return (
      <View style={styles.timerWrapper}>
        <Timer onTimerStateChange={setIsTimerRunning} />
      </View>
    );
  };

  return (
    <Background isRunning={isTimerRunning}>
      <View style={styles.screen}>
        <View style={styles.content}>{renderScreen()}</View>
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
  },
  timerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});