import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../../components/Loading';
import { Toast } from '../../components/Toast';
import { verificaTokenExpirado } from '../../service/token';

interface Iclientes {
    id: number
    nome: string
    cpf: string
    dataNascimento: string
    email: string
    telefone: string
    logradouro: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    estado: string
}

export const Clientes = () => {

    const navigate = useNavigate();

    const [clientes, setclientes] = useState<Iclientes[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const [showToast, setShowToast] = useState(false)
    const [messageToast, setMessageToast] = useState('')
    const [corToast, setCorToast] = useState('success')

    useEffect(() => {
        console.log('Execução ao iniciar a pg')

        let lsToken = localStorage.getItem('chopts:token')

        // add tipagem viuu
        let token: any = null;

        if (typeof lsToken === 'string') {
            token = JSON.parse(lsToken)
        }

        if (!token) {
            navigate('/')
        }

        setIsLoading(true)
        axios.get('http://localhost:3001/clientes')
            .then((resposta) => {
                console.log(resposta.data)

                setclientes(resposta.data)
            })
            .catch((erro) => {
                console.log(erro)
            })
            .finally(() => {
                setIsLoading(false)
            })

    }, [])

    const excluirCliente = useCallback(async (id: number) => {

        const confirmar = window.confirm("Tem certeza, que deseja excluir esse cliente?")

        if (!confirmar) {
            return;
        }

        try {

            await axios.delete(`http://localhost:3001/clientes/${id}`)

            const { data } = await axios.get('http://localhost:3001/clientes')

            setclientes(data)
            setShowToast(true)
            setMessageToast('Cliente deletado com sucesso :D')
            setCorToast('success')
        } catch (erro) {
            setShowToast(true)
            setMessageToast('Erro ao deletar cliente ;(')
            setCorToast(`danger`)
            console.log(erro)
        }
    }, [])

    return (
        <>
            <Toast
                color={corToast}
                show={showToast}
                message={messageToast}
                onClose={() => setShowToast(false)}
            />

            <Loading visible={isLoading} />

            {/* Cabeçalho */}
            <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
                <h1 className="m-0">Clientes</h1>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => navigate('/clientes/cadastrar')}
                >
                    <FaPlus className="me-2" />
                    Adicionar
                </button>
            </div>

            {/* Tabela */}
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Data de Nascimento</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Logradouro</th>
                            <th>Número</th>
                            <th>Complemento</th>
                            <th>Bairro</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {clientes.length > 0 ? (
                            clientes.map((cliente) => (
                                <tr key={cliente.id}>
                                    <th scope="row">{cliente.id}</th>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.cpf}</td>
                                    <td>{new Date(cliente.dataNascimento).toLocaleDateString('pt-BR')}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.telefone}</td>
                                    <td>{cliente.logradouro}</td>
                                    <td>{cliente.numero}</td>
                                    <td>{cliente.complemento || '-'}</td>
                                    <td>{cliente.bairro}</td>
                                    <td>{cliente.cidade}</td>
                                    <td>{cliente.estado}</td>
                                    <td>
                                        <div className="d-flex">
                                            <button
                                                className="btn btn-primary btn-sm me-2"
                                                type="button"
                                                onClick={() => navigate(`/clientes/${cliente.id}`)}
                                                title="Editar cliente"
                                            >
                                                <FaPen />
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                type="button"
                                                onClick={() => excluirCliente(cliente.id)}
                                                title="Excluir cliente"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={13} className="text-center text-muted py-4">
                                    Nenhum cliente cadastrado ainda.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>

    )
}