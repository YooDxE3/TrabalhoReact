import axios from "axios";
import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react"
import { useNavigate, useParams } from "react-router-dom";

export default function GerenciarClientes() {

    const navigate = useNavigate();
    const { id } = useParams();
    const refForm = useRef<any>(null);
    const [isEditar, setIsEditar] = useState(false)

    useEffect(() => {
        const idCliente = Number(id)
        console.log(idCliente);

        if (!isNaN(idCliente)) {
            console.log('é numero')
            setIsEditar(true)

            axios.get(`http://localhost:3001/clientes/${idCliente}`)
                .then(({ data }) => {
                    refForm.current['nomeInt'].value = data.nome
                    refForm.current['cpf'].value = data.cpf
                    refForm.current['dataNascimento'].value = data.dataNascimento
                    refForm.current['email'].value = data.email
                    refForm.current['telefone'].value = data.telefone
                    refForm.current['logradouro'].value = data.logradouro
                    refForm.current['numero'].value = data.numero
                    refForm.current['complemento'].value = data.complemento
                    refForm.current['bairro'].value = data.bairro
                    refForm.current['cidade'].value = data.cidade
                    refForm.current['estado'].value = data.estado
                })
                .catch((erro) => {
                    console.log(erro)
                })
        }
    }, [id])

    const submitForm = useCallback((event: SyntheticEvent) => {
        event.preventDefault();

        if (refForm.current.checkValidity()) {

            const target = event.target as typeof event.target & {
                nomeInt: { value: string },
                cpf: { value: string },
                dataNascimento: { value: Date },
                email: { value: string },
                telefone: { value: string },
                logradouro: { value: string },
                numero: { value: string },
                complemento: { value: string },
                bairro: { value: string },
                cidade: { value: string },
                estado: { value: string },
            }

            let objSalvar = {
                nome: target.nomeInt.value,
                cpf: target.cpf.value,
                dataNascimento: target.dataNascimento.value,
                email: target.email.value,
                telefone: target.telefone.value,
                logradouro: target.logradouro.value,
                numero: target.numero.value,
                complemento: target.complemento.value,
                bairro: target.bairro.value,
                cidade: target.cidade.value,
                estado: target.estado.value
            }

            if (isEditar) {
                console.log('esta editando');

                axios.put('http://localhost:3001/clientes/' + id, objSalvar)
                    .then(() => {
                        alert('Editado com sucesso.')
                        navigate('/clientes')

                    })
                    .catch((erro) => {
                        console.log(erro)
                    })

            } else {
                console.log('esta criando');
                axios.post('http://localhost:3001/clientes', objSalvar)
                    .then(() => {
                        alert('Salvo que alegria :D')
                        navigate('/clientes')
                    })
                    .catch((erro) => {
                        console.log(erro)
                        alert('deu ruim que triste :(')
                    })
            }


        } else {
            refForm.current.classList.add('was-validated')
        }


    }, [isEditar, id])

    return (
        <>
            <h1>Cliente</h1>

            <form
                noValidate
                className="needs-validation g-3 row"
                ref={refForm}
                onSubmit={submitForm}
            >
                <div className="col-md-12">
                    <label htmlFor="nomeInt" className="formLabel">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Digite seu nome completo"
                        id="nomeInt"
                        required
                    />
                    <div className="invalid-feedback">Por favor, digite seu nome.</div>
                </div>

                <div className="col-md-6">
                    <label htmlFor="cpf" className="formLabel">CPF</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Digite seu CPF"
                        id="cpf"
                        maxLength={14}
                        required
                    />
                    <div className="invalid-feedback">Por favor, digite um CPF válido.</div>
                </div>

                <div className="col-md-6">
                    <label htmlFor="dataNascimento" className="formLabel">Data de Nascimento</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dataNascimento"
                        required
                    />
                    <div className="invalid-feedback">Por favor, selecione a data de nascimento.</div>
                </div>

                <div className="col-md-6">
                    <label htmlFor="email" className="formLabel">E-mail</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Digite seu e-mail"
                        id="email"
                        required
                    />
                    <div className="invalid-feedback">Por favor, digite um e-mail válido.</div>
                </div>

                <div className="col-md-6">
                    <label htmlFor="telefone" className="formLabel">Telefone</label>
                    <input
                        type="tel"
                        className="form-control"
                        placeholder="(00) 00000-0000"
                        id="telefone"
                        required
                    />
                    <div className="invalid-feedback">Por favor, digite seu telefone.</div>
                </div>

                <div className="col-md-8">
                    <label htmlFor="logradouro" className="formLabel">Logradouro</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Rua, avenida, etc."
                        id="logradouro"
                        required
                    />
                    <div className="invalid-feedback">Por favor, digite o logradouro.</div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="numero" className="formLabel">Número</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Número"
                        id="numero"
                        required
                    />
                    <div className="invalid-feedback">Por favor, informe o número.</div>
                </div>

                <div className="col-md-6">
                    <label htmlFor="complemento" className="formLabel">Complemento</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Apartamento, bloco, etc. (opcional)"
                        id="complemento"
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="bairro" className="formLabel">Bairro</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Digite o bairro"
                        id="bairro"
                        required
                    />
                    <div className="invalid-feedback">Por favor, digite o bairro.</div>
                </div>

                <div className="col-md-8">
                    <label htmlFor="cidade" className="formLabel">Cidade</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Digite a cidade"
                        id="cidade"
                        required
                    />
                    <div className="invalid-feedback">Por favor, digite a cidade.</div>
                </div>

                <div className="col-md-4">
                    <label htmlFor="estado" className="formLabel">Estado</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="UF"
                        id="estado"
                        required
                    />
                    <div className="invalid-feedback">Por favor, digite o estado (UF).</div>
                </div>

                <div className="col-md-12 d-flex justify-content-between mt-4">
                    <button className="btn btn-secondary" type="button">
                        Voltar
                    </button>

                    <button className="btn btn-primary" type="submit">
                        Salvar
                    </button>
                </div>
            </form>
        </>

    )
}