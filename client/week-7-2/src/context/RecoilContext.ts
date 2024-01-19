import { atom, selector } from "recoil";


export const Todolist = atom({
    key: "Todolist",
    default: []
})


export const FilterText = atom({
    key: "FilterText",
    default: ""
});

interface todo {
    title: string,
    description : string
}

export const FilterTodo = selector({
    key: "FilterTodo",
    get: (props) => {
        const filterText = props.get(FilterText);
        const todoList = props.get(Todolist);
        const resultTodo = todoList.filter((todo: todo) => todo.title.includes(filterText));
        return resultTodo;
    }
})