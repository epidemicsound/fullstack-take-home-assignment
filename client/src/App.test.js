import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app with tracks tab', () => {
  render(<App />);
  const linkElement = screen.getByText(/tracks/i);
  expect(linkElement).toBeInTheDocument();
});
