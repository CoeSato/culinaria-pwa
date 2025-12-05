import { useContext } from 'react'
import IngredienteContext from './IngredienteContext';
import Alerta from '../../comuns/Alerta';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

function Tabela() {

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(IngredienteContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Ingredientes</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary" onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Button>
            {/* ✅ CORRIGIDO: Concordância de gênero */}
            {listaObjetos.length === 0 && <h1>Nenhum ingrediente encontrado</h1>} 
            
            {listaObjetos.length > 0 && (

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{
                                textAlign: 'center'
                            }}>Ações</th>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Unidade de Medida</th> {/* 🛑 CORRIGIDO: Nova Coluna */}
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr key={objeto.codigo}>
                                <td align="center">
                                    <Button variant="danger" 
                                        onClick={() => { remover(objeto.codigo); }}
                                        style={{marginRight: '5px'}}>
                                        Deletar <i className="bi bi-trash"></i>
                                    </Button>
                                    
                                    <Button variant="info" onClick={() => editarObjeto(objeto.codigo)}>
                                        Editar <i className="bi bi-pencil-square"></i>
                                    </Button>
                                </td>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.nome}</td>
                                <td>{objeto.unidade_medida}</td> {/* 🛑 CORRIGIDO: Exibindo a unidade de medida */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default Tabela;