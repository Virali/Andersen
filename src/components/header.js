import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header className="main-header">
                <h1>TodoList</h1>
                <i>Submit</i>
                |
                <i>Find</i>
            </header>
        );
    }
}

export default Header;