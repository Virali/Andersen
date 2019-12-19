import React from 'react';
import Header from './components/header';
import StorageBox from './components/storagebox';


//////////////////////////////////

class App extends React.Component {
    render() {
        return (
            <div>
                <Header ></Header>
                <br/>
                <StorageBox></StorageBox>
            </div>
        );
    }
}

export default App;