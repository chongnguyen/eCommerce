window.addEventListener('DOMContentLoaded', init)

function init(event) {
  let sidebarItem = document.getElementsByClassName('sidebar__item');
  let len = sidebarItem.length;
  for(let i = 0; i < len; i++) {
    sidebarItem[i].addEventListener('click', function(event) {
      this.classList.toggle('active');
    });
  }
}

