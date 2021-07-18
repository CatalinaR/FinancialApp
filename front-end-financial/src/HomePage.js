import React from "react";

class HomePage extends React.Component{

    constructor(props) {
        super(props);
        this.state= {
            value: 'AAPL',
            data: ["£", "$"]
        }

        this.fetchData = this.fetchData.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onSubmitStcokCode = this.onSubmitStcokCode.bind(this)
    }

    async fetchData() {

        console.log(this.state.value)
        const dataFetch =  await fetch("http://127.0.0.1:5000/data?stock="+this.state.value)
              .then((response) => response.json());

        console.log(dataFetch)

             this.setState({
                value: '',
                data: dataFetch[this.state.value]
            });

            }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    onSubmitStcokCode() {
        console.log(this.state.value)


        this.fetchData()

    }

    
    render() {
        return (
        <div className="HomePage">
        <h1>Home Page Information</h1>
        <ul>{this.state.data}</ul>
        <br></br>
        <form onSubmit={this.fetchData}>
            <label>
                Input Stock Code:
                <input type="text" name={this.state.value} onChange={this.handleChange}></input>
            </label>
            <input type="submit" value="Get Stock Values"/>
        </form>
        <br></br>
        <button onClick={this.fetchData}>Get Stock Values</button>
        </div>

        );
    }
}


export default HomePage;
