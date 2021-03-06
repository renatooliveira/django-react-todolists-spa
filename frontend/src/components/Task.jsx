import React, { Component } from 'react';
import { connect } from 'react-redux';

import { tasks, lists } from "../actions";

class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            taskText: "",
            isEditingTask: "",
            isNew: "",
            checked: false,
        }

        this.submitTask = this.submitTask.bind(this);

    }


    componentDidMount() {
        this.setState({
            taskText: this.props.taskText,
            isEditingTask: this.props.isEditingTask,
            isNew: (this.props.id === null),
            checked: this.props.isChecked
        });
    }

    toggleCheckTask = () => {
        console.log('enter checkTask');
        const currentState = this.state.checked;
        if (this.props.id !== null && !currentState) {
            this.props.checkTask(this.props.taskId, this.state.taskText, this.props.listId);
            this.setState({ checked: true });
        }

    }

    selectToEditTask = () => {
        this.setState({ taskText: this.props.taskText, isEditingTask: true });
    }

    submitTask = ((e) => {
        e.preventDefault();
        console.log('enter submitTask');
        const todolistId = this.props.listId;
        if (this.props.id === null) {
            this.props.addTask(this.state.taskText, todolistId);

            // updating list of tasks for this TodoList:
            let tsksLst = [];
            for (var t in this.props.tasks) {
                let tsk = this.props.tasks[t];
                if (tsk.todolist === this.props.listId) {
                    tsksLst.push(tsk);
                }
            }

            this.setState({ isEditingTask: false, isNew: false, tsksLst: tsksLst });
            //this.setState(this.state);

            //this.forceUpdate();
            this.props.getListTasks(this.props.listId);
        } else {
            this.props.updateTask(this.props.taskId, this.state.taskText, this.props.listId);
            this.setState({ isEditingTask: false });
        }
    })


    render() {

        const taskBlock = (
            <div>
                <div className="card-btns">
                    <span onClick={() => this.selectToEditTask()} className="material-icons task-btn">create</span>
                    <span onClick={() => this.props.deleteTask(this.props.taskId)} className="material-icons task-btn">delete</span>
                </div>
                <div className="list_item ">
                    <div className={this.state.checked ? 'checked' : null} onClick={() => this.toggleCheckTask()}>
                        <span className={this.state.checked ? 'dot checked' : 'dot'} ></span>
                        <span className="task">{this.state.taskText}</span>
                        <br />
                    </div>
                </div>
            </div>
        )


        const inputPlaceholder = this.props.id === null ? "enter new task" : this.props.taskText;

        const editTaskBlock = (
            <form onSubmit={this.submitTask}>
                <div className="list_item">
                    <span className="dot" ></span>
                    <input value={this.state.taskText}
                        placeholder={inputPlaceholder} className="new_task"
                        onChange={(e) => this.setState({ taskText: e.target.value })}
                        required />
                    {/*<button className="card-new_list-btn" type="submit" ><i className="material-icons card-btn">done</i></button>*/}
                </div>
            </form>
        )

        const checkedTaskBlock = (
            <div className="list_item" id="task-{task.id}">
                <i class="material-icons check-mark">check_box</i>
                <span className="task" >{this.state.taskText}</span>
                <br />
            </div>
        )

        const futureTaskBlock = (
            <div>
                <div className="list_item ">
                    <div >
                        <span className="dot" ></span>
                        <span className="task">{this.state.taskText}</span>
                        <br />
                    </div>
                </div>
            </div>
        )

        const isTaskBlock = this.state.isEditingTask == false && this.state.isNew !== null && this.props.type === "tasksList";

        return (
            <div>
                {/*JSON.stringify(isTaskBlock)*/}
                {this.state.isEditingTask && editTaskBlock}
                {isTaskBlock && taskBlock}
                {this.props.type === "checkedTasks" && checkedTaskBlock}
                {this.props.type === "futureTasks" && futureTaskBlock}

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
        addTask: (text, listId) => {
            return dispatch(tasks.addTask(text, listId));
        },
        updateTask: (id, text, listId) => {
            return dispatch(tasks.updateTask(id, text, listId));
        },
        deleteTask: (id) => {
            dispatch(tasks.deleteTask(id));
        },
        checkTask: (id, text, listId) => {
            return dispatch(tasks.checkTask(id, text, listId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);