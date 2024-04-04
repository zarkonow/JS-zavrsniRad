
async function loadCategories() {
    const response = await fetch('http://localhost:3000/categories')
    const categories = await response.json()
    console.log(categories)
    
    for (let i = 0; i < categories.length; i++) {

        let currentImage = 0;
        const imageImg = document.getElementById('image')
        const nameP = document.getElementById('name')
    
        function renderImage() {
            
            imageImg.src = categories[currentImage].image
            nameP.innerHTML = categories[currentImage].name

        }
    
        function showNextImage() {
            currentImage = (currentImage + 1) % categories.length;
            renderImage();
        }
    
        function showPreviousImage() {
            currentImage = (currentImage - 1 + categories.length) % categories.length;
            renderImage();
        }
    
        document.getElementById("nextButton").addEventListener("click", showNextImage);
        document.getElementById("previousButton").addEventListener("click", showPreviousImage);
        renderImage();


        const listCategories = document.getElementById('listCategories')
        const ul = document.createElement('ul')
        listCategories.appendChild(ul)
       
        const li = document.createElement('li')
        li.innerHTML = categories[i].name
        ul.appendChild(li)

    }
    
 }    
    
loadCategories()

 async function loadUsers() {
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json()
    console.log(users);
    
    document.getElementById('loginBtn').addEventListener('click', function() {
      const username = document.getElementById('username').value
      const password = document.getElementById('password').value
      console.log(username, password);
  
      for (let i = 0; i < users.length; i++) {
        if (username == users[i].username && password == users[i].password) {
            if(users[i].admin == false){ 
                return window.open(`./user.html?id=${users[i].id}`, '_self')
          
        }else{
            return window.open('./admin.html', '_self')
        }
        }
      }
   alert('Pogresno Korisnicko Ime ili Pasvord')

  
    });

}
loadUsers();





