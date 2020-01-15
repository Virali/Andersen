let nextTodoId = 0;

export const addTodo = (text, date) => {
   console.log("action");
   return {
   type: 'ADD_TODO',
   id: nextTodoId++, 
   text,
   date
}}

export const toggleTodo = id => ({
   type: 'TOGGLE_TODO',
   id
})

export const deleteTodo = id => ({
   type: 'DELETE_TODO',
   id
})

// export const filterList = (text, date) => ({
//    type: 'FILTER_LIST',
//    text,
//    date
// })