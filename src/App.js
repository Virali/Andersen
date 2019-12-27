import React from 'react';
import Header from './components/header';
import SubmitTab from './components/submittab';
import FindTab from './components/findTab';


//////////////////////////////////

class App extends React.Component {
    constructor(props) {
        super(props);
        if(localStorage.getItem('todoList') == false) localStorage.setItem('todoList', '[{"text":"aaaaa","date":"2019-12-26T21:00:00.000Z","completed":false,"id":0},{"text":"aaaaa","date":"2019-12-26T21:00:00.000Z","completed":false,"id":1},{"text":"aaaaa","date":"2019-12-27T21:00:00.000Z","completed":false,"id":2},{"text":"aaaaa","date":"2019-12-28T21:00:00.000Z","completed":false,"id":3},{"text":"bbbbb","date":"2019-12-26T21:00:00.000Z","completed":false,"id":4},{"text":"ccccc","date":"2019-12-26T21:00:00.000Z","completed":false,"id":5},{"text":"aabbcc","date":"2019-12-29T21:00:00.000Z","completed":false,"id":6},{"text":"aabbcc","date":"2019-12-26T21:00:00.000Z","completed":false,"id":7}]');
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.state = {
            flag: '',
            todoList: JSON.parse(localStorage.getItem('todoList')).map(item => {
                item.date = new Date(item.date);
                return item; 
            }),
        }
    }

    onClick(id) {
        this.setState({flag: id});
    }

    handleSubmit(item) {
        const temporaryList = this.state.todoList;

        temporaryList.push(item);
        localStorage.setItem('todoList', JSON.stringify(temporaryList));

        this.setState(state => {
            return {todoList: temporaryList}
        });
    }

    handleDelete(id) {
        this.setState( state => {
            const todoList = state.todoList.filter( item => item.id !== id);

            localStorage.setItem('todoList', JSON.stringify(todoList));
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