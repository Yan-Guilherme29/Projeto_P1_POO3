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

// Preencher select de filmes
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

// Preencher select de salas
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

// Salvar sessão
const btnSalvarSessao = document.getElementById("btnSalvarSessao");
const mensagem = document.getElementById("mensagem");

if (btnSalvarSessao) {

    btnSalvarSessao.addEventListener("click", function () {

        const filme = document.getElementById("filme").value;
        const sala = document.getElementById("sala").value;
        const dataHoraSessao = document.getElementById("dataHoraSessao").value;
        const precoIngresso = Number(document.getElementById("precoIngresso").value);
        const idioma = document.getElementById("idioma").value;
        const formato = document.getElementById("formato").value;

        // Validação
        if (
            filme === "" ||
            sala === "" ||
            !dataHoraSessao ||
            precoIngresso <= 0 ||
            !idioma ||
            !formato
        ) {
            mensagem.innerHTML = `
                <div class="alert alert-danger mt-3">
                    Preencha todos os campos!
                </div>
            `;

            setTimeout(() => {
                mensagem.innerHTML = "";
            }, 3000);

            return;
        }

        let filmes = JSON.parse(localStorage.getItem("filmes")) || [];
        let salas = JSON.parse(localStorage.getItem("salas")) || [];

        const sessao = {
            filme: filmes[filme].titulo,
            sala: salas[sala].nomeSala,
            dataHoraSessao,
            precoIngresso: precoIngresso.toFixed(2),
            idioma,
            formato
        };

        let sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];

        sessoes.push(sessao);

        localStorage.setItem("sessoes", JSON.stringify(sessoes));

        // Limpar campos
        document.getElementById("filme").selectedIndex = 0;
        document.getElementById("sala").selectedIndex = 0;
        document.getElementById("dataHoraSessao").value = "";
        document.getElementById("precoIngresso").value = "";
        document.getElementById("idioma").selectedIndex = 0;
        document.getElementById("formato").selectedIndex = 0;

        mensagem.innerHTML = `
            <div class="alert alert-success mt-3">
                Sessão cadastrada com sucesso! 🍿
            </div>
        `;

        setTimeout(() => {
            mensagem.innerHTML = "";
        }, 3000);
    });
}

/* 
======================== VENDA DE INGRESSOS ========================
*/

const selectSessao = document.getElementById("sessao");

if (selectSessao) {
    let sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];

    selectSessao.innerHTML = '<option value="" disabled selected>Selecione uma sessão</option>';

    sessoes.forEach(function (sessao, index) {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${sessao.filme} - ${sessao.sala} (${new Date(sessao.dataHoraSessao).toLocaleString()})`;
        selectSessao.appendChild(option);
    });
}

const btnSalvarIngresso = document.getElementById("btnSalvarIngresso");

if (btnSalvarIngresso) {

    btnSalvarIngresso.addEventListener("click", function () {

        const sessao = document.getElementById("sessao").value;
        const nomeCliente = document.getElementById("nomeCliente").value.trim();
        const cpf = document.getElementById("cpf").value.trim();
        const assento = document.getElementById("assento").value.trim();
        const tipoPagamento = document.getElementById("tipoPagamento").value;

        const mensagem = document.getElementById("mensagem");

        // Validação
        if (sessao === "" || !nomeCliente || !cpf || !assento || !tipoPagamento) {

            mensagem.innerHTML = `
                <div class="alert alert-danger mt-3">
                    Preencha todos os campos!
                </div>
            `;

            setTimeout(() => {
                mensagem.innerHTML = "";
            }, 3000);

            return;
        }

        // Buscar sessões
        let sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];

        // Criar objeto ingresso
        const ingresso = {
            sessao: `${sessoes[sessao].filme} - ${sessoes[sessao].sala} (${new Date(sessoes[sessao].dataHoraSessao).toLocaleString()})`,
            nomeCliente,
            cpf,
            assento,
            tipoPagamento
        };

        // Salvar no localStorage
        let ingressos = JSON.parse(localStorage.getItem("ingressos")) || [];
        ingressos.push(ingresso);
        localStorage.setItem("ingressos", JSON.stringify(ingressos));

        // Limpar campos
        document.getElementById("sessao").selectedIndex = 0;
        document.getElementById("nomeCliente").value = "";
        document.getElementById("cpf").value = "";
        document.getElementById("assento").value = "";
        document.getElementById("tipoPagamento").selectedIndex = 0;

        // Mensagem de sucesso
        mensagem.innerHTML = `
            <div class="alert alert-success mt-3">
                Ingresso vendido com sucesso! 🎟️
            </div>
        `;

        setTimeout(() => {
            mensagem.innerHTML = "";
        }, 3000);

    });

}

/* 
======================== VER SESSÕES ========================
*/

const tabela = document.getElementById("tabelaSessoes");

if (tabela) {

    let sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];

    if (sessoes.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">
                    Nenhuma sessão cadastrada
                </td>
            </tr>
        `;
    }

    sessoes.forEach(function (sessao) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${sessao.filme}</td>
            <td>${sessao.sala}</td>
            <td>${new Date(sessao.dataHoraSessao).toLocaleString()}</td>
            <td>${sessao.idioma}</td>
            <td>${sessao.formato}</td>
            <td>R$ ${sessao.precoIngresso}</td>
        `;

        tabela.appendChild(linha);
    });
}