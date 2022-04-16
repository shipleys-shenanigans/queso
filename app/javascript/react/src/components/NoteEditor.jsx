import * as React from 'react'                          
import * as ReactDOM from 'react-dom'      
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
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
      content: ""
    }
  }

  componentDidMount() { }

  hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
      .split("\n")
      .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
      .join("\n");

  handleContentChange = (e) => {
    this.setState({content: e});
  }

  render () {
    return (
      <div id="note_editor">
        <div id="note_editor_left">
        
        </div>
        <div id="note_editor_center">
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
              }}            />  
        </div>
        <div id="note_editor_right">
        
        </div>
      </div>
    );
  }
}

export default NoteEditor
