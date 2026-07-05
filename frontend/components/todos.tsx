import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, ImageBackground } from 'react-native';

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
    <View style={styles.screen}>
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
            placeholderTextColor="#8A8496"
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
              <Pressable style={styles.checkBubble} onPress={() => toggleTodo(todo.id)}>
                <Text style={[styles.checkIcon, todo.completed && styles.checkIconDone]}>
                  {todo.completed ? '✓' : '○'}
                </Text>
              </Pressable>

              <Pressable style={styles.todoTextWrapper} onPress={() => toggleTodo(todo.id)}>
                <Text style={[styles.todoTitle, todo.completed && styles.completedTodo]}>{todo.title}</Text>
              </Pressable>

              <View style={styles.actions}>
                <Pressable style={styles.iconButton} onPress={() => startEdit(todo)}>
                  <Text style={styles.iconText}>✎</Text>
                </Pressable>
                <Pressable style={styles.iconButton} onPress={() => deleteTodo(todo.id)}>
                  <Text style={styles.deleteText}>✕</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    paddingTop: 44,
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    color: '#F7E8D5',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: '#D9B98C',
    marginTop: 4,
    fontSize: 14,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#F8F2EA',
    fontSize: 15,
  },
  primaryButton: {
    backgroundColor: '#C88942',
    borderRadius: 16,
    paddingHorizontal: 18,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  list: {
    gap: 12,
    paddingBottom: 16,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 14,
  },
  checkBubble: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  checkIcon: {
    color: '#D9B98C',
    fontSize: 16,
  },
  checkIconDone: {
    color: '#F0C674',
  },
  todoTextWrapper: {
    flex: 1,
  },
  todoTitle: {
    color: '#F6EEE5',
    fontSize: 16,
    fontWeight: '600',
  },
  completedTodo: {
    textDecorationLine: 'line-through',
    color: '#8A8496',
    fontWeight: '400',
  },
  actions: {
    flexDirection: 'row',
    gap: 6,
  },
  iconButton: {
    padding: 6,
  },
  iconText: {
    color: '#D9B98C',
    fontSize: 15,
  },
  deleteText: {
    color: '#F3B7A3',
    fontSize: 16,
  },
});