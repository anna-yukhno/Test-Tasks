import React, { Component } from 'react';

class List extends Component {
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
                    <th width="50">Is done</th>
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

export default List;
