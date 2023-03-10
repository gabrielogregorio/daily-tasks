import { Tasks } from '@/pages/home/components/tasks';
import type { ITask } from '@/pages/home/types';
import { fireEvent, render, screen } from '@testing-library/react';
import type { Mock } from 'vitest';
import { vi } from 'vitest';

const mockTasks: ITask[] = [
  {
    id: 123,
    text: 'name-task-mock-1',
    done: true,
    day: 10,
  },

  {
    id: 456,
    text: 'name-task-mock-2',
    done: true,
    day: 10,
  },
];

const mockIgnoreImplementation: Mock = vi.fn();

describe('<Tasks />', () => {
  it('should render a list items', () => {
    render(
      <Tasks
        tasks={mockTasks}
        handleUpdateStatus={mockIgnoreImplementation}
        handleDropTask={mockIgnoreImplementation}
      />,
    );

    expect(screen.getByRole('button', { name: 'name-task-mock-1' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'name-task-mock-2' })).toBeDefined();
  });

  it('should update second status task', () => {
    const mockHandleUpdateStatusTask: Mock = vi.fn();
    const mockHandleDropTask: Mock = vi.fn();

    render(
      <Tasks tasks={mockTasks} handleUpdateStatus={mockHandleUpdateStatusTask} handleDropTask={mockHandleDropTask} />,
    );

    expect(mockHandleUpdateStatusTask).toBeCalledTimes(0);
    fireEvent.click(screen.getByRole('button', { name: 'name-task-mock-2' }));
    expect(mockHandleUpdateStatusTask).toBeCalledWith(456);
    expect(mockHandleDropTask).toBeCalledTimes(0);
  });

  it('should drop first task', () => {
    const mockHandleUpdateStatusTask: Mock = vi.fn();
    const mockHandleDropTask: Mock = vi.fn();

    render(
      <Tasks tasks={mockTasks} handleUpdateStatus={mockHandleUpdateStatusTask} handleDropTask={mockHandleDropTask} />,
    );

    expect(mockHandleDropTask).toBeCalledTimes(0);
    fireEvent.click(screen.getAllByRole('button', { name: 'X' })[0]);
    expect(mockHandleDropTask).toBeCalledWith(123);
    expect(mockHandleUpdateStatusTask).toBeCalledTimes(0);
  });
});
