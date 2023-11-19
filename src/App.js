import "./App.css";
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

class App extends React.Component {
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
            <div> 
                <h1>Editor:</h1>
                <textarea
                  rows="10"
                  cols="50"
                  value={this.state.textAreaValue}
                  onChange={this.handleInputChange}
                ></textarea>
                <br />
                <br />
                <br />
                <h2>Preview:</h2>
                <div className="preview">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>{this.state.textAreaValue}</ReactMarkdown>
                </div>
            </div>
        );
    }
}

export default App; 