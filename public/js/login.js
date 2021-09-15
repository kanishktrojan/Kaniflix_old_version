const form=document.querySelector('#form');
const emailInput=document.querySelector('.email');
const passInput=document.querySelector('.pass');
const elabel=document.querySelector('.elabel');
const plabel=document.querySelector('.plabel');
const msgerr=document.querySelector('.msgerr');
const msge=document.querySelector('.msge');
const msgp=document.querySelector('.msgp');
const btn=document.querySelector('.btn');
let error=0;


function errorEmail(){

    elabel.style.borderBottom='2px solid red';
    msge.innerHTML='<p style="padding:5px 0px 0px 15px;color:red;">Enter your email'; 
    error=1;

}


function errorPass(){

    plabel.style.borderBottom='2px solid red';
    msgp.innerHTML='<p style="padding:5px 0px 0px 15px;color:red">Enter your password';
    error=1;

}


function rErrorEmail(){

    elabel.style.borderBottom='1px solid white';
    msge.innerHTML='';  
    error=0;

}


function rErrorPass(){

    plabel.style.borderBottom='1px solid white';
    msgp.innerHTML='';
    error=0;

}


function formValidation(e){

    if(emailInput.value===''&&passInput.value===''){

        errorEmail();
        errorPass();

    }else if(emailInput.value===''){
        
        errorEmail();

    }else if(passInput.value===''){
        
        errorPass();

    }else{
        
        return console.log(error);

    }

    if(error===1){
        
        e.preventDefault();

    }else{
        
        return console.log('success')

    }

    form.addEventListener('keypress',removeValidation)

    form.addEventListener('keyup',formValidation)

}


function toggle(e){

    // passInput.focusin();

    if(passInput.type==='password'){
        passInput.setAttribute('type','text');
        document.querySelector('.toggle').setAttribute('src','/img/show.png')
        console.log('Showing password')
    }else{
        passInput.setAttribute('type','password');
        document.querySelector('.toggle').setAttribute('src','/img/hide.png')
        console.log('Password hidden')

    }

}


function removeValidation(e){

    if(emailInput.value!==''&&passInput.value!==''){
    
        rErrorEmail();
        rErrorPass();
    
    }else if(emailInput.value!==''){
    
        rErrorEmail();
    
    }else if(passInput.value!==''){
    
        rErrorPass();
    
    }else{
    
        console.log('Failure')
    
    }

}


form.addEventListener('submit', formValidation)

document.querySelector('.toggle').addEventListener('click',toggle)

setTimeout(function(){
    msgerr.remove();
    },3000)

emailInput.addEventListener('focus',(e)=>{
    msgerr.remove();
})


window.addEventListener('load', (e)=>{
    document.querySelector('.galert').classList.add('show');
    document.querySelector('.galert').classList.remove('hide');
    document.querySelector('.galert').classList.add('showAlert');

    setTimeout(function(){
    document.querySelector('.galert').classList.remove('show');
    document.querySelector('.galert').classList.add('hide');
    }, 5000)
})

document.querySelector('.close-btn').addEventListener('click', (e)=>{
  document.querySelector('.galert').classList.remove('show');
  document.querySelector('.galert').classList.add('hide');
})