import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from "../components/App";
import Vote from "../components/Vote";
import {connect} from "react-redux";
import Result from "../components/Result";

class Root extends Component{
    render(){
        let asd = document.URL;
        let zxc = asd.substring(23,28); //URL
        let poi = asd.substring(23); //URL
        // if(asd === `http://192.168.1.103:3000/v${zxc}`){
        //     document.location.reload()
        // }


        return(
            <Fragment>
                <Router>
                    <Fragment>
                        <Route exact={true} path={'/'} component={App}/>
                        <Route path={`/v${poi}`} exact={true} component={Vote}/>
                        <Route path={`/v${zxc}/result`} component={Result}/>
                    </Fragment>
                </Router>
            </Fragment>
        )
    }
}

let mapStateToProps = (state) => {
    return{
        url: state.postInfomation.url,
    };
}

Root = connect(mapStateToProps) (Root);

export default Root;