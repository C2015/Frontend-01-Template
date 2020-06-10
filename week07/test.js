const list = document.querySelector("#container").children

for(let i = 0; i< list.length;i++){
    console.log(list[i].children[1].innerText)
}