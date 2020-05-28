
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

var userAddress;

let ethereum = window.ethereum;
console.log("eth: " + ethereum);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: null
        }
    }

    componentDidMount() {
        this.getAccountName();
    }

    async getAccountName() {
        // eslint-disable-next-line no-undef
        this.setState({account: await ethereum.enable()}, () => {
            userAddress = this.state.account[0];
            var x = typeof(userAddress);
            console.log("User Address type: " + x);
        });
    }

    sendAPIRequest(){
        window.alert('Transfered one token');
        var APIAdress;
        APIAdress = "http://13.56.163.182:8000/transfer-token";
        axios.post(APIAdress, {
            ticker: "BEAR",
            amount: 1,
            to: userAddress,
            hookUrl: "done",
        })
        .then(function(response){
            console.log("Response: " + response);
        })
        .catch(function(error){
            console.log(error);
        });
    }



    render() {
        return <div className = "container">

            <h1 className="title"> ERC20 Demo React App </h1>
            <h3 className="title"> Click to get a BEAR token </h3>


            <div className="img-div">
                <img className="seaFloor" alt="The sea floor" src="https://images.unsplash.com/photo-1567001847230-ed5da95bd055?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"></img>
            </div>

            <br></br>

            <div className="button-div">
                <button className="metaMask" onClick={this.sendAPIRequest}>Get BEAR Token</button>
            </div>

        </div>
            
    }
}
ReactDOM.render(<App />, document.querySelector('#root'));

