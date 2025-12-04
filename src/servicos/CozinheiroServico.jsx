export const getCozinheiroAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cozinheiros`,
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

export const getCozinehiroPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cozinheiros/${codigo}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const deleteCozinheiroPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cozinheiros/${codigo}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const cadastraCozinheiroAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cozinheiros`, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    })
    const data = await response.json();
    return data;
}