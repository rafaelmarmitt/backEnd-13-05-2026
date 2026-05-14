const card9 = document.getElementById('card9')
const card10 = document.getElementById('card10')
const card11 = document.getElementById('card11')
const card12 = document.getElementById('card12')
const card13 = document.getElementById('card13')
const card14 = document.getElementById('card14')
const card15 = document.getElementById('card15')
const card16 = document.getElementById('card16')

let viradas = 0
// Função de virar
function virarParaFrente9() {
    if (viradas >= 2) {
        alert('Já tem duas cartas viradas');
    } else {
        card9.innerHTML('<button onclick = "virarParaFrente9()" id ="card9" class="col bg-secundary m-2 rounded-3 z-0">❔</button>'
        )
        let viradas = viradas + 1
    }
}


// Pensei em fazer o sistema usando o z-index do html para 'virar' as cartas, ao clicar puzaria a função que altera o z-index do elemento e faz o verso aparecer,
// mas não consegui fazer como eu queria.