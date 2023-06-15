import fs from "fs";

class ProductManager {
    
    constructor (path){
        this.path=path,
        this.products =[]
    }
    
   
    
    //creo esta funcion para consultar la data del archivo
    async consultarArchivo() {
        try {
          const prods = await fs.promises.readFile(this.path, "utf-8");        
          this.products=JSON.parse(prods);
        } catch (e) {
            await fs.promises.writeFile(this.path,"");
            this.products=[];
        }
    }

    //creo esta funcion para escribir la data en el archivo
    async escribirArchivo(data){
        try{
            await fs.promises.writeFile(this.path,data)
        }catch(err){
            throw err;
        }
    }
    

    async addProduct(data){
        
        await this.consultarArchivo();  
        if (!data.title || !data.description || !data.price || !data.code || !data.category || !data.stock){
            throw new Error (`Faltan datos para ingresar el producto`);
        }else{
            const producto = this.products.find((pr)=> pr.code === data.code);            
            if (producto){
                console.log(`El producto con Código ${producto.code} ya existe`);
            }else{    
                const productoNuevo = {
                    id:this.products.length,
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    code:data.code,
                    category:data.category,
                    stock:data.stock,
                    status:data.status,
                    thumbnails:data.thumbnails
                }
                this.products.push(productoNuevo);
                let prodStr = JSON.stringify(this.products);
                await this.escribirArchivo(prodStr);
            }
        
        }
    }


    async getProducts(){
        await this.consultarArchivo();  
        return this.products;
    }

    async getProductById(id){
        await this.consultarArchivo();  
        const producto = this.products.find((pr)=>pr.id ===id);

        if (!producto){
            console.log("Not found");
        }else{
            return producto;
        }
    }

    async updateProduct (obj){
        await this.consultarArchivo();  
        const producto = this.products.find((pr)=>pr.id ===obj.id);
        if (producto){
            const index = this.products.findIndex((p)=> p.id === obj.id);
            const arrObjKey = Object.keys(obj); //cargo un array con las keys del objeto que viene por parámetro
            arrObjKey.forEach((key)=>{
                switch(key){
                    case "title" :
                        producto.title = obj.title;
                        break;
                    case "description" :
                        producto.description = obj.description;
                        break;
                    case "price":
                        producto.price = obj.price;
                        break;
                    case "thumbnails":
                        producto.thumbnails = obj.thumbnails;
                        break;
                    case "code" :
                        producto.code = obj.code;
                        break;
                    case "stock":
                        producto.stock = obj.stock;
                        break;
                    case "stock":
                        producto.category = obj.category;
                    break;
                    default:
                        console.log('key not found');
                }
            });
            this.products.splice(index,1,producto);
            let prodStr = JSON.stringify(this.products);
            await this.escribirArchivo(prodStr);
        }else{
            console.log('Producto no encontrado')
        }
    }

    async deleteProducto(id){
        await this.consultarArchivo();  
        const index = this.products.findIndex((p)=> p.id === id);
        if (index > -1){
            this.products.splice(index,1);
            let prodStr = JSON.stringify(this.products);
            await this.escribirArchivo(prodStr);
        }else{
            console.log(`Producto id: ${id} no encontrado`);
        }
    }
}


export default ProductManager;