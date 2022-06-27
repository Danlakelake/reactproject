import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import axios from 'axios';
import GlobalURL from '../GlobalURL';

class PriceEvoGraph extends Component {

    //Global URL API
    url = GlobalURL.url;

    state = {
        articles: [],
        status: null
    }

    //Line Graph Parameters
    constructor(props) {
        super(props);

        this.state = {

            series: [{
                name: '',
                data: []
            }, {
                name: '',
                data: []
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'area'
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'datetime',
                    categories: []
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm'
                    },
                },
            },

        };
    }

    //Call API on DidMount
    componentDidMount() {
        this.callAPI();
    }

    //Call API Method
    async callAPI() {

        const name = [];
        const price = [];
        const date = [];

        await axios.get(this.url + "price-evolution-chart/")
            .then(res => {
                this.setState({
                    articles: res.data,
                    status: "success"
                })

                //Map Response (Articles)
                this.state.articles.map((article) => {

                    name.push(article.name);
                    price.push(article.price);
                    date.push(article.dateExtraction);

                    //Return Dynamic Properties Line Graph
                    return (

                        this.setState({

                            series: [
                                {
                                    name: name[0],
                                    data: price,
                                    color: '#D6215B',
                                },
                                {
                                    name: name[10],
                                    data: price,
                                    color: '#7530B2',
                                },
                                {
                                    name: name[21],
                                    data: price,
                                    color: "#FFB448",
                                },
                            ],

                            options: {
                                xaxis:
                                {
                                    type: 'datetime',
                                    categories: date
                                },
                            },

                        })
                    )
                });


            }).catch(err => {
                console.log("error", err);
            })
    }

    render() {
        return (
            <div>
                <h4>Price Evolution</h4>
                <div className="graph-1">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
                </div >
            </div>
        )
    }
}

export default PriceEvoGraph;
