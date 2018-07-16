const initialState = [
    {text: "Write code!"}
  ];
  
  
  export default function lists(state=initialState, action) {
    let allLists = state.slice();

    switch (action.type) {

      case 'ADD_LIST':
      return [...state, {text: action.text}];

    case 'UPDATE_LIST':
      let listToUpdate = allLists[action.id]
      listToUpdate.text = action.text;
      allLists.splice(action.id, 1, listToUpdate);
      return allLists;

    case 'DELETE_LIST':
      allLists.splice(action.id, 1);
      return allLists;

    default:
      return state;
    }
  }