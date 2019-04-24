export const INFOMATION = 'INFOMATION';

export function infomation(url, ques, ans1, ans2) {
    return{
        type: INFOMATION,
        url: url,
        ques: ques,
        ans1: ans1,
        ans2: ans2
    }
}

