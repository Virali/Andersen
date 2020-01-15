import React from 'react';
import Header from './components/header';
import SubmitTab from './components/submittab';
import FindTab from './components/findTab';


//////////////////////////////////

class App extends React.Component {
    constructor(props) {
        super(props);
        if(localStorage.getItem('todoList') == false) localStorage.setItem('todoList', '[{"text":"aaaaa","date":"2019-12-26T21:00:00.000Z","completed":false,"id":0},{"text":"aaaaa","date":"2019-12-26T21:00:00.000Z","completed":false,"id":1},{"text":"aaaaa","date":"2019-12-27T21:00:00.000Z","completed":false,"id":2},{"text":"aaaaa","date":"2019-12-28T21:00:00.000Z","completed":false,"id":3},{"text":"bbbbb","date":"2019-12-26T21:00:00.000Z","completed":false,"id":4},{"text":"ccccc","date":"2019-12-26T21:00:00.000Z","completed":false,"id":5},{"text":"aabbcc","date":"2019-12-29T21:00:00.000Z","completed":false,"id":6},{"text":"aabbcc","date":"2019-12-26T21:00:00.000Z","completed":false,"id":7}]');
        this.state = {
            flag: '',
        }
    }

    onClick(id) {
        this.setState({flag: id});
    }

    render() {
        const flag = this.state.flag;
        let tab;
        if(flag === 'find') {
          tab = <FindTab/>
        } else {
          tab = <SubmitTab/>
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