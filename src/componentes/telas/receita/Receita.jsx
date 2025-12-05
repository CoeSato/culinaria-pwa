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
    
    // 🛑 CORRIGIDO: Estado inicial completo e correto para a entidade Receita
    const [objeto, setObjeto] = useState({
        codigo: 0, 
        nome: "", 
        modo: "",
        tempo: 0,
        nota: 0,
        data: "",
        ingredientes: [], 
        chefe: 0, 
    })

    const recuperaReceitas = async () => {
        try { // ⬅️ Adicionando try/catch para a função de listagem
            setListaObjetos(await getReceitaAPI());
        } catch (err) {
            setAlerta({ status: 'error', message: err.message });
        }
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            try { // ⬅️ Adicionando try/catch
                let retornoAPI = await deleteReceitaPorCodigoAPI(codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            } catch (err) {
                 // 🛑 Captura o erro lançado pelo serviço de API
                 setAlerta({ status: 'error', message: err.message });
            }
            recuperaReceitas();
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try { // O try já existia, mas o catch precisa atualizar o alerta
            let retornoAPI = await cadastraReceitaAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            // 🛑 Captura o erro lançado pelo serviço de API
            setAlerta({ status: 'error', message: err.message });
        }
        recuperaReceitas();
    }

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        // 🛑 CORRIGIDO: Resetando o objeto para a forma correta
        setObjeto({
            codigo: 0,
            nome: "",
            modo: "",
            tempo: 0,
            nota: 0,
            data: "",
            ingredientes: [], 
            chefe: 0, 
        });
        setExibirForm(true);
    }

    const editarObjeto = async codigo => {
        try { // ⬅️ Adicionando try/catch
            setObjeto(await getReceitaPorCodigoAPI(codigo))
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
        let value;

        if (e.target.type === 'select-multiple') {
            // Se for um select de múltipla escolha:
            value = Array.from(e.target.selectedOptions, option => option.value);
        } else {
            // Para todos os outros campos (text, number, date, select simples):
            value = e.target.value;
        }
        
        // Se o campo for 'chefe' (select) ou 'codigo'/'tempo'/'nota' (number), converte para número
        if (name === 'chefe' || name === 'codigo' || name === 'tempo' || name === 'nota') {
             value = parseInt(value) || 0; // Tenta converter para inteiro, senão 0
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