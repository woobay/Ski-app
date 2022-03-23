const log = document.querySelector("#log");
const login = async () => {
    const emailValue = document.querySelector("#email").value;
    const passwordValue = document.querySelector("#password").value;
    console.log(emailValue, passwordValue)
    if (!!emailValue && !!passwordValue) {
        const body = JSON.stringify({ email: emailValue, password: passwordValue });
        const response = await fetch(`https://ski-api.herokuapp.com/login`, {
            method: 'POST',
            body, 
            headers: { 'Content-Type': 'application/json',
            'Accept': 'application/json'}
        });
        const data = await response.json();
        
        if (!!data.token) {
            window.localStorage.setItem('ACCESS_TOKEN', data.token);
            window.localStorage.setItem('NAME', data.name);
            window.location.replace("/profil"); 
        }
    }
}
log.addEventListener("click", login)

