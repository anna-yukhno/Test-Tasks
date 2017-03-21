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
            id: this.props.list.length? (this.props.list[this.props.list.length - 1].id + 1) : 1,
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
        //console.log(this.state);
    }
    render() {
        return (
            <form action="#" onSubmit={this.onSubmit}>
                <input type="text" value={this.state.text} onChange={this.onChangeText} placeholder="Enter some text"/>
                <button type="submit" disabled={!this.state.text}>Add Task</button>
            </form>
        );
    }
}


class List extends Component {
    constructor () {
        super();
    }
    render() {
        if (!this.props.list.length) {
            return (<p>No Tasks for Now</p>);
        }
        return (
            <table>
                <thead>
                    <tr>
                        <th width="50">Id</th>
                        <th>Text</th>
                        <th width="50">is Done</th>
                        <th width="50">Delete</th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.props.list.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.text}</td>
                            <td><input type="checkbox" value={item.isDone} onChange={() => this.props.toggleItem(item.id)}/></td>
                            <td><button onClick={() => this.props.deleteItem(item.id)}>[X]</button></td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        );
    }
}

class App extends Component {
    constructor () {
        super();
        this.state = {
            list: JSON.parse(window.localStorage.getItem('taskList')) || []
        };
        this.addItem = this.addItem.bind(this); 
        this.deleteItem = this.deleteItem.bind(this); 
        this.toggleItem = this.toggleItem.bind(this); 
    }
    addItem(item) {
        const updatedList = this.state.list.slice();
        updatedList.push(item);
        this.setState({
            list: updatedList
        });
        window.localStorage.setItem('taskList', JSON.stringify(this.state.list));
    }
    deleteItem(itemId) {
        if (!confirm('Are you sure you want to delete this?')) return;
        const updatedList = this.state.list.filter(val => val.id !== itemId);
        this.setState({
            list: updatedList
        });
        window.localStorage.setItem('taskList', JSON.stringify(this.state.list));
    }
    toggleItem(itemId) {
        const updatedList = this.state.list.map(item => {
            if (item.id) {
                item.isDone = !item.isDone;
            }
            return item;
        });
        this.setState({
            list: updatedList
        });
    }
    render() {
        return (
            <div className="App">
                <Add addItem={this.addItem} list={this.state.list}/>
                <List list={this.state.list} deleteItem={this.deleteItem} toggleItem={this.toggleItem}/>
            </div>
        );
    }
}

export default App;