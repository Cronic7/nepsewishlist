// popup.js

// Initialize the wishlist from Chrome storage
const wishlistKey = 'nepseWishlist';

// Function to load the wishlist
function loadWishlist() {
    chrome.storage.local.get([wishlistKey], (result) => {
        const wishlist = result[wishlistKey] || [];
        const wishlistElement = document.getElementById('wishlist');
        wishlistElement.innerHTML = ''; // Clear the list before displaying

        wishlist.forEach(stock => {
            const li = document.createElement('li');
            li.textContent = stock;

            // Create remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => {
                removeStock(stock);
            };

            li.appendChild(removeButton);
            wishlistElement.appendChild(li);
        });
    });
}

// Function to add a stock to the wishlist
function addStock(stock) {
    chrome.storage.local.get([wishlistKey], (result) => {
        const wishlist = result[wishlistKey] || [];
        if (!wishlist.includes(stock)) {
            wishlist.push(stock);
            chrome.storage.local.set({ [wishlistKey]: wishlist }, loadWishlist);
        }
    });
}

// Function to remove a stock from the wishlist
function removeStock(stock) {
    chrome.storage.local.get([wishlistKey], (result) => {
        let wishlist = result[wishlistKey] || [];
        wishlist = wishlist.filter(item => item !== stock);
        chrome.storage.local.set({ [wishlistKey]: wishlist }, loadWishlist);
    });
}

// Add event listener to the Add button
document.getElementById('addButton').addEventListener('click', () => {
    const stockInput = document.getElementById('stockInput');
    const stockValue = stockInput.value.trim();

    if (stockValue) {
        addStock(stockValue);
        stockInput.value = ''; // Clear input after adding
    }
});

// Load the wishlist when the popup opens
loadWishlist();
