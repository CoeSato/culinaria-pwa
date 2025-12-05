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
    
    // 🛑 CORRIGIDO: Estado inicial da entidade Ingrediente
    const [objeto, setObjeto] = useState({
        codigo: 0, 
        nome: "", 
        unidade_medida: "" // ✅ Usando a propriedade correta
    })

    const recuperaIngredientes = async () => {
        try {
            setListaObjetos(await getIngredienteAPI());
        } catch (err) {
            setAlerta({ status: 'error', message: err.message });
        }
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            try { // ⬅️ Adicionando try/catch
                let retornoAPI = await deleteIngredientePorCodigoAPI(codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            } catch (err) {
                 // 🛑 Captura o erro lançado pelo serviço de API
                 setAlerta({ status: 'error', message: err.message });
            }
            recuperaIngredientes();
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try { // ⬅️ Adicionando try/catch
            let retornoAPI = await cadastraIngredienteAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            // 🛑 Captura o erro lançado pelo serviço de API
            setAlerta({ status: 'error', message: err.message });
        }
        recuperaIngredientes();
    }

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        // 🛑 CORRIGIDO: Resetando o objeto para a forma correta
        setObjeto({
            codigo: 0,
            nome: "",
            unidade_medida: ""
        });
        setExibirForm(true);
    }

    const editarObjeto = async codigo => {
        try { // ⬅️ Adicionando try/catch
            setObjeto(await getIngredientePorCodigoAPI(codigo))
            setEditar(true);
            setAlerta({ status: "", message: "" });
            setExibirForm(true);
        } catch (err) {
             // 🛑 Captura o erro lançado pelo serviço de API
             setAlerta({ status: 'error', message: err.message });
        }
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