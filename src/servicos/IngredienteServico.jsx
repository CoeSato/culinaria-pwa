// IngredienteServiceAPI.js

// Função auxiliar para tratamento de erro (reutilizada do serviço Cozinheiro)
const handleResponse = async (response) => {
    if (!response.ok) {
        // Se o status for 4xx ou 5xx, tenta extrair a mensagem de erro do corpo JSON
        const errorData = await response.json();
        // Lança um erro que será capturado pelo bloco 'catch' no Context
        throw new Error(errorData.message || 'Erro desconhecido ao comunicar com a API');
    }
    // Se a resposta for OK (2xx), retorna o corpo JSON
    return response.json();
}

export const getIngredienteAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/ingredientes`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    // O seu código original já estava correto aqui, mas usando a função unifica o tratamento.
    return handleResponse(response);
}

export const getIngredientePorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/ingredientes/${codigo}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    // 🛑 CORRIGIDO: Adicionando tratamento de erro HTTP
    return handleResponse(response);
}

export const deleteIngredientePorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/ingredientes/${codigo}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
    // 🛑 CORRIGIDO: Adicionando tratamento de erro HTTP
    return handleResponse(response);
}

export const cadastraIngredienteAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/ingredientes`, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    })
    // 🛑 CORRIGIDO: Adicionando tratamento de erro HTTP
    return handleResponse(response);
}