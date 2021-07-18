import React from "react";
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';



class HomePage extends React.Component{

    constructor(props) {
        super(props);
        this.state= {
            value: 'AAPL',
            data: [], 
            titleStock: ''
        }

        this.fetchData = this.fetchData.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onSubmitStcokCode = this.onSubmitStcokCode.bind(this)
    }

    async fetchData() {

        console.log(this.state.value)
        const dataFetch =  await fetch("http://127.0.0.1:5000/data?stock="+this.state.value)
              .then((response) => response.json());

             this.setState({
                value: '',
                data: dataFetch[this.state.value],
                titleStock: this.state.value
            });

            }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    onSubmitStcokCode() {
        document.getElementById('inputFieldStock').value=''

        this.fetchData()

    }
    
    componentDidMount(){
        this.fetchData()
    }

    transformData() {
    
        var dictDisplay = []
        const valuesFloat = this.state.data
        var i = 1
        while(i <= valuesFloat.length){
            dictDisplay = [...dictDisplay, {'x': i, 'y': valuesFloat[i-1]}]
            i += 1
        }

        console.log("HERREE")
        console.log(dictDisplay)
        return dictDisplay
    }

    
    render() {
        const something = this.transformData()

        return (

        <div className="HomePage">
            <div style={{
                textAlign:'center'
            }} className="Title"> 
                <h1>Home Page Information</h1>
            </div>

            <div style={{
                textAlign:'center'
            }} className="Title"> 
                <h2>{this.state.titleStock}</h2>
            </div>

        <link rel="stylesheet" href="https://unpkg.com/react-vis/dist/style.css"/>
        <script type="text/javascript" src="https://unpkg.com/react-vis/dist/dist.min.js"></script>

        <XYPlot width={1000} height={500}>
            <HorizontalGridLines />
            <LineSeries
                data={something}/>
            <XAxis />
            <YAxis />
        </XYPlot>

        <br></br>

        <div style={{
                textAlign:'center'
            }} className="Title"> 
        <form onSubmit={this.fetchData}>
            <label>
                Input Stock Code:
                <input type="text" name={this.state.value} onChange={this.handleChange} id="inputFieldStock"></input>
            </label>
            <input type="button" onClick={this.onSubmitStcokCode} value="Get Stock Values"/>
        </form>
        </div>
        <br></br>
        </div>

        );
    }
}


export default HomePage;
