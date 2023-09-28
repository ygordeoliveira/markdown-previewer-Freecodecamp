import './App.css';
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        textAreaValue: "",
        isWideScreen: window.innerWidth >= 1410, // Verifica a largura da tela no início
      };
    }
  
    handleInputChange = (event) => {
      this.setState({ textAreaValue: event.target.value });
    };
  
    // Atualiza o estado isWideScreen quando a largura da tela muda
    handleResize = () => {
      this.setState({ isWideScreen: window.innerWidth >= 1410 });
    };
  
    componentDidMount() {
      window.addEventListener("resize", this.handleResize);
    }
  
    componentWillUnmount() {
      window.removeEventListener("resize", this.handleResize);
    }
  
    render() {
      return (
        <div>
          {this.state.isWideScreen ? (
            // Layout para telas largas (maior ou igual a 1410px)
            <div className=" mt-5 mb-5">
              <div className="row">
                <div className="col-md-6">
                  <h1 className="text-white mb-3">Editor:</h1>
                  <textarea
                    style={{ border: "1px solid #1d2f2f", boxShadow: "1px 1px 10px 2px #3a5f5f" }}
                    rows="10"
                    cols="50"
                    value={this.state.textAreaValue}
                    onChange={this.handleInputChange}
                  ></textarea>
                </div>
  
                <div className="col-md-6">
                  <h2 className="text-white">Previewer:</h2>
                  <div
                    id="preview"
                    className="preview p-5 bg-white"
                    style={{ border: "1px solid #1d2f2f", boxShadow: "1px 1px 10px 2px #3a5f5f" }}
                  >
                    <ReactMarkdown>{this.state.textAreaValue}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Layout para telas estreitas (menos de 1000px)
            <div class="mt-5 mb-5"> 
              <h1 className="text-white mb-3">Editor:</h1>
              <textarea
                style={{ border: "1px solid #1d2f2f", boxShadow: "1px 1px 10px 2px #3a5f5f" }}
                rows="10"
                cols="50"
                value={this.state.textAreaValue}
                onChange={this.handleInputChange}
              ></textarea>
              <br />
              <br />
              <h2 className="text-white">Previewer:</h2>
              <div
                id="preview"
                className="preview p-3 bg-white"
                style={{ border: "1px solid #1d2f2f", boxShadow: "1px 1px 10px 2px #3a5f5f" }}
              >
                <ReactMarkdown>{this.state.textAreaValue}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      );
    }
  }

export default App;
