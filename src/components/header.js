import React from 'react';

class Header extends React.Component {
    onClick = (e) => { // Does anonymous function was used to avoid problems with context?
        if(e.target.id === 'init') localStorage.setItem('todoList', '[{"text":"aaaaa","date":"2019-12-26T21:00:00.000Z","completed":false,"id":0},{"text":"aaaaa","date":"2019-12-26T21:00:00.000Z","completed":false,"id":1},{"text":"aaaaa","date":"2019-12-27T21:00:00.000Z","completed":false,"id":2},{"text":"aaaaa","date":"2019-12-28T21:00:00.000Z","completed":false,"id":3},{"text":"bbbbb","date":"2019-12-26T21:00:00.000Z","completed":false,"id":4},{"text":"ccccc","date":"2019-12-26T21:00:00.000Z","completed":false,"id":5},{"text":"aabbcc","date":"2019-12-29T21:00:00.000Z","completed":false,"id":6},{"text":"aabbcc","date":"2019-12-26T21:00:00.000Z","completed":false,"id":7}]');
        this.props.onClick(e.target.id);
    }

    render() {
        return (
            <header className="main-header">
                <h1 id='init' onClick={this.onClick}>TodoList</h1>
                <i id='submit' onClick={this.onClick}>Submit</i>
                |
                <i id='find' onClick={this.onClick}>Find</i>
            </header>
        );
    }
}

export default Header;