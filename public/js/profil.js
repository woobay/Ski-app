const useName = localStorage.getItem("NAME")
const surname = useName.split(' ')[0]
const clear = document.querySelector("#clearData")

document.querySelector("#userName").innerHTML = useName
document.querySelector("#surname").innerHTML = surname

clear.addEventListener("click",()=>{
    localStorage.clear();
})