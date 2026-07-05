import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import { Calendar } from "react-native-calendars";

type StudySession = {
  id: number;
  title: string;
};

export default function StudyCalendar() {
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [title, setTitle] = useState("");
  const [events, setEvents] = useState<Record<string, StudySession[]>>({});

  function addSession() {
    if (!title.trim()) return;

    setEvents((prev) => ({
      ...prev,
      [selectedDate]: [
        ...(prev[selectedDate] || []),
        { id: Date.now(), title },
      ],
    }));

    setTitle("");
  }

  function deleteSession(id: number) {
    setEvents((prev) => ({
      ...prev,
      [selectedDate]: prev[selectedDate].filter((item) => item.id !== id),
    }));
  }

  const markedDates = Object.keys(events).reduce((acc, date) => {
    acc[date] = { marked: true, dotColor: "#D89B4D" };
    return acc;
  }, {} as any);

  markedDates[selectedDate] = {
    ...(markedDates[selectedDate] || {}),
    selected: true,
    selectedColor: "#C88942",
  };

  const formattedDate = new Date(selectedDate).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Calendar</Text>
        <Text style={styles.headerSubtitle}>Plan your day, stay focused.</Text>

      <FlatList
        data={events[selectedDate] || []}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <View style={styles.calendarCard}>
              <Calendar
                markedDates={markedDates}
                onDayPress={(day) => setSelectedDate(day.dateString)}
                theme={{
                  backgroundColor: "transparent",
                  calendarBackground: "transparent",
                  textSectionTitleColor: "#CDB89A",
                  selectedDayBackgroundColor: "#D89B4D",
                  selectedDayTextColor: "#ffffff",
                  todayTextColor: "#F7C873",
                  dayTextColor: "#E8E2D8",
                  monthTextColor: "#F4E8D5",
                  arrowColor: "#F0C674",
                  textDisabledColor: "#5C6278",
                  dotColor: "#F0C674",
                  selectedDotColor: "#fff",
                  indicatorColor: "#F0C674",
                  textMonthFontWeight: "700",
                  textDayHeaderFontWeight: "600",
                }}
              />
            </View>

            <View style={styles.dateRow}>
              <Text style={styles.dateHeading}>{formattedDate}</Text>
              <Pressable style={styles.addButton} onPress={addSession}>
                <Text style={styles.addButtonText}>+ Add Session</Text>
              </Pressable>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                placeholder="Study topic..."
                placeholderTextColor="#8A8496"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                onSubmitEditing={addSession}
              />
            </View>
            
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.iconBubble}>
              <Text style={styles.iconText}>📖</Text>
            </View>

            <Text style={styles.eventText}>{item.title}</Text>

            <Pressable onPress={() => deleteSession(item.id)}>
              <Text style={styles.delete}>✕</Text>
            </Pressable>
          </View>
        )}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
  },

  container: {
    flex: 1,
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    paddingTop: 44,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },

  headerTitle: {
    color: "#F7E8D5",
    fontSize: 40,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "#D9B98C",
    fontSize: 15,
    marginTop: 4,
    marginBottom: 20,
  },

  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  calendarCard: {
    backgroundColor: "rgba(24,28,42,0.6)",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgba(134, 8, 8, 0.08)",
    padding: 10,
    overflow: "hidden",
    marginBottom: 20,
  },

  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  dateHeading: {
    color: "#E8935A",
    fontSize: 18,
    fontWeight: "600",
  },
  addButton: {
    borderWidth: 1,
    borderColor: "#C88942",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  addButtonText: {
    color: "#E8935A",
    fontSize: 13,
    fontWeight: "600",
  },

  inputRow: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "#F8F2EA",
    fontSize: 15,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  iconBubble: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  iconText: {
    fontSize: 18,
  },

  eventText: {
    flex: 1,
    color: "#F6EEE5",
    fontSize: 16,
    fontWeight: "600",
  },

  delete: {
    color: "#F3B7A3",
    fontSize: 18,
    paddingHorizontal: 6,
  },
});