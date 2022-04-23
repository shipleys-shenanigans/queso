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
            currentNote: { filename: "unsaved.txt*", content: "" },
            wasSaved: false,
            notes: [],
            lastSavedContent: "",
        }
    }

    hightlightWithLineNumbers = (input) =>
        input.split("\n")
            .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
            .join("\n");


    stateHandleClickSave = (filename) => {
        this.setState({
            currentNote: {
                filename: filename,
                content: this.state.currentNote.content,
            },
            wasSaved: true,
            lastSavedContent: this.state.currentNote.content,
        });
        this.saveTextToFile(filename, this.state.currentNote.content);
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
        const url = "/queso/all_note_names"
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.setState({ notes: response.notes }))
    }

    loadSelectedNote = (id) => {
        const url = "/queso/note?id=" + encodeURIComponent(id);
        return fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
    }

    stateHandleClickLoadOpen = async (id) => {
        let note = (await this.loadSelectedNote(id)).note[0];
        this.setState({
            currentNote: {
                filename: note.filename,
                content: note.content,
            },
            lastSavedContent: note.content,
            wasSaved: true,
        });
    }

    handleClickNewNote = () => {
        this.setState({
            currentNote: { filename: "unsaved.txt*", content: "" },
            wasSaved: false,
            notes: [],
            lastSavedContent: "",
        });
    }

    handleContentChange = (e) => {
        let tempNote = this.state.currentNote;
        console.log(tempNote);
        tempNote.content = e;
        this.setState({currentNote: tempNote})
    }

    render () {
        console.log(this.state.notes);
        return (
            <div id="note_editor">
                <div id="note_editor_left">

                </div>
                <div id="note_editor_center">
                    <div id="note_editor_center_top">

                    </div>
                    <div id="note_editor_center_center">
                        <Editor
                            value={this.state.currentNote.content}
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
                                initFilename={this.state.currentNote.filename}
                                stateHandleClickSave={this.stateHandleClickSave}
                                wasSaved={this.state.wasSaved}
                                dirtyContent={this.state.currentNote.content !== this.state.lastSavedContent}
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
                            {this.state.currentNote.filename}
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
