// @ts-check
import React from "react";

/**
 * @typedef {Object} Props
 * @prop {number} width
 * @prop {number} height
 * @prop {string=} lineColor
 * @prop {string=} fillColor
 * @prop {number=} lineWidth
 * @prop {string=} pointColor
 * @prop {number=} minPoints
 * @prop {number=} maxPoints
 * @prop {number=} proximity
 * @prop {string=} className
 * @prop {boolean=} disableAutoClosing
 * @prop {Coordinate[]} existingCoordinates
 * @prop {(coordinates: Coordinate[])=>void} onFinish
 * @prop {(coordinate: Coordinate)=>void} onPoint
 */

/**
 * @typedef {Object} Coordinate
 * @prop {number} x
 * @prop {number} y
 */

/**
 * @typedef {Object} State
 * @prop {Coordinate[]} coordinates
 * @prop {Coordinate=} activeCoordinate
 */

/**
  * @extends {React.Component<Props, State>}
  */

class ReactPolygonDrawer extends React.Component {

    /** @type {Props} */
    static defaultProps = {
        height: 400,
        width: 400,
        onFinish: console.log,
        onPoint: () => {},
        proximity: 20,
        existingCoordinates : [],
        lineWidth : 3,
        fillColor : "rgba(205, 92, 92, 0.5)",
        lineColor : '#FF3333',
        pointColor : '#FF3333',
        disableAutoClosing : false
    }

    /** @type {State} */
    state = {
        activeCoordinate: undefined,
        coordinates: [],
    }

    isDrawing = false;
    
    canvasRef = React.createRef();

    componentDidMount(){
        this.addListeners();
        this.clearCanvas();
        this.setDrawingFlag(true);
        this.drawfromPassedCoordinates();
    }

    componentWillUnmount(){
        this.removeListeners();
    }

    addListeners = () => {
        const {
            current
        } = this.canvasRef;
        if(!current) return;

        current.addEventListener("click", this.onClick);
        current.addEventListener("mousemove", this.onMouseover);
        
        if(!this.props.disableAutoClosing){
            current.addEventListener("dblclick", this.dblclick);
        }
    }

    removeListeners = () => {
        const {
            current
        } = this.canvasRef;
        if(!current) return;

        current.removeEventListener("click", this.onClick);
        current.removeEventListener("mousemove", this.onMouseover);

        if(!this.props.disableAutoClosing){
            current.removeEventListener("dblclick", this.dblclick);
        }
    }

    drawfromPassedCoordinates = () => {

        const {
            existingCoordinates: coordinates
        } = this.props;
        if(!coordinates?.length){
            return
        }
        const context = this.getCanvasContext();
        context.beginPath();
        context.moveTo(coordinates[0].x , coordinates[0].y );
        coordinates.forEach((coordinate, index) => {
            context.lineTo(coordinate.x , coordinate.y);
        });
        context.closePath();
        context.fillStyle =  this.props.fillColor;
        context.fill();
        context.strokeStyle = this.props.lineColor;
        context.lineWidth = this.props.lineWidth;
        context.stroke();
    }

    setDrawingFlag = (flag) => {
        this.isDrawing = flag;
    }

    clearCanvas = () => {
        const {
            width,
            height
        } = this.props;
        const canvasContext = this.getCanvasContext();;
        canvasContext.clearRect(0,0,width,height);
    }

    getCanvasContext = () => {
        if(this.canvasRef.current){
            const canvasContext = this.canvasRef.current.getContext("2d");
            return canvasContext;
        }
        return null;
    }

    dblclick = (_ev) => {
        const {
            coordinates
        } = this.state;

        const [{x, y}] = coordinates;

        this.pushCoordinates(x, y);

        this.redrawCoordinatesFromState();

        this.fillColor();

        this.setDrawingFlag(false);

        const finalCoordinates = [
            ...coordinates,
            coordinates[0]
        ]
        this.props.onFinish(finalCoordinates);

    }

    onClick = (ev) => {
        if(ev.detail === 2) return; // exclude dblclick
        if(!this.isDrawing){
            this.setDrawingFlag(true);
            this.redrawCoordinatesFromState();
            this.setState({
                coordinates: []
            }, this.redrawCoordinatesFromState);
        }

        const {
            offsetX,
            offsetY,
        } = ev;
        
        this.pushCoordinates(offsetX, offsetY);
        this.drawDot(offsetX, offsetY);
    }

    pushCoordinates = (x , y ) => {
        this.setState(({coordinates}) => {
            return {
                coordinates: [
                    ...coordinates, 
                    {
                        x,
                        y
                    }
                ]
            }
        })
    }

    onMouseover = (ev) => {
        if(!this.isDrawing){
            return
        }

        const {
            offsetX: x,
            offsetY: y,
        } = ev;
        
        this.setActiveCoordinate(x, y);
        this.clearCanvas();
        this.drawCoordinates();
        if(!this.props.disableAutoClosing)
        {
            this.showClosedLineHint();
        }

        const lastCoordinate = this.getLastCoordinate();
        if(lastCoordinate){
            this.drawLine(lastCoordinate, {
                x,
                y
            });
        }
    }

    fillColor = () => {

        const {
            coordinates
        } = this.state;

        if(coordinates.length < 2) return;

        const context = this.getCanvasContext();
        context.beginPath();

        coordinates.forEach((coordinate) => {
            context.lineTo(coordinate.x, coordinate.y);
        });

        context.fillStyle = this.props.fillColor;
        context.fill();
        context.strokeStyle = this.props.lineColor;
        context.lineWidth = this.props.lineWidth;
        context.stroke();
    }

    showClosedLineHint = () => {
        // from active, draw to first
        const {
            activeCoordinate,
            coordinates
        } = this.state;

        if(!activeCoordinate) return;
        if(coordinates.length < 2) return;

    
        const context = this.getCanvasContext();
        context.beginPath();
        coordinates.forEach((coordinate) => {
            context.lineTo(coordinate.x, coordinate.y);
        });

        context.lineTo(activeCoordinate.x, activeCoordinate.y);

        context.lineTo(coordinates[0].x, coordinates[0].y);

        context.fillStyle =  this.props.fillColor;
        context.fill();
        context.strokeStyle = this.props.lineColor;
        context.lineWidth = this.props.lineWidth;
        context.stroke();

        this.drawLine(activeCoordinate, coordinates[0])
    }

    getLastCoordinate = () => {
        const {
            coordinates
        } = this.state;

        if(coordinates.length){
            return coordinates[coordinates.length - 1];
        }
        return null;
    }

    drawCoordinates = () => {
        this.redrawCoordinatesFromState();

        if(this.props.disableAutoClosing)
        {
            const lastCoordinate = this.getLastCoordinate();
            if(lastCoordinate){
                this.disableAutoClosing(lastCoordinate);
            }
        }
    }

    redrawCoordinatesFromState = () => {

        this.clearCanvas();
        const {
            coordinates
        } = this.state;

        coordinates.forEach((coordinate, index) => {
            this.drawDot(coordinate.x, coordinate.y);
            if(index){
                this.drawLine(coordinates[index-1], coordinate);
            }
        });
    }

    /**
     * 
     * @param {Coordinate} from 
     * @param {Coordinate} to
     * @returns 
     */
    drawLine = (from, to) => {
        const context = this.getCanvasContext();
        if(!context) return;

        const {
            coordinates
        } = this.state;
        if(coordinates.length){

            context.beginPath();
            context.moveTo(from.x, from.y);
            context.lineTo(to.x, to.y);
            context.strokeStyle = this.props.lineColor;
            context.lineWidth = this.props.lineWidth;
            context.stroke();

        }
        
    }

    setActiveCoordinate = (x, y) => {
        this.setState({
            activeCoordinate: {
                x,
                y
            }
        })
    }

    drawDot = (x, y) => {
        const context = this.getCanvasContext();
        if(!context) return;
        context.beginPath()
        context.arc(x, y, 4, 0, 2*Math.PI);
        context.fillStyle = this.props.pointColor;
        context.fill();
    }

    /**
     * 
     * @param {Coordinate} coordinate
     * @returns 
     */
    disableAutoClosing = ({x,y}) => {
        const {
            coordinates
        } = this.state;

        if(coordinates.length < 2){
            return;
        }

        const {
            proximity
        } = this.props;

        if(!proximity) return;

        const{
            x: firstX,
            y: firstY
        } = coordinates[0];
        if((Math.abs(firstX - x) <= proximity) && (Math.abs(firstY - y) <= proximity)){
            this.setState(({coordinates})=>{
                const copyOfCoords = [...coordinates];
                coordinates.pop();
                coordinates.push({x: firstX,y: firstY})
                return {
                    coordinates
                }
            }, ()=>{
                this.redrawCoordinatesFromState();
                this.fillColor();
                this.setDrawingFlag(false);
                this.props.onFinish(coordinates);

            })
        }
        
    }

    render(){

        const {
            className,
            width,
            height
        } = this.props;
        return <React.Fragment>
            <canvas 
                id="polygon-drawer" 
                className={`polygon-drawer ${className}`}
                ref={this.canvasRef}
                width={width}
                height={height}
                key={width+height} // reset canvas when height, width changes
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
            />
        </React.Fragment>;
    }

}

export default ReactPolygonDrawer;