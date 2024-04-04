const search = window.location.search 
const params = search.split('&') 
const categoryId = params[0].split('=')[1]
let string = "query=true";
let userIdValue = string.split('=')[1]; 
let userId = userIdValue == 'true' ? 1 : 0; 
console.log(categoryId, userId)

async function loadCategories(){
    const responseCategories = await fetch(`http://localhost:3000/categories/${categoryId}`);
    const category = await responseCategories.json();
    console.log(category);

    document.getElementById('categoryName').value = category.name
    document.getElementById('categoryImage').value = category.image
}
loadCategories()


document.getElementById('editCategory').addEventListener('click', async function(){
    const categoryName = document.getElementById('categoryName').value;
    const categoryImage = document.getElementById('categoryImage').value;
    
    if (!categoryName || !categoryImage) 
        return  alert('Popunite Sva Polja');
         
           
        const response = await fetch(`http://localhost:3000/categories/${categoryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: categoryName,
                    
                    image: categoryImage,
                    
                })
            })
            const data = await response.json()
            console.log(data)
        
            window.open( `./user.html?id=${userId}`, '_self')  
})