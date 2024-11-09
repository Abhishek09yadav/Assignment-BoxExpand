const productData = [
    { units: 1, discount: 10, price: 10.00, originalPrice: 34.00 },
    { units: 2, discount: 20, price: 18.00, originalPrice: 52.00 },
    { units: 3, discount: 30, price: 24.00, originalPrice: 64.00 }
];

const sizes = ['S', 'M', 'L', 'XL'];
const colors = ['Black', 'White', 'Blue', 'Red'];

class ProductSelector {
    constructor(containerId, products) {
        this.container = document.getElementById(containerId);
        this.products = products;
        this.render();
    }

    createBox(product, index) {
        const box = document.createElement('div');
        box.className = 'box';
        box.dataset.index = index;

        box.innerHTML = `
            <div class="box-header">
                <div class="unit-info">
                    <span>${product.units} Unit</span>
                    <span class="discount-badge">${product.discount}% Off</span>
                </div>
                <div class="price-section">
                    <div class="current-price">$${product.price.toFixed(2)} USD</div>
                    <div class="original-price">$${product.originalPrice.toFixed(2)} USD</div>
                </div>
            </div>
            <div class="box-content">
                ${Array(2).fill('').map((_, num) => `
                    <div class="selection-row">
                        <div class="selection-group">
                            <label>Size #${num + 1}</label>
                            <select>${sizes.map(size => `<option>${size}</option>`).join('')}</select>
                        </div>
                        <div class="selection-group">
                            <label>Color #${num + 1}</label>
                            <select>${colors.map(color => `<option>${color}</option>`).join('')}</select>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="chevron">▼</div>
        `;

        return box;
    }

    render() {
        this.products.forEach((product, index) => {
            const box = this.createBox(product, index);
            this.container.appendChild(box);
        });
        this.attachEventListeners();
    }

    attachEventListeners() {
        this.container.addEventListener('click', (e) => {
            const box = e.target.closest('.box');
            if (!box) return;

            const index = box.dataset.index;
            this.toggleBox(box, index);
        });

        this.container.querySelectorAll('select').forEach(select => {
            select.addEventListener('click', e => e.stopPropagation());
        });
    }

    toggleBox(box, index) {
        const isExpanded = box.classList.toggle('expanded');

        this.container.querySelectorAll('.box').forEach((b, idx) => {
            if (idx !== Number(index)) {
                b.classList.remove('expanded');
            }
        });
    }
}

new ProductSelector('product-selector', productData);
