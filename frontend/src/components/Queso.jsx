import * as React from 'react'                          
import NoteEditor from "./NoteEditor"

class Queso extends React.Component {
  render () {
    return (
      <div id="overall_container">
        <div id="header"></div>
        <NoteEditor></NoteEditor>
        <div id="footer"></div>
      </div>
    );
  }
}

export default Queso
