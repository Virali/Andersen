import React from 'react';
import Header from './components/header';
import SubmitTab from './components/submittab';
import FindTab from './components/findTab';


//////////////////////////////////

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.state = {
            flag: '',
            todoList: [],
        }
    }

    onClick(id) {
        this.setState({flag: id});
    }

    handleSubmit(item) {
        const temporaryList = this.state.todoList;

        temporaryList.push(item);

        this.setState(state => {
            return {todoList: temporaryList}
        });
    }

    handleDelete(id) {
        this.setState( state => {
            const todoList = state.todoList.filter( item => item.id !== id);

            return {todoList: todoList};
        });
    }

    onCheckboxChange(id) {
        this.setState( state => {
            const todoList = state.todoList.map(item => { 
                if(item.id === id) {
                    item.completed = !item.completed;
                }
                return item;
            });

            return {todoList: todoList};
        });
    }

    render() {
        const flag = this.state.flag;
        let tab;
        if(flag === 'find') {
            tab = <FindTab 
                todoList={this.state.todoList} 
                handleSubmit={this.handleSubmit} 
                handleDelete={this.handleDelete} 
                onCheckboxChange={this.onCheckboxChange}
                />
        } else {
            tab = <SubmitTab
                todoList={this.state.todoList} 
                handleSubmit={this.handleSubmit} 
                handleDelete={this.handleDelete} 
                onCheckboxChange={this.onCheckboxChange}
            />
        }

        return (
            <div>
                <Header onClick={this.onClick.bind(this)}></Header>
                <br/>
                <div className="storage-box">
                    {tab}
                </div>
            </div>
        );
    }
}

export default App;