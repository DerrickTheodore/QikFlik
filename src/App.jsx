import React from 'react';
import MyFancyComponent from './MyFancyComponent.jsx';

class App extends React.Component{
  constructor(props){
    super(props)
  }


  componentDidMount(){

  }

  render(){
    return (
     <MyFancyComponent />
    )
  }
}

export default App;