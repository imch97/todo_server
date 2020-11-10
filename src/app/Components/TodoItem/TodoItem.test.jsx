import React from 'react';
import {render, fireEvent, screen, act} from '@testing-library/react'
import TodoItem from './TodoItem';

describe('Task Item Content', () => {

  it('Task Should have a checkbox', () => {
    let mockFn = jest.fn();
    const { container } = render(
        <TodoItem id="1" text="Hello" checked={true} onCheck={mockFn} />
    );

    const button = container.querySelector('input[type="checkbox"]');

    act(() => {
      button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    expect(mockFn).toHaveBeenCalledWith('1');

  });

  it('Task Should have a correct text', () => {
    let mockFn = jest.fn();
    const component = render(
      <TodoItem id="1" text="Hello" checked={true} onCheck={mockFn} />
    );

    const textContainer = component.getByText('Hello');

    expect(textContainer).toBeInTheDocument();

  })
});