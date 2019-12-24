import React from 'react';
import Header from './components/header';
import SubmitTab from './components/submittab';


//////////////////////////////////

class App extends React.Component {
    render() {
        return (
            <div>
                <Header ></Header>
                <br/>
                <div className="storage-box">
                    <SubmitTab></SubmitTab>
                {/* <FindTab></FindTab> */}
                </div>
            </div>
        );
    }
}

export default App;