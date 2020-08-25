import React, {Component} from 'react';
import '../css/Rectangle.css'


class Rectangle extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (

    // <div className="rectangle" style={props.heightStyle}>
    // {props.heightStyle}
    // </div>

    <p>
    hello! {this.props.height}
    </p>
  )
  }

}



export default Rectangle;
