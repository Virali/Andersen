import React from 'react';
import TodoItem from './todoitem';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class FindTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            date: new Date(),
        }
    }
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleDateChange = date => {
        this.setState({
            date: date
        });
    };

    render() {
        return (
            <div className="submit-tab">
                <form className="submit-form">
                    <input 
                        className="input-title" 
                        type="text" 
                        name="text" 
                        placeholder="Find your todo..." 
                        value={this.state.text}
                        onChange={this.onChange}
                    />
                    <DatePicker
                        className='date-title'
                        selected={this.state.date}
                        onChange={this.handleDateChange}
                    />
                    <input 
                        type="button" 
                        className="btn"
                        value="Find"
                        onClick={console.log('clicked')}
                    />
                </form>
                <div className="item-list"> {this.makeItemsList(this.state.todoList)} </div>
            </div>
        );
    }
}

export default FindTab;