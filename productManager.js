const fs = require("fs");
const file = "./data.json";

class ProductManager {
  constructor(path) {
    this.products = [];
    this.idCounter = 1;
    this.path = path;
  }

  
  addProduct(item) {
    const { title, description, price, thumbnail, code, stock } = item;
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son necesarios.");
      return;
    }
    if (this.uniqueCode(code)) return;
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
    this.saveFile();
  }
  
  getProducts() {
    this.readFile();
    return this.products;
  }
  
  getProductById(id) {
    this.readFile();
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.log("Not found.");
      return null;
    }
  }
  
  updateProduct(id, updated) {
    this.readFile();
    const index = this.products.findIndex((prod) => prod.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updated };
      if (this.uniqueCode(updated.code)) return null;
      this.saveFile();
      return this.products[index];
    } else {
      console.log("Not found.");
      return null;
    }
  }
  
  deleteProduct(id) {
    this.readFile();
    const index = this.products.findIndex((prod) => prod.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveFile();
      console.log("Product removed!");
    } else {
      console.log("Not found.");
    }
  }
  
  saveFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.products));
  }
  
  readFile() {
    const data = fs.readFileSync(this.path, "utf-8");
    this.products = JSON.parse(data);
  }
  
  uniqueCode(code) {
    if (this.products.some((product) => product.code === code)) {
      console.log(`Ya existe un producto con este Codigo: ${code}`);
      return true;
    } else {
      return false;
    }
  }

  deleteAll() {
    fs.writeFileSync(this.path, "");
    this.products = [];
  }
}







/* const productManager = new ProductManager(file);
productManager.deleteAll();
productManager.addProduct({
  title: "Producto 1",
  description: "Esto es una descripcion del prod 1",
  price: 100,
  thumbnail: "estoEsUnaImg1.jpg",
  code: "Code001",
  stock: 20,
});
productManager.addProduct({
  title: "Producto 2",
  description: "Esto es una descripcion del prod 2",
  price: 200,
  thumbnail: "estoEsUnaImg2.jpg",
  code: "Code002",
  stock: 20,
});
productManager.addProduct({
  title: "Producto 3",
  description: "Esto es una descripcion del prod 3",
  price: 300,
  thumbnail: "estoEsUnaImg3.jpg",
  code: "Code003",
  stock: 30,
}); */  

// const allProducts = productManager.getProducts();
// console.log(allProducts); 

// const product01 = productManager.getProductById(1);
// console.log(product01);

// const product3 = productManager.getProductById(2);
// console.log(product3);

// const updatedProduct = productManager.updateProduct(1, {
//      title: "Esto es un cambio",
//      price: 6969,
//      code: "Code003"   
//   });
// console.log(updatedProduct)
// productManager.deleteProduct(2);
  