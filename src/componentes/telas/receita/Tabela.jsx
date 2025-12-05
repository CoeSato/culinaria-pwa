import { useContext } from 'react'
import ReceitaContext from './ReceitaContext';
import Alerta from '../../comuns/Alerta';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

function Tabela() {

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(ReceitaContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Receitas</h1> {/* ✅ CORRIGIDO: Título da página */}
            <Alerta alerta={alerta} />
            <Button variant="primary" onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Button>
            {/* CORRIGIDO: Mensagem de singular */}
            {listaObjetos.length === 0 && <h1>Nenhuma receita encontrada</h1>} 
            {listaObjetos.length > 0 && (

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{
                                textAlign: 'center'
                            }}>Ações</th>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Modo de preparo</th> {/* ⬅️ Cabeçalho */}
                            <th>Tempo de preparo</th> {/* ⬅️ Cabeçalho */}
                            <th>Nota</th> {/* ⬅️ Cabeçalho */}
                            <th>Data de cadastro</th> {/* ⬅️ Cabeçalho */}
                            <th>Cozinheiro</th> {/* ⬅️ Cabeçalho */}
                            <th>Ingredientes</th> {/* ⬅️ Cabeçalho */}
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr key={objeto.codigo}>
                                <td align="center">
                                    <Button variant="danger" onClick={() => { remover(objeto.codigo); }}>
                                        Deletar <i className="bi bi-trash"></i>
                                    </Button>
                                    
                                    <Button variant="info" onClick={() => editarObjeto(objeto.codigo)}>
                                        Editar <i className="bi bi-pencil-square"></i>
                                    </Button>
                                </td>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.nome}</td>
                                
                                {/* 🎯 CÉLULAS DE DADOS ADICIONADAS ABAIXO */}
                                <td>{objeto.modo_de_preparo}</td>
                                <td>{objeto.tempo_de_preparo}</td>
                                <td>{objeto.nota}</td>
                                <td>{objeto.data_cadastro}</td>
                                
                                {/* ⚠️ Assume que a API retorna o nome do cozinheiro em 'cozinheiro_nome' */}
                                <td>{objeto.cozinheiro_nome}</td>
                                
                                {/* ⚠️ Assume que a API retorna os nomes dos ingredientes em um ARRAY chamado 'ingredientes_nomes' e os junta com ', ' */}
                                <td>{objeto.ingredientes_nomes ? objeto.ingredientes_nomes.join(', ') : 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default Tabela;