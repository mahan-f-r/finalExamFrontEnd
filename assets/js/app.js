const items = document.querySelectorAll('.nav-link-list li');
items.forEach(li => {
  li.addEventListener('click', () => {
    items.forEach(item => item.classList.remove('active'));
    li.classList.add('active');
  });
});


