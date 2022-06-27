import React, { Component } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import GlobalURL from '../GlobalURL';

class DataTable extends Component {

    //Global URL API
    url = GlobalURL.url;

    state = {
        articles: [],
        status: null
    }

    componentDidMount() {
        this.callAPI();
    }

    async callAPI() {
        await axios.get(this.url + "beer-products")
            .then(res => {
                this.setState({
                    articles: res.data,
                    status: "success"
                })

            }).catch(err => {
                console.log("error", err);
            })
    }

    render() {

        if (this.state.articles.length >= 1) {

            var listArticles = this.state.articles.map((article) => {

                //Function convert decimal to percents
                function formatAsPercent(num) {
                    return `${Math.abs(num).toFixed(2) * 100}%`;
                }

                return (
                    <tr key={article.id}>
                        <td>
                            <img src={article.productImage}></img>
                        </td>
                        <td>{article.name}</td>
                        <td>{article.sku}</td>
                        <td style={{ color: article.persistence < 0 ? "#D6215B" : "#23B794" }} >{formatAsPercent(article.persistence)}</td >
                        <td>{"$" + article.averagePrice}</td>
                        <td>{article.averagePosition}</td>
                    </tr >
                )

            });

            return (
                <div className="dataTable-cont">
                    <h4>Comparative Analysis</h4>

                    <Table striped bordered hover className="dataTable">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nombre</th>
                                <th>SKU</th>
                                <th>%Presencia</th>
                                <th>Av. Price</th>
                                <th>Av. Position</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listArticles}
                        </tbody>
                    </Table>

                </div>
            )

        } else if (this.state.articles.length === 0 && this.state.status === 'success') {
            return (
                <div>
                    <h2>No hay articulos para mostrar</h2>
                </div>
            )
        } else {
            return (
                <div>
                    <h2>Cargando...</h2>
                    <p>Espere a que se muestren los articulos</p>
                </div>
            )
        }
    }
}

export default DataTable; 