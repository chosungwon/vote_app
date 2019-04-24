import React, {Component} from 'react';
import styled, {injectGlobal} from 'styled-components';
import axios from "axios";
import {connect} from 'react-redux';
import {infomation} from "../actions";

injectGlobal`
html, body{
margin: 0;
padding: 0;
width: 100%;
height: 100%;
}
#root{
margin: 0;
padding: 0;
width: 100%;
height: 100%;
}
`

class App extends Component {
    state = {
        ques: '',
        ans1: '',
        ans2: '',
        url: '',
        success: '',
        success2: '',
        regTest: false
    }
    baseURL = 'http://voting-app-uwbfb.run.goorm.io';

    handleChange = async (e) => {
        await this.setState({
            [e.target.name]: e.target.value
        })

        this.props.info(this.state.url, this.state.ques, this.state.ans1, this.state.ans2)
    }
    handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            ques: this.state.ques,
            ans1: this.state.ans1,
            ans2: this.state.ans2,
            url: this.state.url
        }


        axios.post(`${this.baseURL}/api/votes`, data, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                console.log(res)
                this.setState({
                    success: res.data.success
                })
                if (res.data.success === false) {
                    alert('url이 이미 서버에있습니다 다른url을 적어주세요')
                    // document.location.reload()
                }
                if (res.data.success2 === false) {
                    alert('옵션2개가 값이 같습니다 다른옵션을 적어주세요')
                    this.setState({
                        ans1: '',
                        ans2: ''
                    })
                    document.location.reload()
                }

            })


    }
    ansCheck = (e) =>{
        if(this.state.ans1 === this.state.ans2){
            alert('옵션2개가 값이 같습니다 다른옵션을 적어주세요')
            document.location.reload()
        }

    }

    render() {
        let a = this.state.url
        const regNumber = /^[0-9]*$/;
        let test = a.length;
        if (!regNumber.test(this.state.url)) {
            alert('숫자만 입력해주세요.');
            this.setState({
                url: ''
            })
            document.location.reload()
        }
        let link = null
        if(this.state.ques !== '' && this.state.ans1 !== '' && this.state.ans2 !== '' && this.state.url !== '' && this.state.url && test === 5 && (this.state.ans1 !== this.state.ans2)){
            link = <input type={'submit'} value={'질문페이지 만들기'}/>;
        }
        else
            link = null
        if (this.state.success === true) {
            alert('투표가 생성되었습니다 다음페이지로 넘어가주세요')
            link = <a href={`/v${this.state.url}`}><input type={'button'} value={'다음페이지 가기'} onClick={this.ansCheck}/></a>

        }
        return (
            <Container1>
                <Poll>
                    <Header>
                        <Logo>
                            투표
                        </Logo>
                    </Header>
                    <form onSubmit={this.handleSubmit} style={formStyle}>
                        <div style={{width: '60%', height: '50%', marginLeft: 'auto', marginRight: 'auto'}}>
                            <input type={'text'} placeholder={'질문을 입력하세요'} style={inputStyle} name={'ques'}
                                   onChange={this.handleChange}/>
                            <input type={'text'} placeholder={'선택할항목을 입력하세요'} style={inputStyle} name={'ans1'}
                                   onChange={this.handleChange}/>
                            <input type={'text'} placeholder={'선택할항목을 입력하세요'} style={inputStyle} name={'ans2'}
                                   onChange={this.handleChange}/>
                            <input type={'text'} placeholder={'접근할 url 5자리숫자로 정해주세요'} style={inputStyle} name={'url'}
                                   onChange={this.handleChange} maxLength={'5'}/>
                        </div>
                        <div style={{width: '60%', height: '30%', marginLeft: 'auto', marginRight: 'auto'}}>

                            <br/>
                            {link}
                        </div>
                    </form>
                </Poll>
            </Container1>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        info: (url, ques, ans1, ans2,) => dispatch(infomation(url, ques, ans1, ans2))
    }
}


App = connect(undefined, mapDispatchToProps)(App);


const Container1 = styled.div`
width: 100%;
height: 100%;
background-color:#ffffff;
`

const Header = styled.div`
width: 50%;
height: 20%
margin-left: auto;
margin-right: auto;
text-align: center;
font-size: 250%

`

const Logo = styled.div`
width:100%;
height: 100%;
`


const Poll = styled.div`
width: 50%;
height: 50%;
background-color: skyblue;
left: 50%;
top: 50%;
position: absolute;
transform: translate(-50%,-50%);
`

let formStyle = {
    width: '100%',
    height: '100%'
}
let inputStyle = {
    width: '100%',
    height: '20%',

}


export default App;