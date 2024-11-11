import { useState } from "react";


export default function App() {
  const [items,setItems]= useState([]);

  function handleAddItems(item){
    setItems((items) => [...items, item]);
  }
 function handelDeleteItem(id){
  setItems((items)=>items.filter((item)=>item.id!==id))

 }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items} onDeleteItem={handelDeleteItem}/>
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🎒</h1>;
}
function Form({onAddItems}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuaantity] = useState(1);

  function handelSubmit(e) {
    e.preventDefault();
    if(!description){
      return;
    }
    const newItem={description,quantity,packed:false,id:Date.now()};

    onAddItems(newItem);

    setDescription("");
    setQuaantity(1);
  }
  return (
    <form className="add-form" onSubmit={handelSubmit}>
      <h3>what do you need for your 😍 trip? </h3>
      <select
        value={quantity}
        onChange={(e) => setQuaantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map(
          (
            num // length 20 mane RAM a 20 space allocate koreche but no data is defined
          ) => (
            <option value={num} key={num}>
              {num}
            </option>
          )
        )}
      </select>
      <input
        type="text"
        placeholder="item.. "
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>ADD</button>
    </form>
  );
}
function PackingList({items,onDeleteItem}) {
  return (
    <div className="list">
      <ul>
        {items.map(
          (
            item // ai item ta akta array and niche aii array ta call hoche
          ) => (
            <Item hello={item} onDeleteItem={onDeleteItem} key={item.id} /> // Item ta hoche akta component and hello ta prop and item ta hoche array
          )
        )}
      </ul>
    </div>
  );
}
function Item({ hello,onDeleteItem }) {//ai khane prop ta destructure hoi galo tai {} ar bhetore likh ta hoche
  return (
    <li>
      <span style={hello.packed ? { textDecoration: "line-through" } : {}}>
        {hello.quantity} {hello.description}
      </span>
      <button onClick={()=>onDeleteItem(hello.id)}>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list , and you already packed X (X%)</em>
    </footer>
  );
}



