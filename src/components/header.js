import React from 'react';

class Header extends React.Component {
    onClick = (e) => { // Does anonymous function was used to avoid problems with context?
        this.props.onClick(e.target.id);
    }

    render() {
        return (
            <header className="main-header">
                <h1>TodoList</h1>
                <i id='submit' onClick={this.onClick}>Submit</i>
                |
                <i id='find' onClick={this.onClick}>Find</i>
            </header>
        );
    }
}

export default Header;