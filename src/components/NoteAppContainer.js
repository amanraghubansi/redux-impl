import React from 'react';
import { CREATE_NOTE, UPDATE_NOTE, OPEN_NOTE, CLOSE_NOTE } from '../redux/note-reducer';
const { default: MyConnect } = require("../redux/my-connect");

const NoteEditor = ({ note, onChangeNote, onCloseNote }) => (
    <div>
        <div>
            <textarea
                className="editor-content"
                autoFocus
                value={note.content}
                onChange={event =>
                    onChangeNote(note.id, event.target.value)
                }
            />
        </div>
        <button className="editor-button" onClick={onCloseNote}>
            Close
      </button>
    </div>
);

const NoteTitle = ({ note }) => {
    const title = note.content
        .split('\n')[0].replace(/^\s+|\s+$/g, '');
    if (title === '') {
        return <i>Untitled</i>;
    }
    return <span>{title}</span>;
};

const NoteLink = ({ note, onOpenNote }) => (
    <li className="note-list-item">
        <a href="#" onClick={() => onOpenNote(note.id)}>
            <NoteTitle note={note} />
        </a>
    </li>
);

const NoteList = ({ notes, onOpenNote }) => (
    <ul className="note-list">
        {
            Object.keys(notes).map(id =>
                <NoteLink
                    key={id}
                    note={notes[id]}
                    onOpenNote={onOpenNote}
                />
            )
        }
    </ul>
);

class NoteApp extends React.Component{
    render(){
        console.log(this.props,"noteapp");
        const {openNoteId,notes,onAddNote,onChangeNote,onCloseNote,onOpenNote} = this.props;
        return(
            <div>
            {
                openNoteId ?
                    <NoteEditor
                        note={notes[openNoteId]}
                        onChangeNote={onChangeNote}
                        onCloseNote={onCloseNote}
                    /> :
                    <div>
                        <NoteList
                            notes={notes ? notes : {}}
                            onOpenNote={onOpenNote}
                        />
                        {
                            <button
                                className="editor-button"
                                onClick={onAddNote}
                            >
                                New Note
              </button>
                        }
                    </div>
            }
        </div>
        )
    }
}

const mapStateToProps = state => ({
    notes: state.notes,
    openNoteId: state.openNoteId
});

const mapDispatchToProps = dispatch => ({
    onAddNote: () => {
        
        return dispatch({
            type: CREATE_NOTE
        });
    },
    onChangeNote: (id, content) => dispatch({
        type: UPDATE_NOTE,
        id,
        content
    }),
    onOpenNote: id => dispatch({
        type: OPEN_NOTE,
        id
    }),
    onCloseNote: () => dispatch({
        type: CLOSE_NOTE
    })
});

const ConnectedNoteApp = MyConnect(mapStateToProps,mapDispatchToProps)(NoteApp);
export default ConnectedNoteApp;

