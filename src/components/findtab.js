import React from 'react';

class FindTab extends React.Component {
    render() {
        return (
            <div className="find-tab">
                <form className="find-form">
                    <input className="input-title" type="text" name="title" placeholder="Add Todo..." value=""></input>
                    <input type="submit" className="btn" value="Submit"></input>
                </form>
            </div>
        );
    }
}

export default FindTab;