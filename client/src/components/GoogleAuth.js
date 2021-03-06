import React from "react";
import { signIn, signOut } from "../actions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

class GoogleAuth extends React.Component{
    
    componentDidMount(){
        window.gapi.load('client:auth2', ()=>{
            window.gapi.client.init({
                clientId : 
                '537375197328-vjskseoaeq82cdjb8jhnulor01boosj2.apps.googleusercontent.com',
                scope : 'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChnage(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChnage);
            });
        })
    }

    onAuthChnage = (isSignedIn) => {
       if(isSignedIn === true){
           this.props.signIn(this.auth.currentUser.get().getId());
       }
       else{
           this.props.signOut();
       }
    }

    handleSignIn = () => {
        this.auth.signIn();
    }

    handleSignOut = () => {
        this.auth.signOut();
    }

    renderAuthButton = () => {
        if(this.props.isSignedIn === null){
            return null;
        }
        else if(this.props.isSignedIn === true){
            return <button className = "header__login-btn" onClick={this.handleSignOut}>{<FontAwesomeIcon icon = {faGoogle} />} Sign Out</button>
        }
        else{
            return <button className = "header__login-btn" onClick={this.handleSignIn}>{<FontAwesomeIcon icon = {faGoogle} />} Sign In</button>
        }
    }

    render() {      
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (store) => {
    return {
        isSignedIn : store.auth.isSignedIn,
    } 
}
export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);