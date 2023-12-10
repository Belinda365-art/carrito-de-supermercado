const content = document.querySelector('content-card')
const categoriesContent = document.querySelector('.categories')
let count = 0
let total = 0
let cart = []
let totales = []
let totalContel = document.querySelector('#total')
let countContent = document.querySelector('.count')
document.addEventListener('DOMContentLoaded',()=> {
    main()
})

function main(){
    getAllCategories()
    getAllproducts()
    totalContel.innerHTML = `$${total}`
    const cart = document.querySelector('.fa-cart-shopping')
    cart.addEventListener('click', ()=> {
        const listShopping = document.querySelector('.listShopping')
        listShopping.classList.toggle('inactive')
    })
    const home = document.querySelector('#home')
    home.addEventListener('click', getAllproducts)
    const shoMobileCategories = document.querySelector('.fa-bars')
    countContent.innerHTML = count
    shoMobileCategories.addEventListener('click', ()=> {
        categoriesContent.classList.toggle('inactive')
    })
}
 

const getAllproducts = async ()=> {
    try{
        const url = "https://fakestoreapi.com/products"
         const respuesta = await fetch(url)
         const resultado = await respuesta.json()
        showproduct(resultado)

    } catch (error){
       console.log(error);
    }
}

const getAllCategories = async ()=> {
    try{
        const url = "https://fakestoreapi.com/products/categories"
         const respuesta = await fetch(url)
         const resultado = await respuesta.json()
        resultado.array.forEach(category => {
           const categories = document.createElement('p')
           categories.innerText =indice
           categories.addEventListener('click', ()=> {
            getCategory(category)
           })
           categoriesContent.appendChild(categories)
        });

    } catch (error){
       console.log(error);
    }
}

const getCategory = async (category) =>{
    try{
        const url = `https://fakestoreapi.com/products/category/${category}`
         const respuesta = await fetch(url)
         const resultado = await respuesta.json()
        showproduct(resultado)

    } catch (error){
       console.log(error);
    }
}


const showproduct = (products) => {
    removeHTML(content)
   products.forEach(product => {
    const {id,title, image, price} = product
    const card = document.createElement('div')
    card.classList.add('card')
    const infoCard = document.createElement('div')
    infoCard.classList.add('infoCard')
    const imageProduct = document.createElement('img')
    imageProduct.src = image
    const titleProduct = document.createElement('h2')
    titleProduct.addEventListener('click', ()=>{
        showModal(product)
    })
    titleProduct.innerText = title
    const priceProduct = document.createElement('p')
    priceProduct.innerText = `$${price}`
    const button = document.createElement('button')
    button.innerText = "Add to cart"
    button.classList.add('btn')
    button.addEventListener('click', ()=> {
        cart.push(product)
        const inCartIndex = cart.findIndex(index => index.id === id )
        if(inCartIndex !== -1){
            cart[inCartIndex].total += price 
            cart[inCartIndex].quantity += 1
        }
        else{
            cart.push({
                id,
                title,
                image,
                price,
                total: price,
                quantity : 1
            })
        }

        totales.push(price)
        let totalGeneral = totales.reduce((a,b) => a + b, 0)
        totalContel.innerHTML = `$${totalGeneral.toLocaleString("en")}`
        countContent.innerHTML = count += 1
        addCart(cart)
    })
    infoCard.append(imageProduct,titleProduct,priceProduct)
    card.append(infoCard,button)
    content.append(card)
   })

}

const addCart = (cart) => {
   const contentListShopping  = document.querySelector('.content-listShopping')
    removeHTML(contentListShopping)
    cart.forEach( product => {
        const contentproduct = document.createElement('div')
        const removeProduct = document.createElement('span')
        removeProduct.innerText = "x"

        //EVENTO CLICK ELIMINAR PRODUCTO
        removeProduct.addEventListener('click', ()=> {
            deleteProduct(product)
        })

contentproduct.classList.add('contentProductList')
 const img = document.createElement('img')
 img.src = product.image
 const title = document.createElement('H3')
 title.innerText = product.title
 const price = document.createElement('p')
 price.innerText = product.total
 contentproduct.append(img,title, price, removeProduct)
 contentListShopping.appendChild(contentproduct)
 
    })
}
    const deleteProduct = (product)=> {
      countContent.innerHTML = count -= product.quauntity
      const filterProduct = cart.filter(f => f.id !== product.id)
      cart = [...filterProduct]

     const newTotalGeneral = filterProduct.reduce((a,b) => a + b.total,0)
     
     if(newTotalGeneral === 0){
        totales = []
     }
     totalContel.innerHTML = `$${newTotalGeneral.toLocaleString("en")}`
     addCart(card)


    }
    const showModal= (product)=> {
    const modal = document.createElement('div')
    modal.classList.add('modal')
    modal.innerHTML = `
    <div class="mooreinfo">
    <span  class="closed">x</span>
    <h2>${product.title}</h2>
    <img src"${product.image}" alt="${product.title}">
    <p>${product.description}</p>
    </div>
    `
setTimeout(()=> {
    const moteInfo = document.querySelector('.moreInfo')
    moreInfo.classList.add('animated')

}, 100)

modal.addEventListener('click', e => {
    e.preventDefault()
    if(e.target.classList.contains('closed')){
 const moteInfo = document.querySelector('.moreInfo')
    moreInfo.classList.add('close')
    setTimeout(()=> {
        modal.remove()
    },500)
 }
})
    document.querySelector('.content').appendChild(modal)
    }
    const removeHTML = (HTML)=> {
    while(HTML.firstChild){
    HTML.removeChild(HTML.firstChild)
   }
}