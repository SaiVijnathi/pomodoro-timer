import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';

type TodoItem = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Todos() {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, title: 'Review project goals', completed: false },
    { id: 2, title: 'Plan the next focus block', completed: true },
  ]);
  const [draft, setDraft] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const completedCount = useMemo(() => todos.filter((todo) => todo.completed).length, [todos]);

  const addOrUpdateTodo = () => {
    const value = draft.trim();
    if (!value) return;

    if (editingId !== null) {
      setTodos((current) =>
        current.map((todo) => (todo.id === editingId ? { ...todo, title: value } : todo)),
      );
      setEditingId(null);
    } else {
      setTodos((current) => [
        ...current,
        {
          id: Date.now(),
          title: value,
          completed: false,
        },
      ]);
    }

    setDraft('');
  };

  const startEdit = (todo: TodoItem) => {
    setEditingId(todo.id);
    setDraft(todo.title);
  };

  const toggleTodo = (id: number) => {
    setTodos((current) =>
      current.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setDraft('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
        <Text style={styles.subtitle}>{completedCount}/{todos.length} done</Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder={editingId ? 'Edit your todo' : 'Add a todo'}
          placeholderTextColor="rgba(255,255,255,0.55)"
          style={styles.input}
          onSubmitEditing={addOrUpdateTodo}
        />
        <Pressable style={styles.primaryButton} onPress={addOrUpdateTodo}>
          <Text style={styles.buttonText}>{editingId ? 'Save' : 'Add'}</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {todos.map((todo) => (
          <View key={todo.id} style={styles.todoItem}>
            <Pressable style={styles.checkButton} onPress={() => toggleTodo(todo.id)}>
              <Text style={styles.checkIcon}>{todo.completed ? '✓' : '○'}</Text>
            </Pressable>

            <Pressable style={styles.todoTextWrapper} onPress={() => toggleTodo(todo.id)}>
              <Text style={[styles.todoTitle, todo.completed && styles.completedTodo]}>{todo.title}</Text>
            </Pressable>

            <View style={styles.actions}>
              <Pressable style={styles.iconButton} onPress={() => startEdit(todo)}>
                <Text style={styles.iconText}>✎</Text>
              </Pressable>
              <Pressable style={styles.iconButton} onPress={() => deleteTodo(todo.id)}>
                <Text style={styles.iconText}>✕</Text>
              </Pressable>
            </View>
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
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
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
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
  list: {
    gap: 10,
    paddingBottom: 16,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 16,
    padding: 12,
  },
  checkButton: {
    marginRight: 10,
  },
  checkIcon: {
    color: 'white',
    fontSize: 18,
  },
  todoTextWrapper: {
    flex: 1,
  },
  todoTitle: {
    color: 'white',
    fontSize: 15,
  },
  completedTodo: {
    textDecorationLine: 'line-through',
    color: 'rgba(255,255,255,0.65)',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 4,
  },
  iconText: {
    color: 'white',
    fontSize: 16,
  },
});
