const todo = (state, action) => {
   switch(action.type) {
      case 'ADD_TODO': 
         return {
            id: action.id,
            text: action.text,
            date: action.date,
            completed: false,
         };
      case 'TOGGLE_TODO':
            if(state.id !== action.id) {
               return state;
            }

            return {
               ...state,
               completed: !state.completed,
            };
      default: 
         return state;
   }
}

export const todos = (state = [], action) => {
   switch(action.type) {
      case 'ADD_TODO':
         console.log('reducer');
         return [
            ...state,
            todo(undefined, action),
         ];
      case 'TOGGLE_TODO':
         return state.map(t => todo(t, action));
      case 'DELETE_TODO':
         return state.filter(t => t.id !== action.id);
      default:
         return state;
   }
}