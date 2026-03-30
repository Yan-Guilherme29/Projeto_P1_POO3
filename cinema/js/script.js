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
======================== SALAS ========================
*/

const btnSalvarSala = document.getElementById("btnSalvarSala");

if (btnSalvarSala) {

    btnSalvarSala.addEventListener("click", function () {

        const nomeSala = document.getElementById("nomeSala").value.trim();
        const capacidade = Number(document.getElementById("capacidade").value);
        const tipoSala = document.getElementById("tipoSala").value;
        const mensagem = document.getElementById("mensagem");

        if (!nomeSala || capacidade <= 0 || !tipoSala) {

            mensagem.innerHTML = `
            <div class="alert alert-danger mt-3">
                Preencha todos os campos!
            </div>
            `

            setTimeout(() => {
                mensagem.innerHTML = "";
            }, 3000);

            return;

        }

        // Objeto Sala
        const sala = {
            nomeSala,
            capacidade,
            tipoSala
        };

        let salas = JSON.parse(localStorage.getItem("salas")) || [];

        salas.push(sala);

        localStorage.setItem("salas", JSON.stringify(salas));

        document.getElementById("nomeSala").value = "";
        document.getElementById("capacidade").value = "";
        document.getElementById("tipoSala").selectedIndex = 0;

        mensagem.innerHTML = `
            <div class="alert alert-success mt-3">
                Sala cadastrada com sucesso! 🎥
            </div>
        `

        setTimeout(() => {
            mensagem.innerHTML = "";
        }, 3000);


    })

}

/* 
======================== SESSÕES ========================
*/

const selectFilme = document.getElementById("filme");

if (selectFilme) {

    let filmes = JSON.parse(localStorage.getItem("filmes")) || [];

    selectFilme.innerHTML = '<option value="" disabled selected>Selecione um filme</option>';

    filmes.forEach(function (filme, index) {

        const option = document.createElement("option");

        option.value = index;
        option.textContent = `${filme.titulo} (${filme.genero})`;

        selectFilme.appendChild(option);
    });
}

const selectSala = document.getElementById("sala");

if (selectSala) {

    let salas = JSON.parse(localStorage.getItem("salas")) || [];

    selectSala.innerHTML = '<option value="" disabled selected>Selecione uma sala</option>';

    salas.forEach(function (sala, index) {

        const option = document.createElement("option");

        option.value = index;
        option.textContent = `${sala.nomeSala} - ${sala.tipoSala} (${sala.capacidade} lugares)`;

        selectSala.appendChild(option);
    });
}

const btnSalvarSessao = document.getElementById("btnSalvarSessao");
const mensagem = document.getElementById("mensagem");

if (btnSalvarSessao) {

    btnSalvarSessao.addEventListener("click", function () {

        const filme = document.getElementById("filme").value;
        const sala = document.getElementById("sala").value;
        const dataSessao = document.getElementById("dataSessao").value;
        const horarioSessao = document.getElementById("horarioSessao").value;
        const precoIngresso = Number(document.getElementById("precoIngresso").value);

        if (filme === "" || sala === "" || !dataSessao || !horarioSessao || precoIngresso <= 0) {

            mensagem.innerHTML = `
            <div class="alert alert-danger mt-3">
                Preencha todos os campos!
            </div>
            `

            setTimeout(() => {
                mensagem.innerHTML = "";
            }, 3000);

            return;
        }

        let filmes = JSON.parse(localStorage.getItem("filmes")) || [];
        let salas = JSON.parse(localStorage.getItem("salas")) || [];

        // Objeto Sessão
        const sessao = {
            filme: filmes[filme].titulo,
            sala: salas[sala].nomeSala,
            dataSessao,
            horarioSessao,
            precoIngresso: precoIngresso.toFixed(2)
        };

        let sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];

        sessoes.push(sessao);

        localStorage.setItem("sessoes", JSON.stringify(sessoes));

        document.getElementById("filme").selectedIndex = 0;
        document.getElementById("sala").selectedIndex = 0;
        document.getElementById("dataSessao").value = "";
        document.getElementById("horarioSessao").value = "";
        document.getElementById("precoIngresso").value = "";
        

        mensagem.innerHTML = `
            <div class="alert alert-success mt-3">
                Sessão cadastrada com sucesso! 🍿
            </div>
        `

        setTimeout(() => {
            mensagem.innerHTML = "";
        }, 3000);
    })
}


