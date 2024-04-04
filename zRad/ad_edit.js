const search = window.location.search 
const params = search.split('&') // prvo splitujes sa & jer ima dva parametra medjusobno odvojena sa & 
const adId = params[0].split('=')[1] // params[0] je prvi parametar (npr. id=3), pa iz njega isdvajas sve nakon = to je vrednost ida oglasa
const userId = params[1].split('=')[1] // params[1] je drugi parametar (npr. userId=2), pa iz njega isdvajas sve nakon = to je vrednost ida usera
console.log(adId, userId)




async function loadUser() {
    const responseAd = await fetch(`http://localhost:3000/ads/${adId}`)
    const inportAd = await responseAd.json()
    console.log(inportAd)

    const responseSelectCategories = await fetch('http://localhost:3000/categories')
    const selectCategories = await responseSelectCategories.json()
    console.log(selectCategories)

    const categorySelect = document.getElementById('categorySelect')
    for(let i = 0; i < selectCategories.length; i++){
      const option = document.createElement('option')
          
      option.value = selectCategories[i].id
      console.log(option.value);
      option.innerHTML = selectCategories[i].name
      categorySelect.appendChild(option)
    }


    categorySelect.value =inportAd.categoryId
    document.getElementById('title').value = inportAd.title;
    document.getElementById('description').value =  inportAd.description; ;
    document.getElementById('price').value = inportAd.price;
    document.getElementById('addImage').value = inportAd.image;
}
loadUser();

document.getElementById('editAd').addEventListener('click', async function(){


    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const category = categorySelect.value;
    const price = Number(document.getElementById('price').value)
    const addImage = document.getElementById('addImage').value
    console.log(title, description, category, price, addImage );
    
     if (!title || !description || !price || !addImage) {
    return  alert('Popunite Sva Polja');
     
        }
    
    
    const response = await fetch(`http://localhost:3000/ads/${adId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description,
                categoryId: category,
                price: price,
                image: addImage,
                likes: 0,
                views: 0,
                rating: [],
                userId: userId  
            })
        })
        const data = await response.json()
        console.log(data)
    
        window.open( `./user.html?userId=${userId}`, '_self')
    
    })






    