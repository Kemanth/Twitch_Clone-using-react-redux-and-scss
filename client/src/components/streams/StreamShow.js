import React from "react";
import { fetchStream } from "../../actions";
import { connect } from "react-redux";
import FlvJs from "flv.js";

class StreamShow extends React.Component {

    constructor (props) {
        super(props)
        this.videoRef = React.createRef();
    }

    componentDidMount () {
        const {id} = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate () {
        this.buildPlayer();
    }

    componentWillUnmount () {
        this.player.destroy();
    }

    buildPlayer = () => {
        if(this.player || !this.props.stream){
            return;
        }

        const {id} = this.props.match.params;
        this.props.fetchStream(id);
        this.player = FlvJs.createPlayer({
            type : 'flv',
            url : `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render(){

        if(!this.props.stream){
            return <div>Loading ...</div>
        }

        const {title, description} = this.props.stream;

        return(
            <div className = "streamShow">
                <video ref = {this.videoRef} style = {{width : '100%'}} controls = {true}/>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        );
    }
}

const mapStateToProps = (store, ownProps) => {
    return {
        stream : store.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchStream})(StreamShow);