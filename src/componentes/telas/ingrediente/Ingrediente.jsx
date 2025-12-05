import { useState, useEffect } from 'react';
import IngredienteContext from './IngredienteContext';
import {
    getIngredienteAPI, 
    getIngredientePorCodigoAPI,
    deleteIngredientePorCodigoAPI,
    cadastraIngredienteAPI, 
} from '../../../servicos/IngredienteServico';
import Tabela from './Tabela';
import Formulario from './Formulario'
import WithAuth from "../../../seguranca/WithAuth";

function Ingrediente() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", descricao: "", sigla: ""
    })

    const recuperaIngredientes = async () => {
        setListaObjetos(await getIngredienteAPI());
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteIngredientePorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaIngredientes();
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraIngredienteAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.error(err.message);
        }
        recuperaIngredientes();
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
        setObjeto(await getIngredientePorCodigoAPI(codigo))
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
        recuperaIngredientes();
    }, []);

    return (
        <IngredienteContext.Provider value={
            {
                listaObjetos, alerta, remover, objeto, editarObjeto,
                acaoCadastrar, handleChange, novoObjeto, exibirForm,
                setExibirForm
            }
        }>
            <Tabela />
            <Formulario />
        </IngredienteContext.Provider>
    );
}

export default WithAuth(Ingrediente);