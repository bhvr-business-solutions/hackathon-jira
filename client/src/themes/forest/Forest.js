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
            <div class="forest-container">
                <div className="imageFirst"></div>
                <div className="imageSecond-green-bush"></div>
                <div className="imageThird-first-tree-structure"></div>
                <div className="imageFourth-second-tree-structure"></div>
                <div className="imageFifth-third-tree-structure"></div>
                <div className="imageSix-fourth-tree-structure"></div>
                <div className="imageSeven-fifth-tree-structure"></div>
                <div className="imageEight-tree-head"></div>
                <div className="imageNine-light-first"></div>
                <div className="imageTen-light-second"></div>
            </div>
        );
    }
}

export default Forest;