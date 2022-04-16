import * as React from 'react'                          
import * as ReactDOM from 'react-dom'      
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-ruby";
import "prismjs/themes/prism.css"; //Example style, you can use another

class Queso extends React.Component {
  constructor() {
    super();

    this.state = {
      }
    }

  componentDidMount() { }

  render () {
    return (
      <div>
        Hello World
      </div>
    );
  }
}

export default Queso
