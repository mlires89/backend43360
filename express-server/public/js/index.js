const socket = io();

const productsContainer = document.getElementById("products-container");


socket.on("products-updated", (data)=>{
   
    productsContainer.innerHTML = " ";

    data.forEach( prod => {
        productsContainer.innerHTML += `
        
        <li>ID: ${prod.id}
        <ul>
          <li> Nombre: ${prod.title}</li>
          <li> Descripcion: ${prod.description}</li>
          <li>Precio: ${prod.price}</li>
          <li>Codigo: ${prod.code}</li>
          <li>Stock: ${prod.stock}</li>
        </ul>
        </li>`;
    });   
})