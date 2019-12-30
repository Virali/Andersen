export default (state = 0, action) => {
    //arrow function has clearer semanticks in ES6, but what exactly is it about?
        switch(action.type) {
            case 'INCREMENT':
                return (state + 1);
            case 'DECREMENT': 
                return state - 1;
            default:
                return state;
        }  
    }