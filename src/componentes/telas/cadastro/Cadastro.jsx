import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carregando from '../../comuns/Carregando';
import Alerta from '../../comuns/Alerta';
import CampoEntrada from '../../comuns/CampoEntrada';
import CampoSelect from '../../comuns/CampoSelect';

function Cadastro() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [tipo, setTipo] = useState("");
    const [telefone, setTelefone] = useState("");
    const [nome, setNome] = useState("");

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const acaoCadastro = async e => {
        e.preventDefault();

        // Desestruturando os estados para criar o corpo
        const body = { email, senha, tipo, telefone, nome };

        // Validação de campos (mantida, mas mais sucinta)
        if (Object.values(body).some(value => !value)) {
            setAlerta({ status: "error", message: "Por favor, preencha todos os campos." });
            return;
        }

        console.log("Dados do cadastro:", body);
        setCarregando(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cadastro`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            
            // 🛑 CORREÇÃO LÓGICA: Verifica se a resposta HTTP foi OK (2xx)
            if (!response.ok) {
                // Se a API retornar um erro HTTP (400, 500, etc.), o JSON contém a mensagem de erro
                const errorJson = await response.json();
                setAlerta({ status: 'error', message: errorJson.message || 'Erro ao comunicar com a API.' });
                return;
            }

            const json = await response.json();
            console.log("Resposta do servidor:", json);

            // Se a API retornar sucesso no HTTP, mas talvez falhe na lógica (status: 'error' no body)
            if (json.status === 'error') {
                setAlerta({ 
                    status: 'error', 
                    message: json.message || 'Erro ao cadastrar usuário! Tente novamente.' 
                });
            } else if (json.status === 'success') {
                setAlerta({ status: 'success', message: 'Cadastro realizado com sucesso! Redirecionando para o login...' });
                
                // Limpa os campos após o sucesso
                setEmail("");
                setSenha("");
                setTipo("");
                setTelefone("");
                setNome("");
                
                // ✅ MELHORIA: Redireciona para o login após 2 segundos
                setTimeout(() => {
                    navigate('/login'); 
                }, 2000);
            }
        } catch (err) {
            console.error("Erro na requisição:", err.message);
            setAlerta({ status: "error", message: `Erro de conexão: ${err.message}` });
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <Carregando carregando={carregando}>
                        <Alerta alerta={alerta} />
                        <form onSubmit={acaoCadastro}>
                            <h1 className="h3 mb-3 fw-normal">Cadastro de usuário</h1>
                            <CampoEntrada
                                value={email}
                                id="txtEmail"
                                name="email"
                                label="Email"
                                tipo="email"
                                onchange={e => setEmail(e.target.value)}
                                msgvalido="Email OK"
                                msginvalido="Informe o email"
                                requerido={true}
                                readonly={false}
                                maxCaracteres={40}
                            />
                            <CampoEntrada
                                value={senha}
                                id="txtSenha"
                                name="senha"
                                label="Senha"
                                tipo="password"
                                onchange={e => setSenha(e.target.value)}
                                msgvalido="Senha OK"
                                msginvalido="Informe a senha"
                                requerido={true}
                                readonly={false}
                                maxCaracteres={40}
                            />
                            <CampoSelect
                                value={tipo}
                                id="txtTipo"
                                name="tipo"
                                label="Tipo de usuário"
                                onchange={e => setTipo(e.target.value)}
                                msgvalido="Tipo OK"
                                msginvalido="Selecione o tipo do usuário" // ⬅️ Melhoria: Mensagem mais clara
                                requerido={true}
                                readonly={false}
                            >
                                <option value="">Selecione o tipo do usuário...</option>
                                <option value="A">Administrador</option>
                                <option value="U">Usuário comum</option>
                            </CampoSelect>
                            <CampoEntrada
                                value={telefone}
                                id="txtTelefone"
                                name="telefone"
                                label="Telefone"
                                tipo="tel"
                                onchange={e => setTelefone(e.target.value)}
                                msgvalido="Telefone OK"
                                msginvalido="Informe o telefone"
                                requerido={true}
                                readonly={false}
                                maxCaracteres={15}
                            />
                            <CampoEntrada
                                value={nome}
                                id="txtNome"
                                name="nome"
                                label="Nome completo"
                                tipo="text"
                                onchange={e => setNome(e.target.value)}
                                msgvalido="Nome OK"
                                msginvalido="Informe o nome completo"
                                requerido={true}
                                readonly={false}
                                maxCaracteres={100}
                            />
                            <button className="w-100 btn btn-lg btn-primary" type="submit">
                                Efetuar cadastro
                            </button>
                        </form>
                    </Carregando>
                </div>
            </div>
        </div>
    );
}

export default Cadastro;