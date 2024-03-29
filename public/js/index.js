index={}

index.btnLogin = document.getElementById("BTN_LOGIN");

index.inputEmail = document.getElementById("INPUT_EMAIL");
index.inputPassWord = document.getElementById("INPUT_PASSWORD");


index.btnLogin.addEventListener("click",(e)=>{

    fetch("http://localhost:3000/api/teacher/login",{
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
            email : index.inputEmail.value,
            password : index.inputPassWord.value
        })
    }).then(rawResponse=>rawResponse.json())
    .then(jsonResponse => console.log(jsonResponse))
    .catch((e)=>{
        console.log(e)
    })

})