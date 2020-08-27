import React from 'react';
import Card from 'react-bootstrap/Card';

class Caption extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            title: "",
            description: "",
            time: "",
            space: "",
        };
    }

    componentDidMount(){
        this.resetCard();
    }

    componentDidUpdate(prevProps){
        if (prevProps.currentCaption !== this.props.currentCaption){
            if (this.props.currentCaption === "Heap Sort"){
                this.heapCard()
            } else if (this.props.currentCaption === "Merge Sort"){
               this.mergeCard()
            } else if (this.props.currentCaption === "Insertion Sort"){
                this.insertionCard()
            } else{
                this.resetCard()
            }
        }
    }

    resetCard(){
        this.setState({
            title: "Welcome to Sorting Visualiser!",
            description: "Click 'Generate array' to generate a random array." ,
            time: "Use the slider to adjust the speed of animation and size of array.",
            space: "Click 'Heap Sort', 'Merge Sort' or 'Insertion Sort' in the top menu to start sorting!",
        })
    }
    
    heapCard(){
        this.setState({
            title: "Heap Sort",
            description: "It is called 'heap' sort because a 'heap' data structure is implemented to repeatedly choose the largest item more quickly.",
            time: "Time complexity: O(n log(n))",
            space: "Space complexity: O(1)",
        })
    }

    mergeCard(){
        this.setState({
            title: "Merge Sort",
            description: "Merge sort is a divide-and-conquer algorithm that recursively splits the array in half and sorts each half, and then merge the sorted halves.",
            time: "Time complexity: O(n log(n)) ",
            space: "Space complexity: O(n)",
        })       
    }

    insertionCard(){
        this.setState({
            title: "Insertion Sort",
            description: "Insertion sort works by inserting elements from an unsorted array to a sorted array. This is also how most people sort a poker hand.",
            time: "Time complexity: O(n^2)" ,
            space: "Space complexity: O(1)",
        })       
    }

    render(){
        return(
            <Card className="center card-size">
            <Card.Body>
                <Card.Title>
                    {this.state.title}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted card-font">
                    {this.state.description}
                </Card.Subtitle>
                <Card.Text className="card-font">
                    {this.state.time}
                </Card.Text>
                <Card.Text className="card-font">
                    {this.state.space}
                </Card.Text>
            </Card.Body>
        </Card>
        )
    }
}



export default Caption