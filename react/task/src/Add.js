import React, { Component } from 'react';

class Add extends Component {
    constructor () {
        super();
        this.stateInitialValue = { text: '' };
        this.state = this.stateInitialValue;
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(ev) {
        ev.preventDefault();
        const item = {
            id: this.props.list[this.props.list.length - 1].id + 1,
            text: this.state.text,
            isDone: false
        };
        this.props.addItem(item);
        this.setState(this.stateInitialValue);
    }
    onChangeText(ev) {
        this.setState({
            text: ev.target.value
        });
    }
    render() {
        return (
            <form action="#" onSubmit={this.onSubmit}>
                <input type="text" value={this.state.text} onChange={this.onChangeText} placeholder="Enter some text"/>
                <button type="submit" disabled= {!this.state.text}>Add </button>
            </form>
        );
    }
}

export default Add;
