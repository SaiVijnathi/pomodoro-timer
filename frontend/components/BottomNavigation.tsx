import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type TabKey = 'pomodoro' | 'todos' | 'calendar';

const tabs: Array<{ key: TabKey; label: string; icon: string }> = [
  { key: 'todos', label: 'Todos', icon: 'checkbox-outline' },
  { key: 'pomodoro', label: 'Pomodoro', icon: 'timer-outline' },
  { key: 'calendar', label: 'Calendar', icon: 'calendar-outline' },
];

type BottomNavigationProps = {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
};

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        {tabs.map((tab) => {
          const active = tab.key === activeTab;
          return (
            <Pressable
              key={tab.key}
              onPress={() => onTabChange(tab.key)}
              style={[styles.tabButton, active && styles.activeTabButton]}
            >
              <Ionicons
                name={tab.icon as any}
                size={22}
                color={active ? '#F4B400' : '#E8E2D8'}
              />
              <Text style={[styles.label, active && styles.activeLabel]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: 'transparent',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 28,
    backgroundColor: 'rgba(20, 25, 40, 0.72)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: 'rgba(244, 180, 0, 0.12)',
  },
  label: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '600',
    color: '#E8E2D8',
  },
  activeLabel: {
    color: '#F4B400',
  },
});