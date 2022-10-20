console.clear()
const Contenedor = require('./contenedor.js');

const productos = new Contenedor('productos.txt');

const test = async () => {
	const data = await productos.save({ title: "otroProducto", price: "otroPrecio", thumbnail: "url de la foto del producto" });
	console.log(productos.objects);
    
}

test()

