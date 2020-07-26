import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isProcessingFile: false,
      selectedFile: null
    };
  }

  onFileSelected = event => {
    let selectedFile = event.target.files[0]
    if (!(selectedFile.type === "text/xml")) {
      let warningMessage = `A file in '${selectedFile.type}' format is select, 
        Expecting: 'text/xml'`;
      event.target.value = null;
      return;
    }
    this.setState({ selectedFile: event.target.files[0] });
  }

  onProcessingXmlFile = event => {
    this.setState({ isProcessingFile: true });
  };

  processXmlFile(file) {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      const result = event.target.result;
      // Do something with result
    });

    reader.addEventListener('progress', (event) => {
      if (event.loaded && event.total) {
        const percent = (event.loaded / event.total) * 100;
        console.log(`Progress: ${Math.round(percent)}`);
      }
    });
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <Container className="p-3">
        <Jumbotron>
          <h1>Gentrack Code Exercise</h1>
          <p>Process selected xml file and output files in csv format.</p>
          <Form>
            <Form.File
              id="custom-file"
              label="input XML file"
              accept=".xml"
              onChange={this.onFileSelected}
              disabled={this.state.isProcessingFile}
              custom
            />
            <Button
              variant="primary"
              onClick={this.onProcessingXmlFile}>
              Process the selected file
          </Button>
          </Form>
        </Jumbotron>
      </Container>
    );
  }
}

export default App;