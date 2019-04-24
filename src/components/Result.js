import React, {Component} from 'react';
import axios from 'axios';
import {connect} from "react-redux";
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import CanvasJSReact from './canvasjs-2.3.1/canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;



class Result extends Component{


    state={
        ques:'',
        ans1:'',
        ans2: '',
        total: '',
        ans11:'',
        ans22:''
    }
    componentDidMount(){
        let asd = document.URL;
        let zxc = asd.substring(23,28);  //URL
        axios.get(`http://voting-app-uwbfb.run.goorm.io/api/result/${zxc}`)
            .then(res=>{
                console.log(res)
                this.setState({
                    ques: res.data.ques,
                    ans1: res.data.ans1,
                    ans2: res.data.ans2,
                    ans11: res.data.ans11,
                    ans22: res.data.ans22,
                    total: res.data.total,
                })
                localStorage.ques = res.data.ques;
                localStorage.ans1 = res.data.ans1;
                localStorage.ans2 = res.data.ans2;
                localStorage.ans11 = res.data.ans11;
                localStorage.ans22 = res.data.ans22;
                localStorage.total = res.data.total;
            })
    }
    render(){
        window.history.pushState(null, null, document.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };


        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "dark2", // "light1", "dark1", "dark2"
            title:{
                text: localStorage.ques
            },
            data: [{
                type: "pie",
                indexLabel: "{label}: {y}명",
                startAngle: -90,
                dataPoints: [
                    { y: localStorage.ans11, label: localStorage.ans1 },
                    { y: localStorage.ans22, label: localStorage.ans2 }
                ]
            }]
        }

        return(
            <Container3>
                <h2>총 투표수 : {this.state.total}번</h2>
                <h3>{this.state.ans1} : {this.state.ans11}번</h3>
                <h3>{this.state.ans2} : {this.state.ans22}번</h3>
                <Link to={'/'}><h4>처음페이지로 돌아가기</h4></Link>

                <div>
                    <CanvasJSChart options = {options}
                        /* onRef={ref => this.chart = ref} */
                    />
                </div>
            </Container3>
        )
    }
}

const Container3 = styled.div`
    width: 50%;
    height: 50%;
    background-color: skyblue;
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translate(-50%,-50%);
`



let mapStateToProps = (state) => {
    return{
        url: state.postInfomation.url,
        ques: state.postInfomation.ques,
        ans1: state.postInfomation.ans1,
        ans2: state.postInfomation.ans2,
    };
}

Result = connect(mapStateToProps) (Result);

export default Result;