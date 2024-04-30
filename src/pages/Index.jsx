import React, { useState } from 'react';
import { Box, Button, Input, List, ListItem, IconButton, Text } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      const newTask = { id: Date.now(), text: input, isCompleted: false };
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleCompleteTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Box p={5}>
      <Input
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
      />
      <IconButton
        icon={<FaPlus />}
        ml={2}
        onClick={handleAddTask}
        aria-label="Add task"
      />
      <List spacing={3} mt={4}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" alignItems="center">
            <Text as={task.isCompleted ? 's' : 'span'} flex="1">
              {task.text}
            </Text>
            <IconButton
              icon={<FaCheck />}
              onClick={() => handleCompleteTask(task.id)}
              aria-label="Complete task"
              colorScheme={task.isCompleted ? 'green' : 'gray'}
            />
            <IconButton
              icon={<FaTrash />}
              onClick={() => handleDeleteTask(task.id)}
              aria-label="Delete task"
              colorScheme="red"
              ml={2}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;