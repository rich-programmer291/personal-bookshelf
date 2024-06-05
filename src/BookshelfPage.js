import React from 'react';

const BookshelfPage = () => {
  const bookshelf = JSON.parse(localStorage.getItem('bookshelf') || '[]');

  return (
    <div>
      <h1 className='project-name centered' style={{"marginBottom":"3rem"}}>My <span className='coloured'>Bookshelf</span></h1>
      <ul>
        {bookshelf?.map((book) => (
          <li key={book.key}>
            <h2>{book?.title}</h2>
              <p><strong>Author: </strong>{book?.author_name[0]}</p>
              <p><strong>Edition Count: </strong>{book?.edition_count}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookshelfPage;