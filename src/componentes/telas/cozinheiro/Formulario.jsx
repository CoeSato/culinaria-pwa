import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import CozinheiroContext from './CozinheiroContext';
import Col from 'react-bootstrap/Col';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';


function Formulario() {

    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm } = useContext(CozinheiroContext);

    return (
        // ✅ CORRIGIDO: Título do Diálogo
        <Dialogo id="modalEdicao" titulo="Cozinheiro" 
            idform="formulario" acaoCadastrar={acaoCadastrar}
            exibirForm={exibirForm} setExibirForm={setExibirForm}>
            <Alerta alerta={alerta} />
            <Col xs={12} md={12}>
                <CampoEntrada value={objeto ? objeto.codigo : ''}
                    id="txtCodido" name="codigo" label="Código"
                    tipo="number" onchange={handleChange}
                    readonly={true}
                    maxCaracteres={5} />
            </Col>
            <Col xs={12} md={12}>
                <CampoEntrada value={objeto ? objeto.nome : ''}
                    id="txtNome" name="nome" label="Nome"
                    tipo="text" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe o nome"
                    requerido={true} readonly={false}
                    maxCaracteres={40} />
            </Col>
            {/* 🛑 CORRIGIDO: Adicionando o campo 'descricao' que estava faltando */}
            <Col xs={12} md={12}>
                <CampoEntrada value={objeto ? objeto.descricao : ''}
                    id="txtDescricao" name="descricao" label="Descrição"
                    // Usando 'text'. Se houver um 'textarea' ou 'CampoTextArea', seria melhor.
                    tipo="text" onchange={handleChange} 
                    msgvalido="Descrição OK" msginvalido="Informe a descrição"
                    requerido={true} readonly={false}
                    maxCaracteres={255} /> {/* Ajuste maxCaracteres conforme o backend */}
            </Col>
        </Dialogo>
    )
}

export default Formulario;