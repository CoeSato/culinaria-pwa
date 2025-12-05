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
    
    // 🛑 CORRIGIDO: Estado inicial completo da entidade Cozinheiro
    const [objeto, setObjeto] = useState({
        codigo: 0, 
        nome: "", 
        descricao: ""
    })

    const recuperaCozinheiros = async () => {
        try {
            setListaObjetos(await getCozinheiroAPI());
        } catch (err) {
             setAlerta({ status: 'error', message: err.message });
        }
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteCozinheiroPorCodigoAPI(codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            } catch (err) {
                 // 🛑 Tratamento de erro do throw da API
                 setAlerta({ status: 'error', message: err.message });
            }
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
            // 🛑 Tratamento de erro do throw da API
            setAlerta({ status: 'error', message: err.message });
        }
        recuperaCozinheiros();
    }

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        // 🛑 CORRIGIDO: Resetando o objeto para a forma correta
        setObjeto({
            codigo: 0,
            nome: "",
            descricao: ""
        });
        setExibirForm(true);
    }

    const editarObjeto = async codigo => {
        try {
            // ✅ Melhoria: Lida com erro se o código não for encontrado (404)
            setObjeto(await getCozinehiroPorCodigoAPI(codigo));
            setEditar(true);
            setAlerta({ status: "", message: "" });
            setExibirForm(true);
        } catch (err) {
            setAlerta({ status: 'error', message: err.message });
        }
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