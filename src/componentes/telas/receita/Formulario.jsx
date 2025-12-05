import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import ReceitaContext from './ReceitaContext';
import Col from 'react-bootstrap/Col';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import CampoSelect from '../../comuns/CampoSelect';


function Formulario() {

    // ListaChefes e listaIngredientes são necessários para preencher os selects
    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm, listaChefes, listaIngredientes } = useContext(ReceitaContext);

    return (
        <Dialogo id="modalEdicao" titulo="Receita"
            idform="formulario" acaoCadastrar={acaoCadastrar}
            exibirForm={exibirForm} setExibirForm={setExibirForm}>
            <Alerta alerta={alerta} />
            <Col xs={12} md={12}>
                <CampoEntrada value={objeto.codigo} // 0 é falsy, então verificamos direto o objeto
                    id="txtCodido" name="codigo" label="Código"
                    tipo="number" onchange={handleChange}
                    readonly={true}
                    maxCaracteres={5} />
            </Col>
            <Col xs={12} md={12}>
                <CampoEntrada value={objeto.nome}
                    id="txtNome" name="nome" label="Nome"
                    tipo="text" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe o nome"
                    requerido={true} readonly={false}
                    maxCaracteres={40} />
            </Col>
            <Col xs={12} md={12}>
                <CampoEntrada value={objeto.modo} // 🛑 CORRIGIDO: Deve ser objeto.modo
                    id="txtModo" name="modo" label="Modo de Preparo"
                    tipo="text" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe o modo de preparo"
                    requerido={true} readonly={false}/>
            </Col>
            <Col xs={12} md={12}>
                <CampoEntrada value={objeto.tempo} // 🛑 CORRIGIDO: Deve ser objeto.tempo
                    id="txtTempo" name="tempo" label="Tempo (minutos)"
                    tipo="number" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe o tempo de preparo"
                    requerido={true} readonly={false}/>
            </Col>
            <Col xs={12} md={12}>
                <CampoEntrada value={objeto.nota} // 🛑 CORRIGIDO: Deve ser objeto.nota
                    id="txtNota" name="nota" label="Nota (0-10)"
                    tipo="number" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe a nota"
                    requerido={true} readonly={false}
                    max={10} min={0}/>
            </Col>
            <Col xs={12} md={12}>
                <CampoEntrada value={objeto.data} // 🛑 CORRIGIDO: Deve ser objeto.data
                    id="txtDataCadastro" name="data" label="Data de Criação"
                    tipo="date" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe a data"
                    requerido={true} readonly={false}/>
            </Col>
            {/* REMOVIDO: Campos repetidos que estavam aqui */}
            
            <Col xs={12} md={12}>
                <CampoSelect value={objeto.chefe} // 🛑 CORRIGIDO: Deve ser objeto.chefe
                    id="selectChefe" name="chefe" label="Chefe"
                    onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe o chefe"
                    requerido={true}>
                    <option value={0}> (Selecione um chefe) </option>
                    {listaChefes.map((cat) => (
                        <option key={cat.codigo} value={cat.codigo}>
                            {cat.nome}
                        </option>
                    ))}
                </CampoSelect>
            </Col>
            <Col xs={12} md={12}>
                <CampoSelect 
                    // Garante que o valor é um array (necessário para multiple)
                    value={objeto.ingredientes || []} 
                    id="selectIngredientes" 
                    name="ingredientes"
                    label="Ingredientes"
                    onchange={handleChange}
                    multiple={true} // Necessário para múltipla seleção
                    msgvalido="OK" 
                    msginvalido="Selecione ao menos um ingrediente"
                    requerido={true}>            
                    {/* Não é necessário um option vazio se o select é multiple e requerido */}
                    {listaIngredientes.map((ingrediente) => (
                        <option key={ingrediente.codigo} value={ingrediente.codigo}>
                            {ingrediente.nome} ({ingrediente.unidade_medida})
                        </option>
                    ))}
                </CampoSelect>
            </Col>
        </Dialogo>
    )
}

export default Formulario;