import {profileContentPageReducer,initState, setSending} from "./profileContentPageReducer";

test('Set sending',()=> {
    let newStat = profileContentPageReducer(initState, setSending());
    expect(newStat.isSending).toBe(true);
});