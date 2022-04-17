import * as React from 'react'                          
import * as ReactDOM from 'react-dom'      
import NoteEditor from "./NoteEditor"

class Queso extends React.Component {
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
