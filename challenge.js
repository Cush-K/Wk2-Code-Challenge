document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addItems();
        form.reset();
    });
    const clearBtn = document.querySelector('.clearList');
    clearBtn.addEventListener('click', clearPurchasedList);

    listing();
});

const items = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5', 'item 6', 'item 7'];
const purchasedItems = [];

function listing() {
    const itemsList = document.querySelector('.items');
    itemsList.textContent = ''; 
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        itemsList.appendChild(li);

        const deleteBtn = document.createElement(`button`);
        deleteBtn.textContent = "Del"
        deleteBtn.addEventListener(`click`, deleteItems)
        li.appendChild(deleteBtn);

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

function deleteItems (e){
    e.target.parentNode.remove()
}

function addItems() {
    const addStuff = document.querySelector('#add').value;
    if (addStuff) {
        items.push(addStuff);
        listing();

        document.querySelector('#add').value=``;
    }
}

function purchaseItem(index) {
    const item = items[index];
    if (item && !purchasedItems.includes(item)){
        purchasedItems.push(item)
        updatePurchasedList();
    }
}

function updatePurchasedList(){
    const purchaseList = document.querySelector('.purchased');
    purchaseList.textContent = '';
    purchasedItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        purchaseList.appendChild(li);

        const deleteBtn = document.createElement(`button`);
        deleteBtn.textContent = "Del"
        deleteBtn.addEventListener(`click`, deleteItems)
        li.appendChild(deleteBtn);
    });
}

const clearPurchasedList = () => {
    purchasedItems.length=0;
    updatePurchasedList();
}
