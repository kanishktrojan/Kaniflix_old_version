setTimeout(function(){
    document.querySelector('.otperr').remove()
}, 3000)

window.addEventListener('load', (e)=>{
document.querySelector('.alert').classList.add('show');
document.querySelector('.alert').classList.remove('hide');
document.querySelector('.alert').classList.add('showAlert');

setTimeout(function(){
document.querySelector('.alert').classList.remove('show');
document.querySelector('.alert').classList.add('hide');
}, 5000)
})

document.querySelector('.close-btn').addEventListener('click', (e)=>{
document.querySelector('.alert').classList.remove('show');
document.querySelector('.alert').classList.add('hide');
})   
