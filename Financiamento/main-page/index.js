function calcularFinanciamento() {
    const nome = document.getElementById('nome').value;
    const salario = Number(document.getElementById('salario').value);
    const valor = Number(document.getElementById('valor-financiamento').value);
    const tempo = Number(document.getElementById('tempo-meses').value);
    const taxa = Number(document.getElementById('taxa').value);
    const entrada = Number(document.getElementById('entrada').value) || 0;

    let parcelas = 0;
    const taxaConvertida = taxa / 100;
    const porcentagemSalario = salario * 0.35;
    
    let aprovacao = null; 

    if (entrada === 0 || entrada == null) {
        parcelas = (valor * ((1 + taxaConvertida) ** tempo) * taxaConvertida) / (((1 + taxaConvertida) ** tempo) - 1);
    } else {
        parcelas = ((valor - entrada) * ((1 + taxaConvertida) ** tempo) * taxaConvertida) / (((1 + taxaConvertida) ** tempo) - 1);
    }

    if (parcelas > porcentagemSalario) {
        aprovacao = 'Financiamento Reprovado';
    } else {
        aprovacao = 'Financiamento Aprovado';
    }

    const formatarMoeda = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const relatorio = `
        <h3>Relatório de Financiamento</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Salário:</strong> ${formatarMoeda(salario)}</p>
        <p><strong>Valor do Financiamento:</strong> ${formatarMoeda(valor)}</p>
        <p><strong>Tempo (meses):</strong> ${tempo}</p>
        <p><strong>Taxa de Juros (% ao mês):</strong> ${taxa.toFixed(2)}</p>
        <p><strong>Entrada:</strong> ${formatarMoeda(entrada)}</p>
        <p><strong>Valor da Parcela:</strong> ${formatarMoeda(parcelas)}</p>
        <p><strong>Status:</strong> ${aprovacao}</p>
    `;

    document.getElementById('resultado').innerHTML = relatorio;
}
