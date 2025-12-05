import { useState, useEffect } from 'react';
import ReceitaContext from './ReceitaContext';
import {
    getReceitaAPI, 
    getReceitaPorCodigoAPI,
    deleteReceitaPorCodigoAPI,
    cadastraReceitaAPI, 
} from '../../../servicos/ReceitaServico';
import Tabela from './Tabela';
import Formulario from './Formulario'
import WithAuth from "../../../seguranca/WithAuth";

function Receita() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", descricao: "", sigla: ""
    })

    const recuperaReceitas = async () => {
        setListaObjetos(await getReceitaAPI());
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteReceitaPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaReceitas();
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraReceitaAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.error(err.message);
        }
        recuperaReceitas();
    }

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: "",
            modo: "",
            tempo: 0,
            nota: 0,
            data: "",
            ingredientes: [], // Inicialize como um array vazio
            chefe: 0, // Apenas um valor
        });
		setExibirForm(true);
    }

    const editarObjeto = async codigo => {
        setObjeto(await getReceitaPorCodigoAPI(codigo))
        setEditar(true);
        setAlerta({ status: "", message: "" });
		setExibirForm(true);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        let value;

        if (e.target.type === 'select-multiple') {
            // Se for um select de múltipla escolha:
            value = Array.from(e.target.selectedOptions, option => option.value);
        } else {
            // Para todos os outros campos (text, number, date, select simples):
            value = e.target.value;
        }

        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperaReceitas();
    }, []);

    return (
        <ReceitaContext.Provider value={
            {
                listaObjetos, alerta, remover, objeto, editarObjeto,
                acaoCadastrar, handleChange, novoObjeto, exibirForm,
                setExibirForm
            }
        }>
            <Tabela />
            <Formulario />
        </ReceitaContext.Provider>
    );
}

export default WithAuth(Receita);