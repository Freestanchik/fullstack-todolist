import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Fullstack Todo App', () => {
  render(<App />);
  const text = "Fullstack Todo App"
  const linkElement = screen.getByText(text);
  expect(linkElement).toBeInTheDocument();
});

