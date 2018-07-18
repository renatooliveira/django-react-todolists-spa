import React, { Component } from 'react';
import { connect } from 'react-redux';

import { lists, tasks } from "../actions";

import Task from "./Task";

class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            isEditing: false,
            taskText: "",
            isEditingTask: false,
            tsksLst: [],
        }

        this.getListTasks = this.getListTasks.bind(this);

    }


    componentDidUpdate(prevProps, prevState) {


        if (prevProps.tasks !== this.props.tasks) {
            console.log('CARD props.task changed');
            let tsksLst = [];
            for (var t in this.props.tasks) {
                let tsk = this.props.tasks[t];
                if (tsk.todolist === this.props.listId) {
                    tsksLst.push(tsk);
                }
            }
            //console.log('tsksLst: '+JSON.stringify(tsksLst));
            this.setState({ tsksLst: tsksLst });
            this.forceUpdate();
        }

    }

    /* componentWillUpdate(nextProps, nextState) {


        if (nextProps.tasks !== this.props.tasks) {
            console.log('CARD props.task will change');
            let tsksLst = [];
            for (var t in nextProps.tasks) {
                let tsk = nextProps.tasks[t];
                if (tsk.todolist === this.props.listId) {
                    tsksLst.push(tsk);
                }
            }
            //console.log('tsksLst: '+JSON.stringify(tsksLst));
            this.setState({ tsksLst: tsksLst });
        }

    } */

    getListTasks(listId) {
        let tsksLst = [];
        for (var t in this.props.tasks) {
            let tsk = this.props.tasks[t];
            if (tsk.todolist === listId) {
                tsksLst.push(tsk);
            }
        }

        this.setState({ tsksLst: tsksLst });
    }


    selectToEdit = () => {
        this.setState({ text: this.props.text, isEditing: true });
    }

    selectToEditTask = (taskId) => {
        // find this task in the 'tasks' array, 
        //this.setState({ task: taskId, isEditingTask: isEditingTask });
    }

    submitList = (e) => {
        console.log('submitList');
        e.preventDefault();
        if (this.props.id === null) {
            this.props.addList(this.state.text);
            this.setState({ text: "" });
        } else {
            this.props.updateList(this.props.id, this.state.text);
            this.setState({ isEditing: false });
        }
    }


    render() {
        const createBlock = (
            <div className="card-title">
                <form onSubmit={this.submitList}>
                    <input value={this.state.text}
                        placeholder="Enter new TODO list..."
                        onChange={(e) => this.setState({ text: e.target.value })}
                        required />
                    <button className="card-new_list-btn" type="submit" ><i className="material-icons card-btn">add</i></button>
                </form>
            </div>
        );

        const readOnlyBlock = (
            <div>
                <div className="card-btns">
                    <span onClick={() => this.selectToEdit()} className="material-icons card-btn">create</span>
                    <span onClick={() => this.props.deleteList(this.props.listId)} className="material-icons card-btn">delete</span>
                </div>

                <div className="card-title" onClick={() => this.setState({ isEditing: true })}>
                    <h1> {this.props.text} </h1>
                </div>
            </div>
        );

        const editBlock = (
            <div className="card-title">
                <form onSubmit={this.submitList}>
                    <input value={this.state.text}
                        placeholder={this.props.text}
                        onChange={(e) => this.setState({ text: e.target.value })}
                        required />
                    <button className="card-new_list-btn" type="submit" ><i className="material-icons card-btn">done</i></button>
                </form>
            </div>
        );

        return (
            <div>
                {this.props.type === "tasksList" &&
                    <div>
                        {this.state.isEditing === false && readOnlyBlock}
                        {this.state.isEditing === true && editBlock}


                        <div className="card-container">
                            {this.state.tsksLst.map((task, id) => (
                                <div key={`task_${id}`}>
                                    <Task type="tasksList" isEditingTask={false}
                                        id={id} taskId={task.id} taskText={task.text}
                                        listId={task.todolist} isChecked={task.is_completed}
                                        getListTasks={this.getListTasks} />
                                    {/*selectToEditTask={this.selectToEditTask}*/}
                                </div>
                            ))}

                            {/*this.props.lists.map((list, id) => (
                                <div className="card" key={`list_${id}`}>
                                    <Card text={list.text} type="tasksList" id={id} />
                                </div>
                            ))
                            */}

                            <Task type="tasksList" isEditingTask={true} id={null} taskId={null} taskText="" listId={this.props.listId}
                                getListTasks={this.getListTasks} />
                        </div>
                    </div>
                }

                {this.props.type === "newList" && createBlock}



            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        lists: state.lists,
        tasks: state.tasks,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        /* fetchLists: () => {
            dispatch(lists.fetchLists());
        },
        fetchTasks: () => {
            dispatch(tasks.fetchTasks());
        }, */
        addList: (text) => {
            return dispatch(lists.addList(text));
        },
        updateList: (id, text) => {
            return dispatch(lists.updateList(id, text));
        },
        deleteList: (id) => {
            dispatch(lists.deleteList(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);