import * as React from 'react'                          
import * as ReactDOM from 'react-dom'      
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import SaveDialog from "./SaveDialog"

// import "prismjs/components/prism-markdown";

import "prismjs/components/prism-ruby";
import "prismjs/themes/prism.css"; //Example style, you can use another
import * as PrismComponents from 'prismjs/components';
console.log(PrismComponents)
// loadComponents(['markdown']);

class NoteEditor extends React.Component {
  constructor() {
    super();

    this.state = {
      content: "",
      filename: "unsaved.txt*",
      wasSaved: false,
      tempfilename: "",
    }
  }

  componentDidMount() { 

  }

  hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
      .split("\n")
      .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
      .join("\n");

  stateHandleClickCancel = () => {
    this.setState({tempfilename: ""});
  }

  handleContentChange = (e) => {
    this.setState({content: e});
  }

  tempfilenameUpdate = (e) => {
    this.setState({tempfilename: e.target.value});
  }
  
  stateHandleClickSave = () => {
    let filename = this.state.wasSaved ? this.state.filename : this.state.tempfilename;
    this.setState({
      filename: filename, 
      tempfilename: "", 
      wasSaved: true
    });
    this.saveTextToFile(filename, this.state.content);
  }

  saveTextToFile = (filename, content) => {
    const url = "/queso/save?filename=" + encodeURIComponent(filename) +  "&content=" +  encodeURIComponent(content);
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      });
  }

  render () {
    return (
      <div id="note_editor">
        <div id="note_editor_left">
        
        </div>
        <div id="note_editor_center">
          <div id="note_editor_center_top">

          </div>
          <div id="note_editor_center_center">
            <Editor
                value={this.state.content}
                onValueChange={this.handleContentChange}
                highlight={(code) => this.hightlightWithLineNumbers(code, languages.ruby)}
                padding={10}
                textareaId="codeArea"
                className="editor"
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 18,
                  outline: 0
                }}            
            />  
          </div>
          <div id="note_editor_center_bottom">
            <div id="note_editor_center_bottom_left">
              <SaveDialog 
                stateHandleClickCancel={this.stateHandleClickCancel}
                stateHandleClickSave={this.stateHandleClickSave}
                tempfilenameUpdate={this.tempfilenameUpdate}
                tempfilename={this.state.tempfilename}
                wasSaved={this.state.wasSaved}
              ></SaveDialog>;
            </div>
            <div id="note_editor_center_bottom_right">
              {this.state.filename}
            </div>
          </div>
        </div>
        <div id="note_editor_right">
        </div>
      </div>
    );
  }
}

export default NoteEditor
