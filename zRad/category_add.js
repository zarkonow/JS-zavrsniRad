
const search = window.location.search 
const params = search.split('&') // prvo splitujes sa & jer ima dva parametra medjusobno odvojena sa & 
const adId = params[0].split('=')[1] // params[0] je prvi parametar (npr. id=3), pa iz njega isdvajas sve nakon = to je vrednost ida oglasa
const userId = params[1].split('=')[1] // params[1] je drugi parametar (npr. userId=2), pa iz njega isdvajas sve nakon = to je vrednost ida usera
console.log(adId, userId)



document.getElementById('addCategory').addEventListener('click',async function(){
    
const categoryName = document.getElementById('categoryName').value
const categoryImage = document.getElementById('categoryImage').value
console.log(categoryName, categoryImage);

  if (!categoryName || !categoryImage) {
    return alert('Popunite SVa Polja');
    }
  
  const response = await fetch(`http://localhost:3000/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      name: categoryName,
      image: categoryImage,
      }),
    });
    const ads = await response.json();
    console.log(ads);
  
    window.open(`./user.html?id=${userId}`, '_self');

  
})