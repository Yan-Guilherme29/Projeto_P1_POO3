const btnSalvarFilme = document.getElementById("btnSalvarFilme");

if (btnSalvarFilme) {
    btnSalvarFilme.addEventListener("click", function () {

        const titulo = document.getElementById("titulo").value;
        const genero = document.getElementById("genero").value;
        const descricao = document.getElementById("descricao").value;
        const classificacao = document.getElementById("classificacao").value;
        const duracao = Number(document.getElementById("duracao").value);
        const dataEstreia = document.getElementById("dataEstreia").value;

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

    });

}