import * as React from 'react'                          
import * as ReactDOM from 'react-dom'      
import Editor from "react-simple-code-editor";
import NoteEditor from "./NoteEditor"

class Queso extends React.Component {
  constructor() {
    super();

    this.state = {
      }
    }

  componentDidMount() { }

  render () {
    return (
      <div id="overall_container">
        <div id="header">header</div>
        <NoteEditor></NoteEditor>
        <div id="footer">footer</div>
      </div>
    );
  }
}

export default Queso
