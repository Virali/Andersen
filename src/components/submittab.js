import React from 'react';
import TodoItem from './todoitem';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class SubmitTab extends React.Component {
    constructor(props) {
        super(props);
        this.makeList = this.makeList.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            text: '',
            date: null,
            emptyText: false,
            emptyDate: false,
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
    
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleDateChange = date => {
        this.setState({
            date: date
        });
    };

    handleSubmitItem(e) {
        const item = {
            text: this.state.text, 
            date: this.state.date,
            completed: false,
            id: this.props.todoList.length
        };

        if(item.text == '' || item.date == '' || item.date == null) {
            if(item.text == '') this.setState({ emptyText: true });
            if(item.date == '' || item.date == null) this.setState({ emptyDate: true });
            e.preventDefault();
            return;  
        }

        this.props.handleSubmit(item);
        e.preventDefault();
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
                        style={(this.state.emptyText) ? {border: 'solid #ff8989', backgroundColor: '#ffe1e1',} : {}}
                    />
                    <DatePicker
                        id='date'
                        className='date-title'
                        selected={this.state.date}
                        onChange={this.handleDateChange}
                        style={(this.state.emptyDate) ? {border: 'solid #ff8989', backgroundColor: '#ffe1e1',} : {}}
                    />
                    <input
                        id='launcher' 
                        type="submit" 
                        className="btn" 
                        value="Submit"
                        onClick={this.handleSubmitItem.bind(this)}
                    />
                </form>
                <div className="item-list"> {this.makeList(this.props.todoList)} </div>
            </div>
        );
    }
}

export default SubmitTab;