import React from 'react'
import './Register.css'
import Main from '../template/Main'
import axios from 'axios'
import { Link } from 'react-router-dom'


const headerProps = {
    title: 'Maccommerce',
}

const initialState = {
    user: { name: '', email: '', tipoPessoa: 'PF', cep: '', endereco: '', username: '', password: '' },
}

export default class Register extends React.Component {

    state = { ...initialState }

    clear() {
        this.setState({ user: initialState.user })
    }

    save(e) {

        e.preventDefault()

        const user = this.state.user
        

        axios.post(`http://localhost:7000/customers/`, user)
            .then(resp => {
                if((resp.status_code = 201)){
                this.props.history.push("/");
                console.log(user)
                alert("Cadastro realizado com sucesso!!!")
                console.log(resp.data)

                
            }else{
                console.log("Opa algo deu errado no cadastro!!!")
                alert("Opa algo deu errado no cadastro!!!"+ resp.data)
            }
        
        }).catch((error) => {
            console.log(error)
            alert("Erro no cadastro do usuário")
            })
        this.setState({ user: initialState.user })

    }

    updateFieldUser(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }


    onSubmit = () => {
        this.props.history.push("/");
    };

    render() {
        return (
            <Main  {...headerProps}>
                <div className="register-page">
                    <div className="form">
                        <form className="register-form"><h1>Novo cadastro</h1><p />
                            Nome Completo*
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateFieldUser(e)}
                                placeholder="Digite o nome completo" />
                            Email
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateFieldUser(e)}
                                placeholder="Digite o email" />
                            CEP
                            <input type="text" className="form-control"
                                name="cep"
                                value={this.state.user.cep}
                                onChange={e => this.updateFieldUser(e)}
                                placeholder="Digite o CEP" />
                            Endereço
                            <input type="text" className="form-control"
                                name="endereco"
                                value={this.state.user.endereco}
                                onChange={e => this.updateFieldUser(e)}
                                placeholder="Digite o endereço completo" />
                            Login*
                            <input type="text" className="form-control"
                                name="username"
                                value={this.state.user.username}
                                onChange={e => { this.updateFieldUser(e) }
                                }
                                placeholder="Digite o nome de usuário" />
                            Senha*
                            <input type="password" className="form-control"
                                name="password"
                                value={this.state.user.password}
                                onChange={e => this.updateFieldUser(e)}
                                placeholder="Digite a senha" />
                            <button className="btn btn-primary"
                                onClick={e => this.save(e)}>
                                Registrar
                            </button>
                            <p className="message">Já possui cadastro? <Link to="/login">Realize seu login</Link></p>
                        </form>
                    </div>
                </div>
            </Main>
        )
    }
}
