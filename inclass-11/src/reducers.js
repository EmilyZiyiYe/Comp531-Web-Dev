
const Reducer = (state =  {
	nextId: 2,
	todoItems: [
	    {id: 0, text: "This is an item", done: false},
	    {id: 1, text: "Another item", done: false}
	]
}, action) => {
	switch(action.type) {
		case 'ADD_TODO':
			return {
                todoItems: [...state.todoItems,
                {id: state.nextId, text: action.text, done: false}],
                nextId: state.nextId + 1
            }
            
		case 'REMOVE_TODO':
			return {
                nextId: state.nextId - 1,
                todoItems: state.todoItems.filter(t => t.id !== action.id)
            }
		case 'TOGGLE_TODO':
			
            return {
                ...state,
                todoItems: state.todoItems.map(t => {
                if(t.id === action.id) {
                    return {...t,
                            done: !t.done
                            }
                } 
                else {
                    return t
                }
            })}
		default: 
			return state
	}
}

export default Reducer