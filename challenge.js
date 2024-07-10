//Ensures that the code executes after all content has loaded

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

//Adds an event listener for a submit action
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addItems();
        form.reset();
    });

//creates a clear button to clear the purchase list and ensures that it runs after all the content has loaded
    const clearBtn = document.querySelector('.clearList');
    clearBtn.addEventListener('click', clearPurchasedList);

    listing();
});

const items = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5', 'item 6', 'item 7'];

const purchasedItems = []; //Creates an empty array to push purchased items into


//creates list items and render them on the webpage
function listing() {
    const itemsList = document.querySelector('.items');
    itemsList.textContent = ''; 
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        itemsList.appendChild(li);

//Creates a delete button on each list item
        const deleteBtn = document.createElement(`button`);
        deleteBtn.textContent = "Del"
        deleteBtn.addEventListener(`click`, deleteItems)
        li.appendChild(deleteBtn);

//Creates a buy button that adds items into the purchase list.
//Ensures that the button changes colour on click.
        const btn = document.createElement('button');
        btn.textContent = `Buy`;
        btn.setAttribute(`data-index`, index);
        btn.addEventListener(`click`, ()=> {
            purchaseItem(index)
            btn.style.backgroundColor = "red"
        })
        li.appendChild(btn)
       
    });
};

//The function for deleting items

function deleteItems (e){
    e.target.parentNode.remove()
}

//Creates new items and adds them into the items array
function addItems() {
    const addStuff = document.querySelector('#add').value;
    if (addStuff) {
        items.push(addStuff);
        listing();

        document.querySelector('#add').value=``;
    }
}

//The function that checks whether an item has been selected and if it already exists within the purchase list
// The function also adds the item into an index for storage
function purchaseItem(index) {
    const item = items[index];
    if (item && !purchasedItems.includes(item)){
        purchasedItems.push(item)
        updatePurchasedList();
    }
}

//Creates list items in the purchase list, and adds items to the list when "Buy" is clicked
function updatePurchasedList(){
    const purchaseList = document.querySelector('.purchased');
    purchaseList.textContent = '';
    purchasedItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        purchaseList.appendChild(li);

//Adds a delete button to each list item on the purchase list
        const deleteBtn = document.createElement(`button`);
        deleteBtn.textContent = "Del"
        deleteBtn.addEventListener(`click`, deleteItems)
        li.appendChild(deleteBtn);
    });
}

//function to clear the purchase list items
function clearPurchasedList() {
    purchasedItems.length=0;
    updatePurchasedList();
}
