import React from 'react';

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.getStyle = this.getStyle.bind(this);
    }

    handleChange() {
        this.props.onCheckboxChange(this.props.id);
    }

    handleDelete() {
        this.props.handleDelete(this.props.id);
    }

    getStyle() {
        return {
            marginLeft: '20px',
            fontSize: '21px',
            lineHeight: '14px',
            textDecoration: this.props.completed ? 'line-through' : 'none',
            color: 'grey',
        }
    }

    render() {
        return (
            <div className="todo-item">
                <input type="checkbox" checked={this.props.completed} onChange={this.handleChange}/>
                <p style={this.getStyle()}> {this.props.text} </p>
                <p style={{ position: 'absolute', right : '12%'}}> {this.props.date.toDateString()} </p>
                <button className="delete-btn" onClick={this.handleDelete}>Delete</button>
            </div>
        );
    }
}

export default TodoItem;