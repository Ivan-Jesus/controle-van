// faz a div de msg de erro ir sumindo aos poucos

$(document).ready(function () {
    $(".ocultar").fadeTo(5500, 1).slideUp(600, function () {
        $(this).remove();
    });
});

//$('input[type="search"]').attr('autocomplete', 'fake-name-disable-autofill');

setTimeout(function () {
    $('#myTable_filter .form-control').val("l");
    $('#myTable_filter .form-control').focus(function () {
        $('#myTable_filter .form-control').val("");
    });
}, 200);


// navegar pelos input com enter
function tabenter(event, campo) {

    var tecla = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    var click = event.type;
    if (tecla === 13) {
        campo.focus();
    } else if (click === "click") {
        var delay = 600;
        setTimeout(function () {
            campo.focus();
        }, delay);
    }
}

//envio de dados de modal para dar entrada em produtos
function enviarEstoque() {
    var id = $('#id').val();
    var dtCompra = $('#dtCompra').val();
    var vlrCompra = $('#vlrCompra').val();
    var vlrVenda = $('#vlrVenda').val();
    var qtde = $('#qtde').val();
    var corrigirEst = $('#corrigirEst').prop('checked');
    var msg = 'Tem certeza que quer corrigir o estoque?';
    if ((dtCompra !== "" || vlrCompra > 0 || qtde > 0 || vlrVenda > 0) || corrigirEst) {
        if (corrigirEst) {
            if (!window.confirm(msg)) {
                return;
            }
        }
        $.ajax({
            url: 'AlterarItem',
            type: 'post',
            data: {id: id, dtCompra: dtCompra, vlrCompra: vlrCompra,
                vlrVenda: vlrVenda, qtde: qtde, corrigirEst: corrigirEst, operacao: 'Alterar'
            },
            beforeSend: function () {
                $("#resultado").html("ENVIANDO...");
            },
            success: function (r) {
                $('#modalQtdeItem').trigger('click');
                dtCompra = $('#dtCompra').val("");
                vlrCompra = $('#vlrCompra').val("");
                vlrVenda = $('#vlrVenda').val("");
                qtde = $('#qtde').val("");
                $('#corrigirEst').prop('checked', false);
                sessionStorage.removeItem("arrayLinha");                
                criarMsg(r);
                setTimeout(function () {
                    window.location.reload();

                }, 4500);
            }
        }).fail(function (jqXHR, textStatus, msg) {
            criarMsg(jqXHR.responseText);
            dtCompra = $('#dtCompra').val("");
            vlrCompra = $('#vlrCompra').val("");
            vlrVenda = $('#vlrVenda').val("");
            qtde = $('#qtde').val("");
            $('#corrigirEst').prop('checked', false);
        });
    } else {
        if (!corrigirEst) {
            
            criarMsg('Preencha informa&ccedil&otildees de compra ou venda!');
        }

    }
}
//alterar senha do usuário na modal  em banco 
function enviarSenhaUsu(id) {
    var senha = $('#senha-atual').val();
    var novaSenha = $('#nova-senha').val();
    var repNovaSenha = $('#rep-nova-senha').val();
    $.ajax({
        url: 'AlterarUsuario',
        type: 'post',
        data: {id: id, senha: senha, novaSenha: novaSenha,
            repNovaSenha: repNovaSenha, operacao: 'Alterar'
        },
        beforeSend: function () {
            $("#resultado").html("ENVIANDO...");
        },
        success: function (r) {
            $('#fecharModal').trigger('click');
            setTimeout(function () {
                criarMsg(r);
            }, 400);
            $('#senha-atual').val("");
            $('#nova-senha').val("");
            $('#rep-nova-senha').val("");
        }
    }).fail(function (jqXHR, textStatus, msg) {
        criarMsg(jqXHR.responseText);

        $('#senha-atual').val("");
        $('#nova-senha').val("");
        $('#rep-nova-senha').val("");
    });
}
// enviar o forme do modal controle_estoque para funcionar o tabenter
function enviarForm() {
    $('#formModal').submit();
}

//id e foto do item e carrega no modal para ampliá-la
function enviarFoto(foto, id) {
    $('#foto').attr("src", foto);
    $('#tituloModalFoto').empty();
    $('#tituloModalFoto').append("Foto do Item " + id);
}
//pega id do item e coloca no modal
function enviarId(id) {
    $('#id').val(id);
}
// inativar objetos 
function carregarIdVen(id) { // venda
    let href;
    let url = $("#path").val();
    href = url + "/autenticado/ExcluirVenda?id_ven=" + id + "&operacao=Excluir";
    $('#btnExcluirVenda').prop('href', href);
}

function carregarIdCli(id) {
    let href;
    let url = $("#path").val();
   
    href = url + "/autenticado/ExcluirCliente?id_cli=" + id + "&operacao=Excluir";
    $('#btnExcluirCli').prop('href', href);
   
}

function carregarIdForn(id) {
    let href;
    let url = $("#path").val();
    href = url + "/autenticado/ExcluirFornecedor?id_forn=" + id + "&operacao=Excluir";
    $('#btnExcluirForn').prop('href', href);
}

function carregarIdItem(id) {
    let href;
    let url = $("#path").val();
    href = url + "/autenticado/ExcluirItem?id_item=" + id + "&operacao=Excluir";
    $('#btnExcluirItem').prop('href', href);
} 


//exclue em banco o nome escolhido na modal
function excluirLinha() {
    var nome = $('#linha :selected').text();
    var id = $('#linha :selected').val();
    var msg = 'Tem certeza que deseja excluir a Linha ' + nome + '?';
    
    if (id === "" || id === 0)
        return;
    if (!window.confirm(msg)) {
        return;
    }
    $.ajax({
        url: 'ExcluirLinha',
        type: 'get',
        data: {id: id, operacao: 'Excluir'
        },
        beforeSend: function () {
            $("#resultado").html("ENVIANDO...");
        },
        success: function (r) {
            window.location.reload();
        }
    }).fail(function (jqXHR, textStatus, msg) {
        alert(jqXHR.responseText);

    });
}

//exclue em banco o nome escolhido na modal
function excluirModelo() {
    var nome = $('#modelo :selected').text();
    var id = $('#modelo :selected').val();
    var msg = 'Tem certeza que deseja excluir o Modelo ' + nome + '?';
    
    if (id === "" || id === 0)
        return;
    if (!window.confirm(msg)) {
        return;
    }
    $.ajax({
        url: 'ExcluirModelo',
        type: 'get',
        data: {id: id, operacao: 'Excluir'
        },
        beforeSend: function () {
            $("#resultado").html("ENVIANDO...");
        },
        success: function (r) {
            window.location.reload();
        }
    }).fail(function (jqXHR, textStatus, msg) {
        alert(jqXHR.responseText);
    });
}
//exclue em banco o nome escolhido na modal
function excluirCor() {
    var nome = $('#cor :selected').text();
    var id = $('#cor :selected').val();
    var msg = 'Tem certeza que deseja excluir a Cor ' + nome + '?';
   
    if (id === "" || id === 0)
        return;
    if (!window.confirm(msg)) {
        return;
    }
    $.ajax({
        url: 'ExcluirCor',
        type: 'get',
        data: {id: id, operacao: 'Excluir'
        },
        beforeSend: function () {
            $("#resultado").html("ENVIANDO...");
        },
        success: function (r) {
            window.location.reload();
        }
    }).fail(function (jqXHR, textStatus, msg) {
        alert(jqXHR.responseText);
    });
}



//ativa modal e troca o titulo para carregar listagens select
function linhaModal() {
    document.getElementById("TituloModal").innerHTML = "Linha";
    $("#btnModal").attr("onclick", "salvarLinha()");
    $("#nome").val("");
}

function modeloModal() {
    document.getElementById("TituloModal").innerHTML = "Modelo";
    $("#nome").val("");
    $("#btnModal").attr("onclick", "salvarModelo()");
}

function corModal() {
    document.getElementById("TituloModal").innerHTML = "Cor";
    $("#nome").val("");
    $("#btnModal").attr("onclick", "salvarCor()");
}
//salva em banco o texto digitado na modal
function salvarLinha() {
    var nome = document.getElementById("nome").value;
    if (nome !== "") {
        $.ajax({
            url: 'SalvarLinha',
            type: 'get',
            data: {nome: nome, operacao: 'Salvar'
            },
            beforeSend: function () {
                $("#resultado").html("ENVIANDO...");
            },
            success: function (r) {
                $('#linha').empty();
                $('#linha').append(r);
                $('.close').trigger('click');
            }
        }).fail(function (jqXHR, textStatus, msg) {
            alert(jqXHR.responseText);
            $("#nome").focus();
        });
    } else {
        $("#nome").focus();
    }
}

function salvarModelo() {
    var nome = document.getElementById("nome").value;
    if (nome !== "") {
        $.ajax({
            url: 'SalvarModelo',
            type: 'get',
            data: {nome: nome, operacao: 'Salvar'
            },
            beforeSend: function () {
                $("#resultado").html("ENVIANDO...");
            },
            success: function (r) {
                $('#modelo').empty();
                $('#modelo').append(r);
                $('.close').trigger('click');
            }
        }).fail(function (jqXHR, textStatus, msg) {
            alert(jqXHR.responseText);
            $("#nome").focus();
        });
    } else {
        $("#nome").focus();
    }
}

function salvarCor() {
    if (nome !== "") {
        var nome = document.getElementById("nome").value;
        $.ajax({
            url: 'SalvarCor',
            type: 'get',
            data: {nome: nome, operacao: 'Salvar'
            },
            beforeSend: function () {
                $("#resultado").html("ENVIANDO...");
            },
            success: function (r) {
                $('#cor').empty();
                $('#cor').append(r);
                $('.close').trigger('click');
            }
        }).fail(function (jqXHR, textStatus, msg) {
            alert(jqXHR.responseText);
            $("#nome").focus();
        });
    } else {
        $("#nome").focus();
    }
}

//Essa função será executada quando o botão 'Pesquisar' for pressionado.
function consultarDadosPeloCEP() {
    var xhttp = new XMLHttpRequest();
    // Esta função será executada quando a requisição assíncrona (AJAX)
    // finalizar.
    xhttp.onreadystatechange = function () {
        // O estado 4 indica que a requisição já terminou.
        if (this.readyState == 4) {
            // Status HTTP 200 = OK! Deu certo.
            if (this.status == 200) {
                var resposta = this.responseText;
                var objetoResposta = JSON.parse(resposta);
               
                document.getElementById("estado").value = objetoResposta.uf;
                document.getElementById("cidade").value = objetoResposta.cidade;
                document.getElementById("bairro").value = objetoResposta.bairro;
                document.getElementById("logradouro").value = objetoResposta.logradouro;
            }
            // Esconde o ícone 'carregando'.
            //document.getElementById("carregando").style.display = "none";
        }
    }
    var conteudoCEP = document.getElementById("cep").value;
    // Envia uma requisição assíncrona (AJAX) para um webservice de ceps.
    xhttp.open("GET", "http://cep.republicavirtual.com.br/web_cep.php?cep=" + conteudoCEP + "&formato=json", true);
    xhttp.send();
    // Exibe o ícone 'carregando'.
   // document.getElementById("carregando").style.display = "inline-table";
}

function limita(numero) {
    var max_numeros = 3;
    if (numero.value.length > max_numeros) {
        numero.value = numero.value.substr(0, max_numeros);      
    }
}
function criarMsg(spanMsg) {
    $(".ocultar").remove();

    var msg = "<div class='alert ocultar  text-center ";
    msg += "container-fluid alert-warning alert-dismissible ";
    msg += "position-fixed fade show' style='z-index:1060' role='alert'> ";
    msg += "<span>" + spanMsg + "</span></div>";

    $('body').prepend(msg);
    $(".ocultar").fadeTo(4000, 1).slideUp(600, function () {
        $(this).remove();
    });

}