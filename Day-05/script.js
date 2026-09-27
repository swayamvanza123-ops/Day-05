/* =========================================
   PRODUCT DATA
========================================= */

let products =
    JSON.parse(
        localStorage.getItem("inventoryProducts")
    ) || [

        {
            id: 1,
            name: "Laptop",
            category: "Electronics",
            price: 50000,
            stock: 20
        },

        {
            id: 2,
            name: "Mouse",
            category: "Accessories",
            price: 800,
            stock: 50
        },

        {
            id: 3,
            name: "Monitor",
            category: "Electronics",
            price: 12000,
            stock: 5
        },

        {
            id: 4,
            name: "Keyboard",
            category: "Accessories",
            price: 1500,
            stock: 35
        },

        {
            id: 5,
            name: "Printer",
            category: "Electronics",
            price: 15000,
            stock: 8
        },

        {
            id: 6,
            name: "Headphones",
            category: "Accessories",
            price: 2500,
            stock: 15
        },

        {
            id: 7,
            name: "Webcam",
            category: "Electronics",
            price: 3500,
            stock: 7
        },

        {
            id: 8,
            name: "USB Cable",
            category: "Accessories",
            price: 500,
            stock: 40
        }

    ];


/* =========================================
   SAVE PRODUCTS
========================================= */

function saveProducts() {

    localStorage.setItem(
        "inventoryProducts",
        JSON.stringify(products)
    );

}


/* =========================================
   PAGE NAVIGATION
========================================= */

function showPage(pageId, button) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });


    const page =
        document.getElementById(pageId);


    if (page) {

        page.classList.add("active");

    }


    document
        .querySelectorAll(".nav-btn")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    if (button) {

        button.classList.add("active");

    }


    if (pageId === "productsPage") {

        displayProducts(products);

    }


    if (pageId === "categoriesPage") {

        document.getElementById(
            "categoryProducts"
        ).style.display = "none";

    }

}


/* =========================================
   DASHBOARD → PRODUCTS
========================================= */

function openProductsFromDashboard() {

    const productsButton =
        document.querySelectorAll(".nav-btn")[1];


    showPage(
        "productsPage",
        productsButton
    );

}


/* =========================================
   DASHBOARD → CATEGORIES
========================================= */

function openCategories() {

    const categoriesButton =
        document.querySelectorAll(".nav-btn")[2];


    showPage(
        "categoriesPage",
        categoriesButton
    );

}


/* =========================================
   DASHBOARD → VENDORS
========================================= */

function openVendors() {

    const vendorsButton =
        document.querySelectorAll(".nav-btn")[3];


    showPage(
        "vendorsPage",
        vendorsButton
    );

}


/* =========================================
   NEW PRODUCT PAGE
========================================= */

function showNewProduct() {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });


    document
        .getElementById("newProductPage")
        .classList.add("active");


    document
        .querySelectorAll(".nav-btn")
        .forEach(btn => {

            btn.classList.remove("active");

        });

}


/* =========================================
   PRODUCTS PAGE
========================================= */

function showProducts() {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });


    document
        .getElementById("productsPage")
        .classList.add("active");


    document
        .querySelectorAll(".nav-btn")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    document
        .querySelectorAll(".nav-btn")[1]
        .classList.add("active");


    displayProducts(products);

}


/* =========================================
   DISPLAY PRODUCTS
========================================= */

function displayProducts(list) {

    const table =
        document.getElementById(
            "productTable"
        );


    table.innerHTML = "";


    if (list.length === 0) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    style="
                        text-align:center;
                        padding:35px;
                        color:#94a3b8;
                    ">

                    No products found.

                </td>

            </tr>

        `;

        return;

    }


    list.forEach(product => {

        const status =
            product.stock < 10

                ? `
                    <span class="status low">
                        ● Low Stock
                    </span>
                  `

                : `
                    <span class="status available">
                        ● Available
                    </span>
                  `;


        table.innerHTML += `

            <tr>

                <td>
                    #${product.id}
                </td>

                <td>
                    <strong>
                        ${product.name}
                    </strong>
                </td>

                <td>
                    ${product.category}
                </td>

                <td>
                    ₹${product.price.toLocaleString("en-IN")}
                </td>

                <td>
                    ${product.stock}
                </td>

                <td>
                    ${status}
                </td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deleteProduct(${product.id})">

                        🗑 Delete

                    </button>

                </td>

            </tr>

        `;

    });

}


/* =========================================
   SEARCH + FILTER
========================================= */

function filterProducts() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    const filter =
        document
            .getElementById("filterSelect")
            .value;


    const filtered =
        products.filter(product => {

            const searchMatch =
                product.name
                    .toLowerCase()
                    .includes(search);


            let filterMatch = true;


            if (filter === "available") {

                filterMatch =
                    product.stock >= 10;

            }


            if (filter === "low") {

                filterMatch =
                    product.stock < 10;

            }


            return (
                searchMatch &&
                filterMatch
            );

        });


    displayProducts(filtered);

}


/* =========================================
   ADD PRODUCT
========================================= */

function addProduct(event) {

    event.preventDefault();


    // Clear old errors

    document.getElementById(
        "nameError"
    ).textContent = "";

    document.getElementById(
        "categoryError"
    ).textContent = "";

    document.getElementById(
        "priceError"
    ).textContent = "";

    document.getElementById(
        "stockError"
    ).textContent = "";


    document.getElementById(
        "successMessage"
    ).style.display = "none";


    // Get form values

    const name =
        document
            .getElementById("productName")
            .value
            .trim();


    const category =
        document
            .getElementById("productCategory")
            .value;


    const price =
        document
            .getElementById("productPrice")
            .value;


    const stock =
        document
            .getElementById("productStock")
            .value;


    let valid = true;


    // Product name

    if (name === "") {

        document.getElementById(
            "nameError"
        ).textContent =
            "Product name is required.";

        valid = false;

    }


    // Category

    if (category === "") {

        document.getElementById(
            "categoryError"
        ).textContent =
            "Category is required.";

        valid = false;

    }


    // Price

    if (price === "") {

        document.getElementById(
            "priceError"
        ).textContent =
            "Price is required.";

        valid = false;

    }

    else if (Number(price) <= 0) {

        document.getElementById(
            "priceError"
        ).textContent =
            "Price must be greater than 0.";

        valid = false;

    }


    // Stock

    if (stock === "") {

        document.getElementById(
            "stockError"
        ).textContent =
            "Stock is required.";

        valid = false;

    }

    else if (Number(stock) < 0) {

        document.getElementById(
            "stockError"
        ).textContent =
            "Stock cannot be negative.";

        valid = false;

    }


    if (!valid) {

        return;

    }


    /* =====================================
       DYNAMIC ID
    ===================================== */

    let newId = 1;


    if (products.length > 0) {

        newId =
            Math.max(
                ...products.map(
                    product => product.id
                )
            ) + 1;

    }


    /* =====================================
       CREATE PRODUCT
    ===================================== */

    const newProduct = {

        id: newId,

        name: name,

        category: category,

        price: Number(price),

        stock: Number(stock)

    };


    /* Add product */

    products.push(newProduct);


    /* Save */

    saveProducts();


    /* Update dashboard */

    updateDashboard();


    /* Success message */

    const success =
        document.getElementById(
            "successMessage"
        );


    success.textContent =
        "✓ Product added successfully!";


    success.style.display = "block";


    /* Clear form */

    document
        .getElementById("productForm")
        .reset();


    /* Go back to products */

    setTimeout(() => {

        showProducts();

    }, 800);

}


/* =========================================
   DELETE PRODUCT
========================================= */

function deleteProduct(id) {

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) {

        return;

    }


    const confirmDelete =
        confirm(
            `Are you sure you want to delete "${product.name}"?`
        );


    if (!confirmDelete) {

        return;

    }


    /* Remove product */

    products =
        products.filter(
            item => item.id !== id
        );


    /* Save updated products */

    saveProducts();


    /* Update dashboard */

    updateDashboard();


    /* Update main product table */

    displayProducts(products);


    /* Update category table if open */

    const categorySection =
        document.getElementById(
            "categoryProducts"
        );


    if (
        categorySection.style.display === "block"
    ) {

        const title =
            document.getElementById(
                "selectedCategoryTitle"
            ).textContent;


        const category =
            title.replace(
                " Products",
                ""
            );


        showCategoryProducts(category);

    }

}


/* =========================================
   UPDATE DASHBOARD
========================================= */

function updateDashboard() {

    // Total Products

    const totalProducts =
        products.length;


    // Total Stock

    const totalStock =
        products.reduce(
            (total, product) =>
                total + product.stock,
            0
        );


    // Low Stock

    const lowStock =
        products.filter(
            product =>
                product.stock < 10
        ).length;


    // Inventory Value

    const inventoryValue =
        products.reduce(
            (total, product) =>
                total +
                product.price *
                product.stock,
            0
        );


    document.getElementById(
        "totalProducts"
    ).textContent =
        totalProducts;


    document.getElementById(
        "totalStock"
    ).textContent =
        totalStock;


    document.getElementById(
        "lowStock"
    ).textContent =
        lowStock;


    document.getElementById(
        "inventoryValue"
    ).textContent =
        "₹" +
        inventoryValue.toLocaleString("en-IN");

}


/* =========================================
   CATEGORY PRODUCTS
========================================= */

function showCategoryProducts(category) {

    const categoryProducts =
        products.filter(
            product =>
                product.category === category
        );


    document.getElementById(
        "selectedCategoryTitle"
    ).textContent =
        category + " Products";


    const table =
        document.getElementById(
            "categoryProductTable"
        );


    table.innerHTML = "";


    if (categoryProducts.length === 0) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    style="
                        text-align:center;
                        padding:35px;
                        color:#94a3b8;
                    ">

                    No products found.

                </td>

            </tr>

        `;

    }

    else {

        categoryProducts.forEach(product => {

            const status =
                product.stock < 10

                    ? `
                        <span class="status low">
                            ● Low Stock
                        </span>
                      `

                    : `
                        <span class="status available">
                            ● Available
                        </span>
                      `;


            table.innerHTML += `

                <tr>

                    <td>
                        #${product.id}
                    </td>

                    <td>
                        <strong>
                            ${product.name}
                        </strong>
                    </td>

                    <td>
                        ${product.category}
                    </td>

                    <td>
                        ₹${product.price.toLocaleString("en-IN")}
                    </td>

                    <td>
                        ${product.stock}
                    </td>

                    <td>
                        ${status}
                    </td>

                    <td>

                        <button
                            class="delete-btn"
                            onclick="deleteProduct(${product.id})">

                            🗑 Delete

                        </button>

                    </td>

                </tr>

            `;

        });

    }


    document.getElementById(
        "categoryProducts"
    ).style.display = "block";


    document.getElementById(
        "categoryProducts"
    ).scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================================
   CLOSE CATEGORY PRODUCTS
========================================= */

function closeCategoryProducts() {

    document.getElementById(
        "categoryProducts"
    ).style.display = "none";

}


/* =========================================
   INITIALIZE APPLICATION
========================================= */

displayProducts(products);

updateDashboard();