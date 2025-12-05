export const getIngredienteAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/ingredientes`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    if (!response.ok) {
        // Se o status for 4xx ou 5xx, lança um erro com a mensagem da API
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao comunicar com a API');
    }
    const data = await response.json()
    return data;
}

export const getIngredientePorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/ingredientes/${codigo}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const deleteIngredientePorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/ingredientes/${codigo}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const cadastraIngredienteAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/ingredientes`, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    })
    const data = await response.json();
    return data;
}