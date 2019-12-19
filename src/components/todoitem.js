import React from 'react';

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
            date: props.date,
            completed: props.completed,
            id: props.id,
        };
    }

    onChange = (e) => {
        const temporaryState = this.state;
        const temporaryItemList = JSON.parse(localStorage.getItem('todoItems'));

        temporaryItemList.find(item => item.id == this.state.id).completed = !this.state.completed;
        localStorage.setItem('todoItems', JSON.stringify(temporaryItemList));

        temporaryState.completed = !this.state.completed;
        this.setState(temporaryState);
    }

    onClick() {
        const temporaryItemList = JSON.parse(localStorage.getItem('todoItems'));

        temporaryItemList.splice(temporaryItemList.findIndex( item => item.id == this.state.id) , 1);
        localStorage.setItem('todoItems', JSON.stringify(temporaryItemList));
    }

    getStyle() {
        return {
            marginLeft: '20px',
            fontSize: '21px',
            lineHeight: '14px',
            textDecoration: this.state.completed ? 'line-through' : 'none',
        }
    }

    render() {
        return (
            <div className="todo-item">
                <input type="checkbox" checked={this.state.completed} onChange={this.onChange}/>
                <p style={this.getStyle()}> {this.state.text} </p>
                <p style={{ position: 'absolute', right : '12%'}}> {getDate(this.state.date)} </p>
                <button className="delete-btn" onClick={() => this.onClick()}>Delete</button>
            </div>
        );
    }
}

function getDate(datestring) {
    const parts = datestring.split('/');
    const formattedDate = new Date(parts[2],parts[1],parts[0]);

    return (formattedDate) ? formattedDate.toDateString() : 'Wrong Input';
}

export default TodoItem;