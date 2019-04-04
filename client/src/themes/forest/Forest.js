import React, { Component } from 'react';
import './Forest.css';

// import layer0 from './images/Layer_0000_9.png';
// import layer1 from './images/Layer_0001_8.png';
// import layer2 from './images/Layer_0002_7.png';
// import layer3 from './images/Layer_0003_6.png';
// import layer4 from './images/Layer_0004_Lights.png';
// import layer5 from './images/Layer_0005_5.png';
// import layer6 from './images/Layer_0006_4.png';
// import layer7 from './images/Layer_0007_Lights.png';
// import layer8 from './images/Layer_0008_3.png';
// import layer9 from './images/Layer_0009_2.png';
// import layer10 from './images/Layer_0010_1.png';

class Forest extends Component {
    render() {
        return (
            <div className="forest-container">
                <div className="layer0"></div>
                <div className="layer1"></div>
                <div className="layer2"></div>
                <div className="layer3"></div>
                <div className="layer5"></div>
                <div className="layer6"></div>
                <div className="layer8"></div>
                <div className="layer9"></div>
            </div>
        );
    }
}

export default Forest;