import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookSearchPage from './BookSearchPage';
import BookshelfPage from './BookshelfPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<BookSearchPage />} />
        <Route path="/bookshelf" element={<BookshelfPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;