import './App.css';
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textAreaValue: "",
        };
    }

    handleInputChange = (event) => {
        this.setState({ textAreaValue: event.target.value });
    };

    render() {
        return (
            <div class="mt-5 mb-5"> 
                <h1 className="text-white fs-3 mb-3">Editor:</h1>
                <textarea
                    style= {{"border": "1px solid #1d2f2f", "box-shadow": "1px 1px 10px 2px #3a5f5f"}}
                    rows="10"
                    cols="50"
                    value={this.state.textAreaValue}
                    onChange={this.handleInputChange}
                ></textarea>
                <br />
                <br />
                <h2 className="text-white">Previewer:</h2>
                <div id="preview" className="preview p-3 bg-white" style= {{"border": "1px solid #1d2f2f", "box-shadow": "1px 1px 10px 2px #3a5f5f"}}>
                    <ReactMarkdown>{this.state.textAreaValue}</ReactMarkdown>
                </div>
            </div>
        );
    }
}

export default App;
