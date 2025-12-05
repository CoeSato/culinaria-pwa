import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { gravaAutenticacao, getToken } from '../../../seguranca/Autenticacao';
import Carregando from '../../comuns/Carregando';
import Alerta from '../../comuns/Alerta';
import CampoEntrada from '../../comuns/CampoEntrada';

function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [autenticado, setAutenticado] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const acaoLogin = async e => {

        e.preventDefault();

        // Validação básica
        if (!email || !senha) {
            setAlerta({ status: "error", message: "Preencha o email e a senha." });
            return;
        }

        const body = { email, senha };
        setCarregando(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const json = await response.json();

            // 🛑 CORRIGIDO: Verifica o status HTTP ANTES de processar o JSON
            if (!response.ok) {
                // Se o status for 4xx ou 5xx, trata como erro de autenticação ou servidor
                // O backend deve retornar no JSON { message: "..." }
                setAlerta({ 
                    status: 'error', 
                    message: json.message || 'Erro de conexão ou credenciais inválidas.'
                });
                return; 
            }

            // Se o status HTTP for 200 OK, verifica a propriedade 'auth' do corpo
            if (json.auth === false) {
                setAlerta({ status: "error", message: json.message })
            } else if (json.auth === true) {
                // Autenticação bem sucedida
                setAutenticado(true);
                gravaAutenticacao(json);
            }

        } catch (err) {
            console.error("Erro na requisição:", err.message);
            setAlerta({ status: "error", message: `Erro de rede: ${err.message}` });
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        try {
            const token = getToken();
            if (token != null) {
                setAutenticado(true);
            }
        } catch (err) {
            // Lida com erros na leitura do token (ex: token corrompido)
            setAlerta({ status: "error", message: err != null ? err.message : "Erro na autenticação local." });
        }
    }, []);

    if (autenticado === true) {
        // ✅ Redirecionamento após login bem sucedido
        return <Navigate to="/privado" />
    }

    return (
        <div className="container" >
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <Carregando carregando={carregando}>
                        <Alerta alerta={alerta} />
                        <form onSubmit={acaoLogin}>
                            <h1 className="h3 mb-3 fw-normal">Login de usuário</h1>
                            <CampoEntrada value={email}
                                id="txtEmail" name="email" label="Email"
                                tipo="email" onchange={e => setEmail(e.target.value)}
                                msgvalido="Email OK" msginvalido="Informe o email"
                                requerido={true} readonly={false}
                                maxCaracteres={40} />
                            <CampoEntrada value={senha}
                                id="txtSenha" name="senha" label="Senha"
                                tipo="password" onchange={e => setSenha(e.target.value)}
                                msgvalido="Senha OK" msginvalido="Informe a senha"
                                requerido={true} readonly={false}
                                maxCaracteres={40} />
                            <button className="w-100 btn btn-lg btn-primary" type="submit">Efetuar login</button>
                        </form>
                    </Carregando>
                </div>
            </div>
        </div>
    )
}

export default Login;