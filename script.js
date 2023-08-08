// 1. Pegar os valores
// 2. Calcular a Idade
//       a. Com base no ano
//       b. Com mês (EXTRA)
//       c. Com dia (EXTRA)

// 3. Gerar a faixa etária

//     Resultado            Faixa
//     0 à 12                Criança
//     13 à 17                Adolescente
//     18 à 65               Adulto
//     Acima de 65         Idoso


// 4. Organizar o objeto pessoa para salvar na lista
// 5. Cadastrar a pessoa na lista
// 6. Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página
// 7. Renderizar o conteúdo da tabela com as pessoas cadastradas
// 8. Botão para limpar os registros;

function calcularIdade(event) {
    event.preventDefault();
    let dadosUsuario = pegarValores();
    let idade = calcular(dadosUsuario.ano)
    console.log(idade);
    let classificacaoIdade = classificarIdade(idade);
    let usuarioAtualizado = organizarDados(dadosUsuario, idade, classificacaoIdade);
    cadastrarUsuario(usuarioAtualizado);
}

function pegarValores() {
    let nome = document.getElementById("nome").value.trim();
    let mesNascimento = document.getElementById("mes-nascimento").value.trim();
    let diaNascimento = document.getElementById("dia-nascimento").value.trim();
    let anoNascimento = document.getElementById("ano-nascimento").value;

    let dadosUsuario = {
        nome: nome,
        ano: anoNascimento,
        mes: mesNascimento,
        dia: diaNascimento
    }

    console.log(dadosUsuario);

    return dadosUsuario;
}

function calcular(ano) {
    let anoAtual = new Date().getFullYear();
    let idade = anoAtual - ano

    return idade;
}

function classificarIdade(anoNascimento) {
    if (idade < 12) {
        return "Criança"
    } else if (idade < 17) {
        return "Adolescente"
    } else if (idade < 65) {
        return "Adulto"
    } else if (idade > 65) {
        return "Idoso"
    }
}

function organizarDados(dadosUsuario, valorIdade, classificacaoIdade) {
    let dataHoraAtual = Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now());

    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        idade: valorIdade,
        classificacao: classificacaoIdade,
        dataCadastro: dataHoraAtual
    }

    console.log(dadosUsuarioAtualizado);

    return dadosUsuarioAtualizado;
}

function cadastrarUsuario(usuario) {
    let listaUsuarios = [];

    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    listaUsuarios.push(usuario)

    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
}

function carregarUsuarios() {
    let listaUsuarios = [];

    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }
    if (listaUsuarios.length == 0) {
        let tabela = document.getElementById("corpo-tabela");
        tabela.innerHTML = `<tr class="linha-mensagem">
        <td colspan="6">Nenhum usuario cadastrado!</td>
    </tr>`
    }else{
        montarTabela(listaUsuarioss);
    }
}