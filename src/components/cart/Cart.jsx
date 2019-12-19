import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'
import { Link } from 'react-router-dom'


const headerProps = {
    title: 'Maccommerce',
}


const url = 'http://localhost:7000/cart'
const initialState = {
    product: { name:'', price:'', qtd:''},
    list: []
}





export default class Cart extends Component {
    
    state = {...initialState}

    componentWillMount() {
        axios(url).then(resp => {
            this.setState({ list: resp.data})
        })
    }

    clear() {
        this.setState({ product: initialState.product})
    }

    renderForm() {
        return (
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <Link to="/checkout" className="checkout" >
                            <button className="btn btn-primary">
                                Finalizar Compra
                            </button>
                        </Link> 
                        <Link to="/" className="voltar" >
                            <button className="btn btn-primary ml-2">
                                Continuar comprando
                            </button>
                        </Link> 
                    </div>
                </div>
                
        )
    }

    getUpdatedList(product){
        const list = this.state.list.filter(u => u.id !==product.id)
        list.unshift(product)
        return list
    }

    load(product) {
        this.setState({ product })
    }

    remove(product) {
        axios.delete(`${url}/${product.id}`).then(resp => {
            const list = this.state.list.filter(u => u !==product)
            this.setState({ list })
        })



        ///////---->>>>EXEMPLO BASE PARA USAR O TOKEN EM REQUISIÇÕES PROTEGIDAS
        // const product_TOKEN = localStorage.getItem('token')
        // const AuthStr = 'Bearer '.concat(product_TOKEN)
        // const URL = 'http://localhost:8080/me'

        // axios
        // .get(URL, 
        //     { headers: { Authorization: AuthStr } })
        // .then(response => {
        //             // If request is good...
        //             console.log(response.data)
        //         })
        //         .catch((error) => {
        //             console.log(error)
        //         })


    }

    renderTable() {
        return (
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th>     Nome</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
        )
    }

    renderRows() {
            return this.state.list.map(product => {
                return (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.qtd}</td>
                        <td>
                            <button className="btn btn-danger ml-2"
                                onClick={() => this.remove(product)}>
                                <i className="fa fa-trash" />
                            </button>
                        </td>
                    </tr>
                )
            })
    }

    render () {
        return (
            <Main {...headerProps}>
                {this.renderTable()}
                {this.renderForm()}
            </Main>
        ) 
    }
}