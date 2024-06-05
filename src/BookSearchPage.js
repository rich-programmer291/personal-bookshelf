import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery?.length > 2) {
        setLoading(true);
        try {
          const response = await axios.get(`https://openlibrary.org/search.json?q=${searchQuery}&limit=10&page=1`);
          setSearchResults(response?.data?.docs);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      }
    };
    fetchSearchResults();
  }, [searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const addedtobookshelf = (book) => {
    const bookshelf = JSON.parse(localStorage.getItem('bookshelf') || '[]');
    return bookshelf.find((sbook) => sbook.key === book.key);
  }

  const handleAddToBookshelf = (book) => {
    const bookshelf = JSON.parse(localStorage.getItem('bookshelf') || '[]');
    if (!bookshelf.find((sbook) => sbook.key === book.key)) {
      bookshelf.push(book);
    }
    localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
  };

  return (
    <div>
      <div className='nav'>
        <h1 className='project-name'>YourShelf</h1>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search for a book"
          className='input-search'
        />
        <button onClick={() => window.location.href = '/bookshelf'} className='search-button'>View Bookshelf</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='results'>
        <ul>
          {searchResults?.map((book) => (
            <li key={book?.key} className='result'>
              <h2>{book?.title}</h2>
              <p><strong>Author: </strong>{book?.author_name[0]}</p>
              <p><strong>Edition Count: </strong>{book?.edition_count}</p>
              <button onClick={() => handleAddToBookshelf(book)} >{addedtobookshelf(book) ? 'Already in the Bookshelf' : 'Add to Bookshelf'}</button>
            </li>
          ))}
          </ul>
          </div>
      )}
</div>
      );
};

          export default BookSearchPage;