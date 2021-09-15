const form=document.querySelector('#form');
const nameInput=document.querySelector('.name');
const emailInput=document.querySelector('.email');
const passInput=document.querySelector('.pass');
const cPassInput=document.querySelector('.cpass');
const nlabel=document.querySelector('.nlabel');
const elabel=document.querySelector('.elabel');
const plabel=document.querySelector('.plabel');
const cplabel=document.querySelector('.cplabel');
const msgn=document.querySelector('.msgn');
const msge=document.querySelector('.msge');
const msgp=document.querySelector('.msgp');
const msgcp=document.querySelector('.msgcp');
const btn=document.querySelector('.btn');
let error=0;


function errorName(){
   
    nlabel.style.borderBottom='2px solid red';
    msgn.innerHTML='<p style="padding:5px 0px 0px 15px;color:red">Enter your name';
    error=1;

}


function errorEmail(){
   
    elabel.style.borderBottom='2px solid red';
    msge.innerHTML='<p style="padding:5px 0px 0px 15px;color:red">Enter your email';  
    error=1;

}


function errorPass(){
    plabel.style.borderBottom='2px solid red';
    msgp.innerHTML='<p style="padding:5px 0px 0px 15px;color:red">Enter your password';
    error=1;

}


function errorCPass(){
   
    cplabel.style.borderBottom='2px solid red';
    msgcp.innerHTML='<p style="padding:5px 0px 0px 15px;color:red">Confirm your password';
    error=1;

}



function rErrorName(){
   
    nlabel.style.borderBottom='1px solid white';
    msgn.innerHTML='';
    error=0;

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


function rErrorCPass(){
    
    cplabel.style.borderBottom='1px solid white';
    msgcp.innerHTML='';
    error=0;

}


function formValidation(e){

    if(nameInput.value===''&&emailInput.value===''&&passInput.value===''&&cPassInput.value===''){
       
        errorName();
        errorEmail();
        errorPass();
        errorCPass();

    }else if(emailInput.value===''&&passInput.value===''&&cPassInput.value===''){
       
        errorEmail();
        errorPass();
        errorCPass();

    }else if(nameInput.value===''&&passInput.value===''&&cPassInput.value===''){
       
        errorName();
        errorPass();
        errorCPass();

    }else if(nameInput.value===''&&emailInput.value===''&&cPassInput.value===''){
       
        errorName();
        errorEmail();
        errorCPass();

    }else if(nameInput.value===''&&emailInput.value===''&&passInput.value===''){
       
        errorName();
        errorEmail();
        errorPass();

    }else if(nameInput.value===''&&emailInput.value===''){
       
        errorName();
        errorEmail();

    }else if(nameInput.value===''&&passInput.value===''){
       
        errorName();
        errorPass();

    }else if(nameInput.value===''&&cPassInput.value===''){
       
        errorName();
        errorCPass();

    }else if(emailInput.value===''&&passInput.value===''){
      
        errorEmail();
        errorPass();

    }else if(emailInput.value===''&&cPassInput.value===''){
        
        errorName();
        errorCPass();

    }else if(passInput.value===''&&cPassInput.value===''){
       
        errorPass();
        errorCPass();

    }else if(nameInput.value===''){
      
        errorName();

    }else if(emailInput.value===''){
    
        errorEmail();

    }else if(passInput.value===''){
    
        errorPass();

    }else if(cPassInput.value===''){
    
        errorCPass();

    }else{
        
        return console.log(error);

    }

    if(error===1){
        
        e.preventDefault();

    }else{
        
        return console.log('success')

    }
    
    form.addEventListener('keyup',removeValidation)
    form.addEventListener('keyup',formValidation)
    checkPassword(e);

}


function removeValidation(e){

    if(nameInput.value!==''&&emailInput.value!==''&&passInput.value!==''&&cPassInput.value!==''){

        rErrorName();
        rErrorEmail();
        rErrorPass();
        rErrorCPass();

    }else if(emailInput.value!==''&&passInput.value!==''&&cPassInput.value!==''){

        rErrorEmail();
        rErrorPass();
        rErrorCPass();

    }else if(nameInput.value!==''&&passInput.value!==''&&cPassInput.value!==''){

        rErrorName();
        rErrorPass();
        rErrorCPass();

    }else if(nameInput.value!==''&&emailInput.value!==''&&cPassInput.value!==''){

        rErrorName();
        rErrorEmail();
        rErrorCPass();

    }else if(nameInput.value!==''&&emailInput.value!==''&&passInput.value!==''){

        rErrorName();
        rErrorEmail();
        rErrorPass();

    }else if(nameInput.value!==''&&emailInput.value!==''){

        rErrorName();
        rErrorEmail();

    }else if(nameInput.value!==''&&passInput.value!==''){

        rErrorName();
        rErrorPass();

    }else if(nameInput.value!==''&&cPassInput.value!==''){

        rErrorName();
        rErrorCPass();

    }else if(emailInput.value!==''&&passInput.value!==''){

        rErrorEmail();
        rErrorPass();

    }else if(emailInput.value!==''&&cPassInput.value!==''){

        rErrorName();
        rErrorCPass();

    }else if(passInput.value!==''&&cPassInput.value!==''){

        rErrorPass();
        rErrorCPass();

    }else if(nameInput.value!==''){

        rErrorName();

    }else if(emailInput.value!==''){

        rErrorEmail();

    }else if(passInput.value!==''){

        rErrorPass();

    }else if(cPassInput.value!==''){
  
        checkPassword(e);
        // rErrorCPass();

    }else{
  
        return console.log(error);

    }

    checkPassword(e);

}

passInput.addEventListener('keyup',(e)=>{
    
    if(passInput.value===''){

        cPassInput.disabled=true;

    }else{

        passInput.addEventListener('keyup',checkPassword)

        cPassInput.disabled=false


    }
})



function toggle1(e){

    // passInput.focusin();

    if(passInput.type==='password'){
        passInput.setAttribute('type','text');
        document.querySelector('.toggle1').setAttribute('src','/img/show.png')
        console.log('Showing password')
    }else{
        passInput.setAttribute('type','password');
        document.querySelector('.toggle1').setAttribute('src','/img/hide.png')
        console.log('Password hidden')

    }

}


function toggle2(e){

    // passInput.focusin();

    if(cPassInput.type==='password'){
        cPassInput.setAttribute('type','text');
        document.querySelector('.toggle2').setAttribute('src','/img/show.png')
        console.log('Showing password')
    }else{
        cPassInput.setAttribute('type','password');
        document.querySelector('.toggle2').setAttribute('src','/img/hide.png')
        console.log('Password hidden')

    }

}



function checkPassword(e){

    let pass=passInput.value;
    let cpass=cPassInput.value;


    if(cPassInput.value===''){
    
        errorCPass();
    
    }else if(pass!==cpass){
        
        cplabel.style.borderBottom='2px solid red';
        msgcp.innerHTML="<p style='padding:5px 0px 0px 15px;color:red'>Password doesn't match";
        error=1;

    }else{

        cplabel.style.borderBottom='1px solid white';
        msgcp.innerHTML="<p style='padding:5px 0px 0px 15px;color:rgb(35, 190, 35)'>Password matched";
        setTimeout(()=>{msgcp.innerHTML=''},1000)
        error=0;

    }
        
    if(error===1){

        formValidation();        
        btn.disabled=true;

    }else{
        
        btn.disabled=false;

    }

    console.log(pass,cpass)
}


form.addEventListener('submit',formValidation)
cPassInput.addEventListener('keyup',checkPassword)

// cPassInput.addEventListener('focusout',formValidation)
// passInput.addEventListener('focusout',checkPassword)

document.querySelector('.toggle1').addEventListener('click',toggle1)
document.querySelector('.toggle2').addEventListener('click',toggle2)

