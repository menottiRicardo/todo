'use client';
import React from 'react';
import { Task } from './task';
import { animated, useTransition } from '@react-spring/web';

const Tasks = ({ tasks }: any) => {
  const transitions = useTransition(tasks, {
    keys: (task) => task.todo.id,
    from: { opacity: 0, transform: 'translateY(-20px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-20px)' },
    config: { tension: 280, friction: 30 },
  });

  return transitions((style, item) => (
    <animated.div style={style} key={item.todo.id}>
      <Task
        name={item.todo.name}
        list={item.list}
        description={item.todo.description}
        id={item.todo.id}
      />
    </animated.div>
  ));
};

export default Tasks;
