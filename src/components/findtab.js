import React from 'react';
import TodoItem from './todoitem';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class FindTab extends React.Component {
    constructor(props) {
        super(props);
        this.makeList = this.makeList.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            text: '',
            date: new Date(),
            order: 'earliest',
            filteredList: this.props.todoList,
        }
    }
    
    makeCounter() {
        let i = 0;
    
        return () => i++;
    }

    makeList(items) {
        if(items == undefined) return;
        const count = this.makeCounter();
        const itemsList = items.map( (item) => <TodoItem {...item} onCheckboxChange = {this.props.onCheckboxChange} handleDelete = {this.props.handleDelete} key={count()}/> );
    
        return itemsList;
    }
    
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

        
    }

    match(text, date) {
        
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
                    <DatePicker
                        id='date'
                        className='date-title'
                        selected={this.state.date}
                        onChange={this.onChange}
                    />
                    <input
                        id='launcher' 
                        type="button" 
                        className="btn"
                        style={{ 'backgroundColor': '#ffbf00', 'border': '0.1rem solid #d0a707', 'padding': '0.1rem'}}
                        value={this.state.order}
                        onClick={console.log('clicked')}
                    />
                </form>
                <div className="item-list"> {this.makeList(this.props.todoList)} </div>
            </div>
        );
    }
}

export default FindTab;