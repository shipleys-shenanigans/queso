import * as React from 'react'                          
import * as ReactDOM from 'react-dom'      
import Editor from "react-simple-code-editor";
import LoadDialog from "./LoadDialog"
import SaveDialog from "./SaveDialog"
import NewNoteButton from "./NewNoteButton"

class NoteEditor extends React.Component {
  constructor() {
    super();

    this.state = {
      content: "",
      filename: "unsaved.txt*",
      wasSaved: false,
      tempfilename: "",
      notes: [],
      tempSelectedFilename: "",
      lastSavedContent: "",
    }
  }

  componentDidMount() { 

  }

  hightlightWithLineNumbers = (input) =>
      input.split("\n")
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
      wasSaved: true,
      lastSavedContent: this.state.content,
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

  loadAllNotes = () => {
    const url = "/queso/all_notes"
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ notes: response.notes }))
  }

  handleUpdateTempSelectedFilename = (filename) => {
    this.setState({tempSelectedFilename: filename});
  }

  stateHandleClickCancelLoad = () => {
    this.setState({tempSelectedFilename: ""});
  }

  stateHandleClickLoadOpen = () => {
    let filename = this.state.tempSelectedFilename;
    this.setState({
      filename: filename, 
      tempSelectedFilename: "", 
      wasSaved: true,
    });

    this.loadContentForFilename(filename);
  }

  loadContentForFilename = (filename) => {
    const url = "/queso/load?filename=" + encodeURIComponent(filename);
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ 
        content: response.content, 
        lastSavedContent: response.content }));
  }

  handleClickNewNote = () => {
    this.setState({
      content: "",
      filename: "unsaved.txt*",
      wasSaved: false,
      tempfilename: "",
      notes: [],
      tempSelectedFilename: "",
      lastSavedContent: "",
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
                highlight={(code) => this.hightlightWithLineNumbers(code)}
                padding={10}
                textareaId="codeArea"
                className="editor"
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 15,
                  outline: 0,
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
                dirtyContent={this.state.content !== this.state.lastSavedContent}
              ></SaveDialog>
              <LoadDialog
                loadAllNotes={this.loadAllNotes}
                allNotes={this.state.notes}
                handleUpdateTempSelectedFilename={this.handleUpdateTempSelectedFilename}
                stateHandleClickCancelLoad={this.stateHandleClickCancelLoad}
                stateHandleClickLoadOpen={this.stateHandleClickLoadOpen}
              ></LoadDialog>
              <NewNoteButton
                handleClickNewNote={this.handleClickNewNote}
              ></NewNoteButton>
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
