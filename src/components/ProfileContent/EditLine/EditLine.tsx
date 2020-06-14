import React from "react";
import css from './EditLine.module.css'

class EditLine extends React.Component {
    state = {
        isEdit: false
    };
    updateText = (e) => {
        this.setState({
            text: e.target.value
        });
    };
    startEdit = () =>{
        if(this.props.id===this.props.myId) {
            this.setState({
                isEdit: true,
                text  : this.props.text
            });
        }
    };
    onKeyDown = (e) => {
        if(e.key==='Enter'){
           if(this.state.text!=this.props.text)
                this.props.stopEditLine(this.props.id,this.props.source,this.state.text);
           this.setState({
                isEdit: false
            })
        }
    };
    stopEditLine = () => {
        if(this.state.text!=this.props.text)
            this.props.stopEditLine(this.props.id,this.props.source,this.state.text);
        this.setState({
            isEdit: false
        })
    };

    render() {
        return (
            <>
                {this.state.isEdit?
                    <div>
                        <input autoFocus
                               style={{width: '100%', height: '21px'}}
                               onBlur={ this.stopEditLine }
                               onKeyDown={ this.onKeyDown }
                               onChange={ this.updateText }
                               value={ this.state.text }/>
                    </div>:
                    <div style={{width: '100%', height: '21px'}}
                         onDoubleClick={ this.startEdit }>
                        {this.props.text}
                    </div>
                }
            </>
        )
    }
}

export default EditLine;