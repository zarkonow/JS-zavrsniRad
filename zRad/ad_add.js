
const search = window.location.search;
console.log(search);
const params = search.split('=');
const id = params[1];
console.log(id);

async function loadCategory() {
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
    };

document.getElementById('addAd').addEventListener('click', async function () {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const category = categorySelect.value
    const price = Number(document.getElementById('price').value);
    const addImage = document.getElementById('addImage').value;
    console.log(title, description, category, price, addImage);

    

    if (!title || !description || !category || !price || !addImage) {
      return alert('Popunite SVa Polja');
    }

    const response = await fetch(`http://localhost:3000/ads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
        userId: id,
      }),
    });
    const ads = await response.json();
    console.log(ads);

    window.open(`./user.html?id=${id}`, '_self');
  });
}
loadCategory();