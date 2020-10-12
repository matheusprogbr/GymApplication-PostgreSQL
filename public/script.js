const htmlDoc = document.querySelector('html');
const checkbox = document.querySelector('#theme');
const currentPage = location.pathname; // window.location.pathname returns the url/route that the user is connected
const menuItems = document.querySelectorAll('.header .menu a');

checkbox.addEventListener('click', () => {
  htmlDoc.classList.toggle('active-theme');
});

// CURRENT PAGE
for (item of menuItems) {
  if (currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('active');
  }
};


/* Pagination */
function paginate(selectedPage, totalPages) {

  let pages = [],
    oldPage

  for (let actualPage = 1; actualPage <= totalPages; actualPage++) {
    const firstAndLastPage = actualPage == '1' || actualPage == totalPages;
    const pagesAfterSelectedPage = actualPage <= selectedPage + 2;
    const pagesBeforeSelectedPage = actualPage >= selectedPage - 2;

    if (firstAndLastPage || pagesAfterSelectedPage && pagesBeforeSelectedPage) {

      if (oldPage && actualPage - oldPage > 2) {
        pages.push('...');
      }

      if (oldPage && actualPage - oldPage == 2) {
        pages.push(oldPage + 1);
      }

      pages.push(actualPage);

      oldPage = actualPage;
    }
  }
  return pages;
};

const pagination = document.querySelector(".pagination");
const page = +pagination.dataset.page;
const total = +pagination.dataset.total;
const pages = paginate(page, total);

let elements = "";

for (let page of pages) {
  if (String(page).includes('...')) {
    elements += `<span>${page}</span>`;
  } else {
    elements += `<a href="?page=${page}">${page}<a>`

  }
}

pagination.innerHTML = elements;