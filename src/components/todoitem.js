import React from 'react';

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.getDate = this.getDate.bind(this);
        this.getStyle = this.getStyle.bind(this);
        // this.state = {
        //     text: props.text,
        //     date: props.date,
        //     completed: props.completed,
        //     id: props.id,
        // };
    }

    getDate(datestring) {
        const parts = datestring.split('/');
        const formattedDate = new Date(parts[2],parts[1],parts[0]);
    
        return (formattedDate) ? formattedDate.toDateString() : 'Wrong Input';
    }

    handleChange() {
        this.props.onCheckboxChange(this.props.id);
    }

    onClick() {
        const temporaryItemList = JSON.parse(localStorage.getItem('todoItems'));

        temporaryItemList.splice(temporaryItemList.findIndex( item => item.id === this.state.id) , 1);
        localStorage.setItem('todoItems', JSON.stringify(temporaryItemList));
    }

    getStyle() {
        return {
            marginLeft: '20px',
            fontSize: '21px',
            lineHeight: '14px',
            textDecoration: this.props.completed ? 'line-through' : 'none',
        }
    }

    render() {
        return (
            <div className="todo-item">:
                <input type="checkbox" checked={this.props.completed} onChange={this.handleChange}/>
                <p style={this.getStyle()}> {this.props.text} </p>
                <p style={{ position: 'absolute', right : '12%'}}> {this.getDate(this.props.date)} </p>
                <button className="delete-btn" onClick={() => this.onClick()}>Delete</button>
            </div>
        );
    }
}

export default TodoItem;