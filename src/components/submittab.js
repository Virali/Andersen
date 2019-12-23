import React from 'react';
import TodoItem from './todoitem';

class SubmitTab extends React.Component {
    constructor(props) {
        super(props);
        if(!localStorage.getItem('todoItems')) localStorage.setItem('todoItems', JSON.stringify([]));
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            text: '',
            date: '',
            todoList: [{text: "test1", date: '11/11/2019', completed: false, id: 0}, {text: "test2", date: '13/10/2018', completed: false, id: 1}],
        }
    }

    makeItemsList(items) {
        if(items == undefined) return;
        const count = this.makeCounter();
        const itemsList = items.map( (item) => <TodoItem {...item} onCheckboxChange = {this.onCheckboxChange} handleDelete = {this.handleDelete} key={count()}/> );
    
        return itemsList;
    }
    
    makeCounter() {
        let i = 0;
    
        return () => i++;
    }
    
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleSubmit() {
        const temporaryList = (this.state.todoList) ? [...this.state.todoList] : [];

        temporaryList.push({
            text: this.state.text, 
            date: this.state.date,
            completed: false,
            id: temporaryList.length
        });

        this.setState(state => {
            return {todoList: temporaryList}
        });
    }

    onCheckboxChange(id) {
        this.setState( state => {
            const todoList = state.todoList.map(item => { 
                if(item.id === id) item.completed = !item.completed 
            });

            return {todoList: todoList};
        });
    }

    handleDelete(id) {
        this.setState( state => {
            const todoList = state.todoList.filter( item => item.id !== id);

            return {todoList: todoList};
        });
    }

    render() {
        localStorage.setItem('todoItems', JSON.stringify(this.state.todoList));
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
                <div className="item-list"> {this.makeItemsList(this.state.todoList)} </div>
            </div>
        );
    }
}

export default SubmitTab;