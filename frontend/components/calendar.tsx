import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';

type CalendarEvent = {
  id: number;
  title: string;
  time: string;
};

export default function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: 1, title: 'Standup', time: '09:00' },
    { id: 2, title: 'Deep work', time: '13:30' },
  ]);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');

  const addEvent = () => {
    if (!title.trim() || !time.trim()) return;

    setEvents((current) => [
      ...current,
      {
        id: Date.now(),
        title: title.trim(),
        time: time.trim(),
      },
    ]);
    setTitle('');
    setTime('');
  };

  const deleteEvent = (id: number) => {
    setEvents((current) => current.filter((event) => event.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Schedule</Text>
        <Text style={styles.subtitle}>Plan your day in a few taps</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Event title"
          placeholderTextColor="rgba(255,255,255,0.55)"
          style={styles.input}
        />
        <TextInput
          value={time}
          onChangeText={setTime}
          placeholder="Time"
          placeholderTextColor="rgba(255,255,255,0.55)"
          style={styles.input}
        />
        <Pressable style={styles.primaryButton} onPress={addEvent}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {events.map((event) => (
          <View key={event.id} style={styles.eventItem}>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTime}>{event.time}</Text>
              <Text style={styles.eventTitle}>{event.title}</Text>
            </View>
            <Pressable onPress={() => deleteEvent(event.id)}>
              <Text style={styles.deleteText}>✕</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 420,
    flex: 1,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  form: {
    gap: 10,
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderColor: 'rgba(255,255,255,0.24)',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: 'white',
  },
  primaryButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
  list: {
    gap: 10,
    paddingBottom: 16,
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 16,
    padding: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventTime: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginBottom: 4,
  },
  eventTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
});
