import "./App.css";
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import html2pdf from 'html2pdf.js/dist/html2pdf';

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

     // Função para converter uma imagem para base64
    convertImageToBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            callback(base64String);
        };
        reader.readAsDataURL(file);
    };

    handleExportToPDF = () => {
        const content = document.getElementById('preview');

        // Converta todas as imagens para base64 antes de exportar para PDF
        const images = content.getElementsByTagName('img');
        let imagesLoaded = 0;

        const checkImagesLoaded = () => {
            imagesLoaded++;
            if (imagesLoaded === images.length) {
                html2pdf(content, {
                    margin: 10,
                    filename: 'markdown_export.pdf',
                    image: { type: 'png', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                });
            }
        };

        Array.from(images).forEach((image) => {
            const imageUrl = image.src;
            fetch(imageUrl)
                .then(response => response.blob())
                .then(blob => {
                    // Converta a imagem para base64
                    this.convertImageToBase64(blob, (base64String) => {
                        image.src = `data:image/png;base64,${base64String}`;
                        checkImagesLoaded();
                    });
                })
                .catch(error => {
                    console.error('Erro ao carregar a imagem:', error);
                    checkImagesLoaded();
                });
        });
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
                <div className="preview" id="preview">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>{this.state.textAreaValue}</ReactMarkdown>
                </div>
                <button  onClick={this.handleExportToPDF}>Export to PDF</button>
            </div>
        );
    }
}

export default App; 