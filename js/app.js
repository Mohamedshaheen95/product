var productName = document.getElementById("productName")
var productDescription = document.getElementById("productDescription")
var productCategory = document.getElementById("productCategory")
var productPrice = document.getElementById("productPrice")
var productQuantity = document.getElementById("productQuantity")


var product = [];
var mood;

if(localStorage.getItem("pro") == null){
  product= [];
}else{
  product = JSON.parse(localStorage.getItem("pro"))
  productList()
}
function addProduct(){
  if(productName.value !== '' && productDescription.value !== '' && productCategory.value !=='' && productPrice !==''){
    if(add.innerHTML == "Update"){
      if (productQuantity.value < 1) {
        productQuantity.value = 1
    }
      afterUpdate(mood)
    }else{
      var products = {
        name : productName.value,
        description : productDescription.value,
        category : productCategory.value,
        price : productPrice.value,
        quantity : productQuantity.value
      }
      if(products.Count > 1){
        for(i = 0 ; i < products.Count ; i++ ){
          product.push(products)
        }
      }else{
        product.push(products)
      }
      localStorage.setItem("pro", JSON.stringify(product))
      
      
    }
  }else{
    alert('Please fill product')
  }
  productList()
  clearInput()
}
function productList(){
  var productContainer = "";
  var totalPrice = 0;
  for(i =0 ; i<product.length ; i++){
    productContainer +=`
    <tr>
    <td>${i+1}</td>
    <td>${product[i].name}</td>
    <td>${product[i].description}</td>
    <td>${product[i].category}</td>
    <td>${product[i].price}</td>
    <td>${product[i].quantity}</td>
    <td><button class="btn__delete__item" onclick="Delete(${i})">Delate</button></td>
    <td><button class="btn__update__item " onclick="update(${i})">Update</button></td>
    </tr>
    `;
    totalPrice += Number(product[i].price) * Number(product[i].quantity);
  }
  document.getElementById("tFoot").innerHTML= `
  <tr>
  <td colspan="4">Total Price</td>
  <td colspan="4">${totalPrice}</td>
  </tr>
  `
  document.getElementById("tBody").innerHTML= productContainer
}

function deleteAll(){
  if(confirm("do you want delete all product")){
    product.splice(0);
    localStorage.setItem("pro", JSON.stringify(product));
    productList()
  }
  
}

function Delete(i){
  if(confirm("do you want delete this product")){
    Number(--product[i].quantity)
    if (Number(product[i].quantity) < 1) {
        product.splice(i, 1)
    }
  productList()
  localStorage.setItem("pro", JSON.stringify(product));
  }
}

function update(i){
  productName.value = product[i].name
  productDescription.value = product[i].description
  productCategory.value = product[i].category
  productPrice.value = product[i].price
  productQuantity.value = product[i].quantity
  add.innerHTML ='Update'
  mood = i;
}

function afterUpdate(i){
  product[i].name = productName.value
  product[i].description = productDescription.value
  product[i].category = productCategory.value
  product[i].price = productPrice.value 
  product[i].quantity = productQuantity.value
  add.innerHTML ='Add your product'
  productList()
  clearInput()
}

function clearInput(){
  productName.value = ''
  productDescription.value = ''
  productCategory.value = ''
  productPrice.value = ''
  productQuantity.value = ''
}
function search(term){
  var productContainer = "";
  for (i=0 ; i<product.length ; i++){
      if(product[i].name.toLowerCase().includes(term.trim().toLowerCase())){
        productContainer +=`
        <tr>
        <td>${i+1}</td>
        <td>${product[i].name}</td>
        <td>${product[i].description}</td>
        <td>${product[i].category}</td>
        <td>${product[i].price}</td>
        <td>${product[i].quantity}</td>
        <td><button class="btn__delete__item" onclick="Delete(${i})">Delate</button></td>
        <td><button class="btn__update__item " onclick="update(${i})">Update</button></td>
        </tr>
        `
    }
  }
  document.getElementById("tBody").innerHTML= productContainer
}