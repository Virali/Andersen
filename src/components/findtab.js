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
            date: null,
            ascendingOrder: true,
        }
    }
    
    makeCounter() {
        let i = 0;
    
        return () => i++;
    }

    makeList(originalItems) {
        if(originalItems == undefined) return;
        const items = [...originalItems];

        if(this.state.ascendingOrder === true) items.sort( (a,b) => {return a.date - b.date} );
        else items.sort( (a,b) => {return b.date - a.date} );

        const count = this.makeCounter();
        const itemsList = items.map( (item) => <TodoItem {...item} onCheckboxChange = {this.props.onCheckboxChange} handleDelete = {this.props.handleDelete} key={count()}/> );
    
        return itemsList;
    }
    
    filterItems(searchText, searchDate, items) {
        let filteredItems;

        function compareDates(date1, date2) {
            return (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate());
        }

        if(searchText !== '' && searchDate !== null) {
            filteredItems = items.filter(item => item.text.includes(searchText) && compareDates(item.date, searchDate));
        } else {
            if(searchText !== '') {
                filteredItems = items.filter(item => item.text.includes(searchText));
            } else if(searchDate != null) {
                filteredItems = items.filter(item => compareDates(item.date, searchDate));
            }
        }

        return (filteredItems) ? filteredItems : items;
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onClick() {
        this.setState({ ascendingOrder: !this.state.ascendingOrder});
    }

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
                        placeholder="Add Todo..." 
                        value={this.state.text}
                        onChange={this.onChange}
                    />
                    <DatePicker
                        id='date'
                        className='date-title'
                        selected={this.state.date}
                        onChange={this.handleDateChange}
                    />
                    <input
                        id='launcher' 
                        type="button" 
                        className="btn"
                        style={{ 'backgroundColor': '#ffbf00', 'border': '0.1rem solid #d0a707', 'padding': '0.1rem', minWidth: '12%'}}
                        value={(this.state.ascendingOrder) ? 'earliest' : 'latest'}
                        onClick={this.onClick.bind(this)}
                    />
                </form>
                <div id='itemList' className="item-list"> {this.makeList(this.filterItems(this.state.text, this.state.date, this.props.todoList))} </div>
            </div>
        );
    }
}

export default FindTab;