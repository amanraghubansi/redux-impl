export const CREATE_NOTE = 'CREATE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const OPEN_NOTE = 'OPEN_NOTE';
export const CLOSE_NOTE = 'CLOSE_NOTE';

const initialState = {
  nextNoteId: 1,
  notes: {},
  openNoteId: null
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE: {
      const id = state.nextNoteId;
      const newNote = {
        id,
        content: ''
      };
      return {
        ...state,
        nextNoteId: id + 1,
        openNoteId: id,
        notes: {
          ...state.notes,
          [id]: newNote
        }
      };
    }
    case UPDATE_NOTE: {
      const {id, content} = action;
      const editedNote = {
        ...state.notes[id],
        content
      };
      return {
        ...state,
        notes: {
          ...state.notes,
          [id]: editedNote
        }
      };
    }
    case OPEN_NOTE: {
      return {
        ...state,
        openNoteId: action.id
      };
    }
    case CLOSE_NOTE: {
      return {
        ...state,
        openNoteId: null
      };
    }
    default:
      return state;
  }
};

export default noteReducer;

