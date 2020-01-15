import React from 'react';
import TodoItem from './todoitem';
import { connect } from 'react-redux';
import { addTodo } from '../actions/actions';

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
            count: this.makeCounter(),
        }
    }
    
    makeCounter() {
        let i = 0;
    
        return () => i++;
    }

    makeList(items) {
        if(items === [] || items == undefined) return;
        const itemsList = items.map( (item) => <TodoItem {...item} /*onCheckboxChange = {this.props.onCheckboxChange} handleDelete = {this.props.handleDelete}*/ key={item.id}/> );
    
        return itemsList;
    }
    
    onChange = (e) => { 
        this.setState({ 
            [e.target.name]: e.target.value,
            emptyText: false,
        });
        e.preventDefault();
    }

    handleDateChange = (e) => {
        let dateData = e.target.value.split('-');
        dateData[1]--;
        console.log('dateData :', dateData);
        this.setState({
            date: dateData[0]? new Date(...dateData) : null,
            emptyDate: false,
        });
    };

    handleSubmitItem(e) {
        console.log(e);
        console.log('date', this.state.date);
        if(this.state.text === '' || this.state.date === '' || this.state.date == null) {
            if(this.state.text === '') this.setState({ emptyText: true });
            if(this.state.date === '' || this.state.date == null) this.setState({ emptyDate: true });
            e.preventDefault();
            return;  
        }

        this.props.addTodo(this.state.text, this.state.date);
        this.setState({
            text: '',
            date: null
        })
        e.preventDefault();
    }

    render() {
        console.log(this.props);
        return (
            <div className="submit-tab">
                <form className="submit-form">
                    <input
                        className={(this.state.emptyText) ? 'input-title-empty' : 'input-title'} 
                        type="text"
                        name="text" 
                        placeholder="Add Todo..." 
                        value={this.state.text}
                        onChange={this.onChange}
                    />
                    <input
                        type='date'
                        id='date'
                        className={(this.state.emptyDate) ? 'date-title-empty' : 'date-title'}
                        selected={this.state.date}
                        onChange={this.handleDateChange}
                    />
                    <input
                        id='launcher' 
                        type="submit" 
                        className="btn" 
                        value="Submit"
                        onClick={this.handleSubmitItem.bind(this)}
                    />
                </form>
                <div className="item-list"> {this.makeList(this.props.state)} </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state
})

const mapDispatchToProps = {
    addTodo,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)
(SubmitTab);