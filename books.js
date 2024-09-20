let books;

async function renderBooks(filter) {
  const booksWrapper = document.querySelector('.books');
  booksWrapper.classList += ' books__loading'

  if (!books)
    books = await getBooks();
  booksWrapper.classList.remove('books__loading');
  if (filter === 'LOW_TO_HIGH') {

    books.sort((x, y) => {
      let xSortingPrice = x.salePrice ? x.salePrice : x.originalPrice
      let ySortingPrice = y.salePrice ? y.salePrice : y.originalPrice
      return xSortingPrice - ySortingPrice;
    });
  }
  else if (filter === 'HIGH_TO_LOW') {
    books.sort((x, y) => {
      let xSortingPrice = x.salePrice ? x.salePrice : x.originalPrice
      let ySortingPrice = y.salePrice ? y.salePrice : y.originalPrice
      return ySortingPrice - xSortingPrice;
    });
  }
  else if (filter === 'RATING') {
    books.sort((x, y) => {
      return y.rating - x.rating;
    });
  }


  let bookHtml = books.map((book) => {

    return `<div class="book">
    <figure class="book__img--wrapper">
      <img class="book__img" src="${book.url}" alt="" />
    </figure>
    <div class="book__title">${book.title}</div>
    <div class="book__ratings">
      ${returnRating(book.rating)}
    </div>
    <div class="book__price">
      ${returnPriceHtml(book)}
    </div>
  </div>`
  })

  booksWrapper.innerHTML = bookHtml.join('');

}
setTimeout(() => {
  renderBooks();
})

function returnRating(number) {
  let ratingHtml = ''

  while (number >= 1) {
    ratingHtml += '<i class="fas fa-star"></i>\n'
    number -= 1;
  }

  if (number !== 0)
    ratingHtml += '<i class="fas fa-star-half-alt"></i>'

  return ratingHtml;

}


//<span class="book__price--normal">$59.95</span> $14.95
function returnPriceHtml(book) {
  if (book.salePrice) {
    return `<span class="book__price--normal">$${book.originalPrice.toFixed(2)}</span> $${book.salePrice.toFixed(2)}`
  }
  return `$${book.originalPrice.toFixed(2)}`
}



function filterBooks(event) {
  renderBooks(event.target.value)
}


// FAKE DATA
function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "assets/crack the coding interview.png",
          originalPrice: 49.95,
          salePrice: 14.95,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "assets/atomic habits.jpg",
          originalPrice: 39,
          salePrice: null,
          rating: 5,
        },
        {
          id: 3,
          title: "Deep Work",
          url: "assets/deep work.jpeg",
          originalPrice: 29,
          salePrice: 12,
          rating: 5,
        },
        {
          id: 4,
          title: "The 10X Rule",
          url: "assets/book-1.jpeg",
          originalPrice: 44,
          salePrice: 19,
          rating: 4.5,
        },
        {
          id: 5,
          title: "Be Obsessed Or Be Average",
          url: "assets/book-2.jpeg",
          originalPrice: 32,
          salePrice: 17,
          rating: 4,
        },
        {
          id: 6,
          title: "Rich Dad Poor Dad",
          url: "assets/book-3.jpeg",
          originalPrice: 70,
          salePrice: 12.5,
          rating: 5,
        },
        {
          id: 7,
          title: "Cashflow Quadrant",
          url: "assets/book-4.jpeg",
          originalPrice: 11,
          salePrice: 10,
          rating: 4,
        },
        {
          id: 8,
          title: "48 Laws of Power",
          url: "assets/book-5.jpeg",
          originalPrice: 38,
          salePrice: 17.95,
          rating: 4.5,
        },
        {
          id: 9,
          title: "The 5 Second Rule",
          url: "assets/book-6.jpeg",
          originalPrice: 35,
          salePrice: null,
          rating: 4,
        },
        {
          id: 10,
          title: "Your Next Five Moves",
          url: "assets/book-7.jpg",
          originalPrice: 40,
          salePrice: null,
          rating: 4,
        },
        {
          id: 11,
          title: "Mastery",
          url: "assets/book-8.jpeg",
          originalPrice: 30,
          salePrice: null,
          rating: 4.5,
        },
      ])
    }, 1000)
  })

}
