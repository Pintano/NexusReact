import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookDetail from '../pages/BookDetail';

describe('BookDetail', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <BookDetail />
      </BrowserRouter>
    );
  });

  it('displays book title', () => {
    render(
      <BrowserRouter>
        <BookDetail />
      </BrowserRouter>
    );
    // Add assertions based on your BookDetail component
  });

  it('displays book details', () => {
    render(
      <BrowserRouter>
        <BookDetail />
      </BrowserRouter>
    );
    // Add assertions for author, description, etc.
  });
});