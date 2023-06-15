import fs from "fs";

class CartManager {
    constructor (path){
        this.path=path,
        this.carts =[]
    }
        
    //creo esta funcion para consultar la data del archivo
    async consultarArchivo() {
        try {
          const carts = await fs.promises.readFile(this.path, "utf-8");        
          this.carts=JSON.parse(carts);
        } catch (e) {
            await fs.promises.writeFile(this.path,"");
            this.carts=[];
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
    
    async deleteCart (id){
        await this.consultarArchivo();  
        const index = this.carts.findIndex((c)=> c.id === id);
        if (index > -1){
            this.carts.splice(index,1);
            let cartStr = JSON.stringify(this.carts);
            await this.escribirArchivo(cartStr);
        }else{
            console.log(`Carrito id: ${id} no encontrado`);
        }
    }

    async addCart(){
        await this.consultarArchivo();
        const newCart ={
            id:this.carts.length,
            products:[],
        }

        this.carts.push(newCart);
        let cartStr = JSON.stringify(this.carts);
        await this.escribirArchivo(cartStr);
    }





    async addProdToCart(cartID,prodID){
               
        await this.consultarArchivo();  
        const cIndex = this.carts.findIndex((c)=> c.id === cartID);
        if (cIndex >-1){
            const pIndex = this.carts[cIndex].products.findIndex((p)=> p.id === prodID);
           
            if(pIndex >-1){
                    this.carts[cIndex].products[pIndex].quantity ++;

            }else{                
                const newProduct = {
                    id:prodID,
                    quantity:1,
                }
                this.carts[cIndex].products.push(newProduct);
            }

            let cartStr = JSON.stringify(this.carts);
            await this.escribirArchivo(cartStr);   
        }else{
           console.log("Cart not found");
        }

    }


    async getCarts(){
        await this.consultarArchivo();  
        return this.carts;
    }


    async getCartById(id){
        await this.consultarArchivo();  
        const cart = this.carts.find((cr)=>cr.id ===id);

        if (!cart){
            console.log("Not found");
        }else{
            return cart;
        }
    }


}


export default CartManager;