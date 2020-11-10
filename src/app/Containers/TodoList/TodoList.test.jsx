import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import TodoList from './TodoList';
import store from '../../store';
import renderer from 'react-test-renderer';
import TodoReducer from './todoSlice';
const {act} = renderer;
import { actions, initialState  } from './todoSlice'
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
import TodoItem from '../../Components/TodoItem/TodoItem';
import RadioBadge from "../../Components/RadioBadge/RaidoBadge";



test('Check empty todo list', () => {
  const { container } = render(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );

  const input = container.querySelector('input');
  fireEvent.change(input, { target: { value: '$23.0' } });
  fireEvent.keyDown(input, { key: 'Enter'});

  const state = store.getState();
  expect(state.todo.tasks).toHaveLength(1);
  expect(state.todo.tasks[0].text).toBe('$23.0');

});

describe('Add new task', () => {
  const testTask = 'Hello';
  let newState;

  it('Call add method', () => {
    newState = TodoReducer(initialState, actions.add(testTask));
    expect(newState.tasks).toHaveLength(1);
  });

  it('Task should be object', () => {
    expect(typeof newState.tasks[0]).toBe('object');
  });
  it('Task content should be correct', () => {
    expect(newState.tasks[0].hasOwnProperty('id')).toBe(true);
    expect(newState.tasks[0].text).toBe(testTask);
    expect(newState.tasks[0].checked).toBe(false);
  });

  it('Task list should have correct content', () => {
    const store = mockStore({
      todo: newState,
    });
    const component = renderer.create(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
    expect(component.root.findByType(TodoItem).props.text).toBe(testTask);
    expect(component.root.findByType(TodoItem).props.checked).toBe(false);
    expect(component.root.findByType(RadioBadge).props.checked).toBe('All');
  })
});


describe('Manipulate with task', () => {
  const testTask = 'Hello';
  const testTask2 = 'Hello 2';
  let newState;

  it('Call add method', () => {
    newState = TodoReducer(initialState, actions.add(testTask));
    expect(newState.tasks).toHaveLength(1);
  });
  it('Add one more', () => {
    newState = TodoReducer(newState, actions.add(testTask2));
    expect(newState.tasks).toHaveLength(2);
  });
  it('Mark task as checked ', () => {
    newState = TodoReducer(newState, actions.markAsChecked(newState.tasks[0].id));
    expect(newState.tasks[0].checked).toBe(true);
  });
  it('Mark all task as checked ', () => {
    newState = TodoReducer(newState, actions.checkAll());
    expect(newState.tasks[1].checked).toBe(true);
  });

  it('Remove task', (done) => {
    newState = TodoReducer(newState, actions.remove(newState.tasks[0].id));
    setTimeout(() => {
      expect(newState.tasks).toHaveLength(1);
      expect(newState.tasks[ 0 ].text).toBe(testTask2);
      done()
    })
  });

  it('Clear completed', () => {
    newState = TodoReducer(newState, actions.add(testTask));
    newState = TodoReducer(newState, actions.clearCompleted());
    expect(newState.tasks).toHaveLength(1);
    expect(newState.tasks[0].text).toBe(testTask);
  });

});
