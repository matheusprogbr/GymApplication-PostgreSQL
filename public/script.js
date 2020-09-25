const htmlDoc = document.querySelector('html');
const checkbox = document.querySelector('#theme');
const currentPage = location.pathname; // window.location.pathname returns the url/route that the user is connected
const menuItems = document.querySelectorAll('.header .menu a');

checkbox.addEventListener('click', () => {
  htmlDoc.classList.toggle('active-theme');
});

// CURRENT PAGE
for(item of menuItems){
  if(currentPage.includes(item.getAttribute('href'))){
    item.classList.add('active');
  }
};
