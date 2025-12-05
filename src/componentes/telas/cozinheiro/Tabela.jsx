import { useContext } from 'react'
import CozinheiroContext from './CozinheiroContext';
import Alerta from '../../comuns/Alerta';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

function Tabela() {

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(CozinheiroContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Cozinheiros</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary" onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Button>
            {/* 🛑 CORRIGIDO: Mensagem de plural/singular */}
            {listaObjetos.length === 0 && <h1>Nenhum cozinheiro encontrado</h1>} 
            
            {listaObjetos.length > 0 && (

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{
                                textAlign: 'center'
                            }}>Ações</th>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Descrição</th> {/* 🛑 CORRIGIDO: Nova Coluna */}
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr key={objeto.codigo}>
                                <td align="center">
                                    <Button variant="danger" 
                                        onClick={() => { remover(objeto.codigo); }}
                                        style={{marginRight: '5px'}}> {/* ✅ Melhoria de espaçamento */}
                                        Deletar <i className="bi bi-trash"></i>
                                    </Button>
                                    
                                    <Button variant="info" onClick={() => editarObjeto(objeto.codigo)}>
                                        Editar <i className="bi bi-pencil-square"></i>
                                    </Button>
                                </td>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.nome}</td>
                                <td>{objeto.descricao}</td> {/* 🛑 CORRIGIDO: Exibindo a descrição */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default Tabela;