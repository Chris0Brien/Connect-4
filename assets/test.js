let select = document.getElementById('modes');
let pvpm = document.getElementById('pvp-mode');
let pvaim = document.getElementById('pvai-mode');

window.onload = function(){
    document.getElementById("pvp-mode").style.visibility = "hidden";
    document.getElementById("pvai-mode").style.visibility = "hidden";
    }

document.getElementById('play').addEventListener('click', (event) => {
    event.preventDefault()
    let option = select.options[select.selectedIndex];
    option.value === "pvp" ? pvpm.style.visibility = 'visible' : pvaim.style.visibility = 'visible'; // ternary: example
})