class ProductManager {
  constructor() {
    this.products = [];
    this.idCounter = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son necesarios.");
      return;
    }
    if (this.products.some((product) => product.code === code)) {
      console.log(`Ya existe un producto con este Codigo: ${code}`);
      return;
    }
    const newProduct = {
      id: this.idCounter,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(newProduct);
    this.idCounter++;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.log("Not found.");
      return null;
    }
  }
}

/* 
const productManager = new ProductManager();

productManager.addProduct("Producto 1", "Esto es una descripcion del prod 1", 100, "estoEsUnaImg1.jpg", "Code001", 20);
productManager.addProduct("Producto 2", "Esto es una descripcion del prod 2", 200, "estoEsUnaImg2.jpg", "Code002", 15);

const allProducts = productManager.getProducts();
console.log(allProducts);

const product01 = productManager.getProductById(1);
console.log(product01);

const product3 = productManager.getProductById(3);
console.log(product3);
 */
