import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import IngredienteContext from './IngredienteContext';
import Col from 'react-bootstrap/Col';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';


function Formulario() {

    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm } = useContext(IngredienteContext);

    return (
        // ✅ CORRIGIDO: Título do Diálogo
        <Dialogo id="modalEdicao" titulo="Ingrediente" 
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
            {/* 🛑 CORRIGIDO: Adicionando o campo 'unidade_medida' que estava faltando */}
            <Col xs={12} md={12}>
                <CampoEntrada value={objeto ? objeto.unidade_medida : ''}
                    id="txtUnidadeMedida" name="unidade_medida" label="Unidade de Medida"
                    tipo="text" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe a unidade de medida (ex: kg, g, ml, unid)"
                    requerido={true} readonly={false}
                    maxCaracteres={10} /> 
            </Col>
        </Dialogo>
    )
}

export default Formulario;