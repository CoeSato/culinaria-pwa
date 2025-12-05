// ReceitaServiceAPI.js

// Função auxiliar para tratamento de erro (garante que a exceção seja lançada em status 4xx/5xx)
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

export const getReceitaAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/receitas`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    // O seu código original já estava correto aqui, usando a função unifica o tratamento.
    return handleResponse(response);
}

export const getReceitaPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/receitas/${codigo}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    // 🛑 CORRIGIDO: Adicionando tratamento de erro HTTP
    return handleResponse(response);
}

export const deleteReceitaPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/receitas/${codigo}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
    // 🛑 CORRIGIDO: Adicionando tratamento de erro HTTP
    return handleResponse(response);
}

export const cadastraReceitaAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/receitas`, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    })
    // 🛑 CORRIGIDO: Adicionando tratamento de erro HTTP
    return handleResponse(response);
}