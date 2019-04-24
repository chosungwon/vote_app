import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import styled from 'styled-components';

class Vote extends Component {
state = {
    ques: '',
    ans1: '',
    ans2: '',
    success: ''
};


componentDidMount() {
    let asd = document.URL;
    let zxc = asd.substring(23,28); //URL
    axios.get(`http://voting-app-uwbfb.run.goorm.io/api/vote/${zxc}`)
        .then(res => {
            console.log(res)
            if(res.data.success === false){
                alert('이 url로 저장된 투표가 없습니다');
                document.location.href="/";
            }
            this.setState({
                ques: res.data.ques,
                ans1: res.data.ans1,
                ans2: res.data.ans2
            })
        })

}

handleClick = (e) => {
    let asd = document.URL;
    let zxc = asd.substring(23,28); //URL
    let option = document.getElementsByName('option');
    let option_value;
    for (var i = 0; i < option.length; i++) {
        if (option[i].checked) {
            option_value = option[i].value;
        }
    }
    let data = {
        checked: option_value
    }
    axios.post(`http://voting-app-uwbfb.run.goorm.io/api/select/${zxc}`, data)
        .then(res => {
            if(res.data.success === true){
                alert('투표하셨습니다 결과창으로 넘어가주세요.')
            }
            if(res.data.success === false){
                alert('투표가 정상적으로 되지않았습니다 새로고침해주세요')
            }
            this.setState({
                success: res.data.success
            })
        })
}

render() {

    // var setCookie = function(name, value, exp) {
    //     var date = new Date();
    //     date.setTime(date.getTime() + exp*24*60*60*1000);
    //     document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    // };
    // var getCookie = function(name) {
    //     var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    //     return value? value[2] : null;
    // };

    // setCookie('in', '1', 1);
    // console.log(getCookie('in'))

    let asd = document.URL;
    let zxc = asd.substring(23,28); //URL
    let button2= <input type={'submit'} value={'투표하기'} onClick={this.handleClick} style={{width:'30%', height:'50%'}}/>;
    if (this.state.success === true) {
        button2=<a href={`/v${zxc}/result`}><input type={'button'} value={'결과창가기'} style={{width:'30%', height:'100%'}}/></a>
    }
    let ques = this.state.ques;
    let ans1 = this.state.ans1;
    let ans2 = this.state.ans2;
    return (
        <Container2>
            <Poll2>
                <div style={{width: '100%', height:'80%'}}>
                <div style={{marginBottom: '4%', textAlign: 'center', fontSize:'250%'}}>{ques}</div>

                <div style={{marginBottom: '3%', textAlign: 'center', fontSize:'150%'}}>
                    <input type={'radio'} value={ans1} name={'option'} defaultChecked={'true'} />
                    <span>{ans1}</span>
                    &nbsp;&nbsp;&nbsp;
                    <input type={'radio'} value={ans2} name={'option'}/>
                    <span>{ans2}</span>
                </div>

                <div style={{textAlign: 'center', fontSize:'150%', width:'100%', height:'30%'}}>
                    {button2}
                </div>

                </div>

                <div style={{width: '100%', height:'20%'}}>
                    <button onClick={this.refresh} style={{width:'100%', height:'100%', fontSize:'100%', border:'none', backgroundColor:'#f1f2f4'}}>새로고침</button>
                </div>
            </Poll2>
        </Container2>
    )
}
}

const Container2 = styled.div`
width:100%;
height:100%;
`

const Poll2 = styled.div`
width: 50%;
height: 50%;
background-color: skyblue;
left: 50%;
top: 50%;
position: absolute;
transform: translate(-50%,-50%);
`


let mapStateToProps = (state) => {
return {
    url: state.postInfomation.url,
    ques: state.postInfomation.ques,
    ans1: state.postInfomation.ans1,
    ans2: state.postInfomation.ans2,
};
}

Vote = connect(mapStateToProps)(Vote);

export default Vote;

