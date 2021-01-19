window.addEventListener('DOMContentLoaded', (event) => {
  let box = document.getElementById('box-notify') || {};
  let btn = document.getElementById('btn-show');
  let form = document.getElementById('form-create');
  
  if(btn){
    btn.addEventListener('click', function(event){
      showNotify(box);
    });
  }
  if(form){
    form.addEventListener('submit', function(event) {
      showNotify(box);
    });
  }
}) 

function showNotify(box){
  box.style.display= 'flex';
  setTimeout(function(){
    box.style.display= 'none';
  }, 3000)
}