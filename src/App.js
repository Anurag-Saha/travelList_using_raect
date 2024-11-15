import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handelDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handelToggelItem(newid) {
    setItems((items) =>
      items.map((item) =>
        item.id === newid ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handelDeleteItem}
        onToggleItems={handelToggelItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🎒</h1>;
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuaantity] = useState(1);

  function handelSubmit(e) {
    e.preventDefault();
    if (!description) {
      return;
    }
    const newItem = { description, quantity, packed: false, id: Date.now() };

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
function PackingList({ items, onDeleteItem, onToggleItems }) {
  const [sortby, setSortby] = useState("input");

  let sortedItems;

  if (sortby === "input") sortedItems = items;

  if (sortby === "discription")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortby === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map(
          (
            item // ai item ta akta array and niche aii array ta call hoche
          ) => (
            <Item
              hello={item}
              onDeleteItem={onDeleteItem}
              onToggleItems={onToggleItems}
              key={item.id}
            /> // Item ta hoche akta component and hello ta prop and item ta hoche array
          )
        )}
      </ul>
      <div className="action">
        <select value={sortby} onChange={(e) => setSortby(e.target.value)}>
          <option value="input">sort by input order</option>
          <option value="discription">sort by discription </option>
          <option value="packed">sort by packed status</option>
        </select>
      </div>
    </div>
  );
}
function Item({ hello, onDeleteItem, onToggleItems }) {
  //ai khane prop ta destructure hoi galo tai {} ar bhetore likh ta hoche
  return (
    <li>
      <input
        type="checkbox"
        value={hello.packed}
        onChange={() => onToggleItems(hello.id)}
      />
      <span style={hello.packed ? { textDecoration: "line-through" } : {}}>
        {hello.quantity} {hello.description}
      </span>
      <button onClick={() => onDeleteItem(hello.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items in your packing list 🚀 </em>
      </p>
    );

  const numItems = items.length;
  const numpacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numpacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "you got everything ! ready to go ✈️ "
          : `💼 You have ${numItems} items on your list , and you already packed ${numpacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
