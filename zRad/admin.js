const search = window.location.search
console.log(search);
const params = search.split('=')
console.log(params);
const id = params[1]
console.log(id);





let users
console.log(users);
async function loadAdmin() {
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();
    console.log(users);
      
var adm = users.filter(user => user.admin == true);
    console.log(adm);


for(let i = 0; i < adm.length; i++){
    const divAdmin = document.getElementById('admin')
    const p = document.createElement('p')
    p.style.fontSize = '16px'
    p.style.fontFamily = 'Arial, Helvetica, sans-serif'
    p.style.color =  'rgb(45, 44, 44)'
    divAdmin.appendChild(p)
    
    p.innerHTML = `Id: ${adm[i].id}</br>
    Status: Administrator</br>
    Ime: ${adm[i].firstName}</br> 
    Prezime: ${adm[i].lastName}</br>
    Korisnicko Ime: ${adm[i].username}</br>
    Lozinka: ${adm[i].password}</br> 
    Telefon: ${adm[i].phoneNumber}</br>  
    Adresa: ${adm[i].address}</br>
    Pol: ${adm[i].gender}</br> `  

    }


}
loadAdmin();

async function loadCategories() {
    const responseCategories = await fetch(`http://localhost:3000/categories`);
    const category = await responseCategories.json();
    console.log(category);

    const divAddCategory = document.getElementById('dodajKategoriju') 
    const addBtn = document.createElement('button')
    addBtn.innerHTML = 'Dodaj Novu Kategoriju' 
    addBtn.addEventListener('click', function() {
    
    
        window.open( `./category_add.html?id=${id}`, '_self' )
    })

    divAddCategory.appendChild(addBtn)

const divCategories = document.getElementById('categories')
const divDelCategory = document.getElementById('deleteCategory')
for(let i = 0; i < category.length; i++){

    const a = document.createElement('a')
    a.style.textDecoration = 'none'
    a.innerHTML = `  ${category[i].name} <br>`
    a.setAttribute('href', ` ./category_edit.html?categories=${category[i].id}&users=${id}`)
    
    const btnDelCategory = document.createElement('button')
    btnDelCategory.innerHTML += `  ${category[i].name} `
    btnDelCategory.style.textDecoration = 'none'
    btnDelCategory.style.color = 'red'
    btnDelCategory.style.fontSize = '15px'
    btnDelCategory.style.fontFamily = 'Arial, Helvetica, sans-serif'
    btnDelCategory.style.marginRight= '20px'
    btnDelCategory.addEventListener('click', async function(){

    await fetch(`http://localhost:3000/categories/${category[i].id}`, {
        method: 'DELETE'
    })
   
    a.remove()
    this.remove()
    
})
divCategories.appendChild(a);
divDelCategory.appendChild(btnDelCategory)
}
  
}
loadCategories();


async function productsSearch() {
    const responseSearch = await fetch('http://localhost:3000/categories');
    const productsSearch = await responseSearch.json();
    console.log(productsSearch);

    document.getElementById('btn-search').addEventListener('click', function(){   
    const search = document.getElementById('input-search').value.toLowerCase()
    console.log(search);

    if(search == ''){
        return alert('Popunite Polje za Pretragu Kategorije')
    }
    
   
    const searchName = productsSearch.filter(category => category.name.toLowerCase().includes(search))
    console.log(searchName);

    if(searchName.length == 0){
        return alert('Nepostojeca Kategorija')
    }
    });   
}
productsSearch()





        



