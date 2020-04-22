export default function List({items, render}){
    return items.map(item=>render(item));
}