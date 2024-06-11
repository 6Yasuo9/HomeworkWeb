window.addEventListener('scroll', e =>{
   document.body.style.cssText = `--scrollTop: ${this.scrollY}px` 
})

document.querySelectorAll('.img-container img').forEach(img =>{
   img.onclick = () => {
      document.querySelector('.pop-up').style.display = `block`;
      document.querySelector('.pop-up img').src = img.getAttribute(`src`);
   }
})

document.querySelector('.pop-up span').onclick = () => {
   document.querySelector('.pop-up').style.display = `none`;
}

const input = document.getElementById('user');
const submit = document.getElementById('submit');

function validate(event) {
   event.preventDefault();
   if(input.value !== 'Bober') { 
     function LoginB() {
      location.href = 'galery.html'
     }
     return;
   } else {
      function LoginB() {
         location.href = 'reg.html'
        }
   }
 }
 
 submit.addEventListener('click', validate);