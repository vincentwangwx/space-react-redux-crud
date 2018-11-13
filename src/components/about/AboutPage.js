import React from 'react';
let arr = [12,69,180,8763];
 
let result = arr.reduce((tmp, item, index) => {
   console.log(tmp, item, index);
   return tmp + item;
});

class AboutPage extends React.Component{

    render(){
        return(
            <div>
                <h1>About</h1>
                <p>This application help us to chose course interesting.</p>
                <div>{result}</div>
            </div>
        );
    }
}

export default AboutPage;