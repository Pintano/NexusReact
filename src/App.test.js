import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app and shows Nexus title', () => {
  render(<App />);
  const titleElements = screen.getAllByText(/Nexus/i);
  expect(titleElements.length).toBeGreaterThan(0);
});
