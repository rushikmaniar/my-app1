import React from 'react';
import uuidv1 from 'uuid/v1';

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {displayButtonFlag: false, todo: this.props.todo, newname: this.props.todo.name};
    }

    /*
   * handle on Enter press Save
   * */
    handleOnEnter = (event) => {
        if (event.key === 'Enter') {
            this.edit();
        }

    };

    edit() {
        const todo = {...this.props.todo, name: this.state.newname};
        this.props.onEdit(todo);
        this.setState({displayButtonFlag: false});
    }

    handelCompleted = (event) => {
        const todo = {
            ...this.props.todo,
            name: this.state.newname,
            isCompleted: !this.state.todo.isCompleted
        };
        this.props.onEdit(todo);
        this.setState({todo: todo});
    };

    handleOnEdit = (event) => {
        this.setState({displayButtonFlag: true})
    };

    handleOnCancel = () => {
        this.setState({displayButtonFlag: false})
    };

    handleOnDelete(todo) {
        this.props.onDelete(todo);
    };

    handleOnChange = (event) => {
        this.setState({newname: event.target.value});
    };

    handleOnSave() {
        this.edit();
    };

    renderEditDelete() {
        const {todo} = this.state;
        const {name} = this.props.todo;
        return (
            <li key={this.props.id}>

                <input type="checkbox" onClick={this.handelCompleted} required={true}/>

                {
                    todo.isCompleted
                        ? <strike>{name}</strike>
                        : name
                }
                <button onClick={this.handleOnEdit}>Edit</button>
                <button onClick={() => this.handleOnDelete(this.props.todo)}>Delete</button>
            </li>
        )
    }


    renderSaveCancel() {
        return (
            <li key={this.props.id}>
                <input
                    onChange={this.handleOnChange}
                    onKeyDown={this.handleOnEnter}/>

                <button onClick={(event) => this.handleOnSave()}>Save</button>
                <button onClick={this.handleOnCancel}>Cancel</button>
            </li>
        )
    }

    render() {
        return this.state.displayButtonFlag ? this.renderSaveCancel() : this.renderEditDelete()
    }
}

export class TodoApp extends React.Component {
    constructor(props) {
        const itemList = [
            {id: uuidv1(), 'name': 'rushik', 'isCompleted': false},
            {id: uuidv1(), 'name': 'karan', 'isCompleted': false},
            {id: uuidv1(), 'name': 'abhi', 'isCompleted': false}
        ];
        super(props);
        this.state = {
            todos: itemList,
            name: ''
        }
    }

    /*adds new Todoinlist */
    addTodo() {
        this.setState((state) => {
            return {
                todos: [...state.todos, {id: uuidv1(), name: this.state.name}],
                name: ''
            }
        });
    }


    delete(todo) {
        this.setState({
            todos: this.state.todos.filter(todos => todos.id !== todo.id)
        });
    };


    edit(todo) {
        this.setState((state) => {
           return {
               todos: state.todos.map((item) => {
                   return item.id === todo.id ? todo : item
               })
           }
        });
    };

    handleOnChange = (event) => {
        this.setState({name: event.target.value});
    };

    handleOnKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.addTodo();
        }
    };

    handleOnDelete(todo) {
        this.delete(todo)
    }

    handleOnEdit(todo) {
        this.edit(todo)
    }

    handleOnAdd = (event) => {
        this.addTodo();
    };

    renderTodoList() {
        return (
            <ul>{
                this.state.todos.map((todo, index) => {
                    return (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            index={index}
                            onEdit={(todo) => this.handleOnEdit(todo)}
                            onDelete={(todo) => this.handleOnDelete(todo)}>
                        </TodoItem>
                    );
                })
            }
            </ul>
        );
    }

    render() {
        return (
            <div>
                <h2>Todos</h2>
                <input type="text"
                       value={this.state.name}
                       onChange={this.handleOnChange}
                       onKeyDown={this.handleOnKeyDown}
                />
                <button onClick={this.handleOnAdd}>Add Todo</button>
                {this.renderTodoList()}
            </div>
        );

    }

}