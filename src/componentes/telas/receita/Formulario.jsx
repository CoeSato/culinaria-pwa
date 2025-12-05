import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import ReceitaContext from './ReceitaContext';
import Col from 'react-bootstrap/Col';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import CampoSelect from '../../comuns/CampoSelect';


function Formulario() {

    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm, listaChefes, listaIngredientes } = useContext(ReceitaContext);

    return (
        <Dialogo id="modalEdicao" titulo="Receita"
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
            <Col xs={12} md={12}>
                <CampoEntrada value={objeto ? objeto.nome : ''}
                    id="txtModo" name="modo" label="Modo"
                    tipo="text" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe o modo de preparo"
                    requerido={true} readonly={false}/>
            </Col>
            <Col xs={12} md={12}>
                <CampoEntrada value={objeto ? objeto.nome : ''}
                    id="txtTempo" name="tempo" label="Tempo"
                    tipo="number" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe o tempo de preparo"
                    requerido={true} readonly={false}/>
            </Col>
            <Col xs={12} md={12}>
                <CampoEntrada value={objeto ? objeto.nome : ''}
                    id="txtNota" name="nota" label="Nota"
                    tipo="number" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe a nota"
                    requerido={true} readonly={false}/>
            </Col>
            <Col xs={12} md={12}>
                <CampoEntrada value={objeto ? objeto.nome : ''}
                    id="txtDataCadastro" name="data" label="Data"
                    tipo="date" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe a data"
                    requerido={true} readonly={false}/>
            </Col>
            <Col xs={12} md={12}>
                <CampoEntrada value={objeto ? objeto.nome : ''}
                    id="txtDataCadastro" name="data" label="Data"
                    tipo="numbdateer" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe a data"
                    requerido={true} readonly={false}/>
            </Col>
            <Col xs={12} md={12}>
                <CampoEntrada value={objeto ? objeto.nome : ''}
                    id="txtDataCadastro" name="data" label="Data"
                    tipo="numbdateer" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe a data"
                    requerido={true} readonly={false}/>
            </Col>
            <Col xs={12} md={12}>
                <CampoSelect value={objeto.categoria}
                    id="textChefe" name="chefe" label="Chefe"
                    onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe o chefe"
                    requerido={true}>
                    {listaChefes.map((cat) => (
                        <option key={cat.codigo} value={cat.codigo}>
                            {cat.nome}
                        </option>
                    ))}
                </CampoSelect>
            </Col>
            <Col xs={12} md={12}>
                <CampoSelect 
                    value={objeto ? objeto.ingredientes || [] : []}
                    id="selectIngredientes" 
                    name="ingredientes"
                    label="Ingredientes"
                    onchange={handleChange}
                    multiple={true}
                    msgvalido="OK" 
                    msginvalido="Selecione ao menos um ingrediente"
                    requerido={true}>            
                    <option value="">(Selecione um ou mais ingredientes)</option> 
                    {listaIngredientes.map((ingrediente) => (
                        <option key={ingrediente.codigo} value={ingrediente.codigo}>
                            {ingrediente.nome}
                        </option>
                    ))}
                </CampoSelect>
            </Col>
        </Dialogo>
    )
}

export default Formulario;