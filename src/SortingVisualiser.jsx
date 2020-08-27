import React from 'react';
import { mergeSortAnimation } from './SortingAlgorithms/MergeSort';
import { insertionSortAnimation } from './SortingAlgorithms/InsertionSort';
import { heapSortAnimation } from './SortingAlgorithms/HeapSort';
import Caption from './Caption';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Icon from '@material-ui/core/Icon';

const COLOR1 = "rgb(52, 230, 170)";
const COLOR2 = "blueviolet";
const COLOR3 = "orangered";
const ANIMATION_SPEED = 50;
const NUMBER_OF_BAR = 10;

class SortingVisualiser extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            array: [],
            currentCaption: "",
            sliderValue: "5",
        };
    }

    componentDidMount(){
        this.genArray();
    }

    genArray(){
        const array = []
        for (let i = 0; i < NUMBER_OF_BAR*this.state.sliderValue; i++){
            array.push(randomIntFromInterval(5,1000));
        }
        this.setState({array:array})
    }

    heapSort(){
        const animations = heapSortAnimation(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++){
            if (animations[i][0] === 2){   
                const [bar1Idx, bar1Height, bar2Idx, bar2Height] = animations[i].slice(1);
                const bar1Style = arrayBars[bar1Idx].style;
                const bar2Style = arrayBars[bar2Idx].style;
                setTimeout(()=>{
                    bar1Style.height = `${bar1Height/10}%`;
                    bar2Style.height = `${bar2Height/10}%`;
                }, i * ANIMATION_SPEED * 1/this.state.sliderValue)                           
        } else{
            const [bar1Idx, bar2Idx] = animations[i].slice(1)
            const bar1Style = arrayBars[bar1Idx].style;
            const bar2Style = arrayBars[bar2Idx].style;
            let color;
            if (animations[i][0] === 1){
                color = COLOR2;
            } else if (animations[i][0] === 3){
                color = COLOR1;
            } else{
                color = COLOR3;
            }
            setTimeout(()=>{
                bar1Style.backgroundColor = color;
                bar2Style.backgroundColor = color;
            }, i * ANIMATION_SPEED * 1/this.state.sliderValue); 
            }                        
        } 

        return new Promise((resolve) => { 
            // Setting a delay equal to time needed for animation to play
            setTimeout(resolve, animations.length * ANIMATION_SPEED * 1/this.state.sliderValue); })
    }

    mergeSort(){
        const animations = mergeSortAnimation(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++){
            if (i % 3 === 0 || i % 3 === 1){
                // Change color or revert color animation
                const [bar1Idx, bar2Idx] = animations[i];
                const bar1Style = arrayBars[bar1Idx].style;
                const bar2Style = arrayBars[bar2Idx].style;
                const color = i % 3 === 0 ? COLOR2 : COLOR1; 
                // set time out so that animation shows one by one instead of all at once
                setTimeout(()=>{
                    bar1Style.backgroundColor = color;
                    bar2Style.backgroundColor = color;
                }, i * ANIMATION_SPEED * 1/this.state.sliderValue);

            } else {
                // Change height
                const [bar1Idx, newHeight] = animations[i];
                const bar1Style = arrayBars[bar1Idx].style;
                setTimeout(()=>{
                    bar1Style.height = `${newHeight/10}%`;
                }, i * ANIMATION_SPEED * 1/this.state.sliderValue)
            }
        }

        return new Promise((resolve) => { 
            // Setting a delay equal to time needed for animation to play
            setTimeout(resolve, animations.length * ANIMATION_SPEED * 1/this.state.sliderValue); })
    }

    insertionSort(){
        const animations = insertionSortAnimation(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++){
            if (animations[i][0] === 2 ) {
                const [bar1Idx, bar1Height, bar2Idx, bar2Height] = animations[i].slice(1);
                const bar1Style = arrayBars[bar1Idx].style;
                const bar2Style = arrayBars[bar2Idx].style;
                setTimeout(()=>{
                    bar1Style.height = `${bar1Height/10}%`;
                    bar2Style.height = `${bar2Height/10}%`;
                }, i * ANIMATION_SPEED * 1/this.state.sliderValue)               
            } else{
                const [bar1Idx, bar2Idx] = animations[i].slice(1)
                const bar1Style = arrayBars[bar1Idx].style;
                const bar2Style = arrayBars[bar2Idx].style;
                let color;
                if (animations[i][0] === 1){
                    color = COLOR2;
                } else if (animations[i][0] === 3){
                    color = COLOR1;
                } else{
                    color = COLOR3;
                }
                setTimeout(()=>{
                    bar1Style.backgroundColor = color
                    bar2Style.backgroundColor = color
                }, i * ANIMATION_SPEED * 1/this.state.sliderValue);                 
            } 
        }

        return new Promise((resolve) => { 
            // Setting a delay equal to time needed for animation to play
            setTimeout(resolve, animations.length * ANIMATION_SPEED * 1/this.state.sliderValue); })

    }

    captionHandler(currentCaption){
        // Update this state's caption property in order to update props of child component <Caption>
        this.setState({currentCaption: currentCaption})
        // when done, return promise to ensure set state precedes method for animations
        return Promise.resolve(true);
    }

    sliderHandler(){
        const input = document.getElementById("mySlider");
        const currentVal = input.value;
        this.setState({sliderValue: currentVal}); 
        this.genArray();      
    }

    disableNav(truth){
        document.getElementById("myButton").disabled = truth;
        document.getElementById("mySlider").disabled = truth;  
        document.getElementById("heapBtn").disabled = truth;
        document.getElementById("mergeBtn").disabled = truth;
        document.getElementById("insertionBtn").disabled = truth;
    }

    render(){
        var disableLink = false;
        return(
            <Container fluid>
                <Row>
                <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className="full-width">
                    <Navbar.Brand href="." >
                        Sorting Visualiser
                    </Navbar.Brand>
                    <NavItem>
                        <button className="btn btn-primary" onClick={()=>this.genArray()} id="myButton">
                            Generate array
                        </button>      
                    </NavItem>
                    <NavItem className="cn-align">
                        <Icon style={{color: `rgb(52, 230, 170)`}} className="center">speed</Icon>
                        <input id="mySlider" type="range" min="1" max="10" defaultValue="5" 
                            onInput={()=>this.sliderHandler()} step="1"/>
                    </NavItem>
                    <Navbar.Toggle/>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem className="cn-align">
                                <button className="nav-btn btn" id="heapBtn" onClick={()=>{
                                    this.captionHandler("Heap Sort").then(()=>{
                                        this.disableNav(true);
                                        // Run method for animations
                                        this.heapSort().then(()=>{
                                            this.disableNav(false);
                                        }) 
                                    })
                                    }}>
                                    Heap Sort
                                </button>
                            </NavItem>
    
                            <NavItem className="cn-align">
                                <button className="nav-btn btn" id="mergeBtn" onClick={()=>{
                                    this.captionHandler("Merge Sort").then(()=>{
                                        this.disableNav(true);
                                        // Run method for animations
                                        this.mergeSort().then(()=>{
                                            this.disableNav(false);
                                        }) 
                                    })
                                    }}>
                                    Merge Sort
                                </button>
                            </NavItem>

                            <NavItem className="cn-align">
                                <button className="nav-btn btn" id="insertionBtn" onClick={()=>{
                                    this.captionHandler("Insertion Sort").then(()=>{
                                        this.disableNav(true);
                                        // Run method for animations
                                        this.insertionSort().then(()=>{
                                            this.disableNav(false);
                                        }) 
                                    })
                                    }}>
                                    Insertion Sort
                                </button>
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>  
                </Row>
                <Row>           
                    <Caption currentCaption={this.state.currentCaption} ></Caption>
                </Row> 
                <Row className="row mt-5 center"> 
                    <div className="array-container center">
                        {this.state.array.map((value, index)=>(
                            <div 
                            className="array-bar" 
                            style={{height: `${value/10}%`,
                                    width: `${0.5*100/NUMBER_OF_BAR}%`,
                                    backgroundColor: COLOR1 }}
                            // assigning the key property ensures DOM reinitialises the element
                            key={index}>
                            </div>
                        ))}
                    </div>
                </Row>

                

            </Container>
        );
    }

}

function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export default SortingVisualiser