import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import axios from 'axios';
import GlobalURL from '../GlobalURL';

class PresenceGraph extends Component {

    //Global URL API
    url = GlobalURL.url;

    state = {
        articles: [],
        status: null
    }

    //Pie Graph Parameters
    constructor(props) {
        super(props);

        this.state = {

            series: [],
            options: {
                chart: {
                    width: 380,
                    type: 'pie',
                },
                labels: [],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
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
        const presence = [];

        await axios.get(this.url + "presence-share-chart")
            .then(res => {
                this.setState({
                    articles: res.data,
                    status: "success"
                })

                //Map Response (Articles)
                this.state.articles.map((article) => {

                    name.push(article.name);
                    presence.push(article.presenceShare);

                    //Return Dynamic Properties Pie Graph
                    return (

                        this.setState({

                            series: presence,
                            options: {
                                chart: {
                                    width: 380,
                                    type: 'pie',
                                },
                                labels: name,
                                responsive: [{
                                    breakpoint: 480,
                                    options: {
                                        chart: {
                                            width: 500
                                        },
                                        legend: {
                                            position: 'bottom'
                                        }
                                    }
                                }]
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
                <div className="graph-2">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={380} />
                </div >
            </div>
        )
    }
}

export default PresenceGraph;
