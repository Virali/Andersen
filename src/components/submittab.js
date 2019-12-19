import React from 'react';
import TodoItem from './todoitem';

class SubmitTab extends React.Component {
    constructor(props) {
        super(props);
        if(!localStorage.getItem('todoItems')) localStorage.setItem('todoItems', JSON.stringify([]));
        this.state = {
            text: '',
            date: '',
        }
    }
    
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    // const parts = e.target.value.split('/');
    //         this.setState({ 'date': new Date(parts[2],parts[1]-1,parts[0]) })

    handleSubmit() {
        const todoitems = JSON.parse( localStorage.getItem('todoItems') );
        todoitems.push({
            text: this.state.text, 
            date: this.state.date,
            completed: false,
            id: todoitems.length
        });
        localStorage.setItem('todoItems', JSON.stringify(todoitems));        
    }

    render() {
        return (
            <div className="submit-tab">
                <form className="submit-form">
                    <input 
                        className="input-title" 
                        type="text" 
                        name="text" 
                        placeholder="Add Todo..." 
                        value={this.state.text}
                        onChange={this.onChange}
                    />

                    <input
                        className='input-title'
                        style={{width: '16%', flex: 'none'}}
                        type="text"
                        name="date"
                        placeholder="dd/mm/yyyy"
                        value={this.state.date}
                        onChange={this.onChange}
                    />

                    <input 
                        type="submit" 
                        className="btn" 
                        value="Submit"
                        onClick={this.handleSubmit.bind(this)}
                    />
                </form>
                <div className="item-list"> {makeItemsList(JSON.parse(localStorage.getItem('todoItems')))} </div>
            </div>
        );
    }
}

function makeItemsList(items) {
    const itemsList = items.map( (item) => <TodoItem {...item} key={count()}/> );

    return itemsList;
}

function makeCounter() {
    let i = 0;

    return () => i++;
}

const count = makeCounter();

export default SubmitTab;