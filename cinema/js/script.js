/* 
======================== FILMES ========================
*/

const btnSalvarFilme = document.getElementById("btnSalvarFilme");

if (btnSalvarFilme) {
    btnSalvarFilme.addEventListener("click", function () {

        const titulo = document.getElementById("titulo").value.trim();
        const genero = document.getElementById("genero").value.trim();
        const descricao = document.getElementById("descricao").value.trim();
        const classificacao = document.getElementById("classificacao").value;
        const duracao = Number(document.getElementById("duracao").value);
        const dataEstreia = document.getElementById("dataEstreia").value;

        if (!titulo || !genero || !descricao || !classificacao || duracao <= 0 || !dataEstreia) {

            const mensagem = document.getElementById("mensagem")

            mensagem.innerHTML = `
            <div class="alert alert-danger mt-3">
                Preencha todos os campos!
            </div>
            `

            // Apaga mensagem de Filme cadastrado após 3 segundos
            setTimeout(() => {
                mensagem.innerHTML = "";
            }, 3000);

            return;
        }

        // Objeto Filme
        const filme = {
            titulo,
            genero,
            descricao,
            classificacao,
            duracao,
            dataEstreia
        };

        let filmes = JSON.parse(localStorage.getItem("filmes")) || [];

        filmes.push(filme)

        localStorage.setItem("filmes", JSON.stringify(filmes))

        document.getElementById("titulo").value = "";
        document.getElementById("genero").value = "";
        document.getElementById("descricao").value = "";
        document.getElementById("classificacao").selectedIndex = 0;
        document.getElementById("duracao").value = "";
        document.getElementById("dataEstreia").value = "";


        mensagem.innerHTML = `
            <div class="alert alert-success mt-3">
                Filme cadastrado com sucesso! 🎬
            </div>
        `

        setTimeout(() => {
            mensagem.innerHTML = "";
        }, 3000);
    });
}

/* 
======================== SESSÕES ========================
*/

const selectFilme = document.getElementById("filme");

if (selectFilme) {

    let filmes = JSON.parse(localStorage.getItem("filmes")) || [];

    filmes.forEach(function (filme, index) {

        const option = document.createElement("option");

        option.value = index;
        option.textContent = filme.titulo;

        selectFilme.appendChild(option);
    });
}