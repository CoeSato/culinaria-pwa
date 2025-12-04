import { useState, useEffect } from 'react';
import CozinheiroContext from './CozinheiroContext';
import {
    getCozinheiroAPI, 
    getCozinehiroPorCodigoAPI,
    deleteCozinheiroPorCodigoAPI,
    cadastraCozinheiroAPI, 
} from '../../../servicos/CozinheiroServico';
import Tabela from './Tabela';
import Formulario from './Formulario'
import WithAuth from "../../../seguranca/WithAuth";

function Cozinheiro() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", descricao: "", sigla: ""
    })

    const recuperaCozinheiros = async () => {
        setListaObjetos(await getCozinheiroAPI());
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteCozinheiroPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaCozinheiros();
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraCozinheiroAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.error(err.message);
        }
        recuperaCozinheiros();
    }

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: ""
        });
		setExibirForm(true);
    }

    const editarObjeto = async codigo => {
        setObjeto(await getCozinehiroPorCodigoAPI(codigo))
        setEditar(true);
        setAlerta({ status: "", message: "" });
		setExibirForm(true);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperaCozinheiros();
    }, []);

    return (
        <CozinheiroContext.Provider value={
            {
                listaObjetos, alerta, remover, objeto, editarObjeto,
                acaoCadastrar, handleChange, novoObjeto, exibirForm,
                setExibirForm
            }
        }>
            <Tabela />
            <Formulario />
        </CozinheiroContext.Provider>
    );
}

export default WithAuth(Cozinheiro);