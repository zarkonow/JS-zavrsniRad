const search = window.location.search 
console.log(search)
const params = search.split('=') 
const id = params[1]
console.log(id)

async function loadUser() {
    const response = await fetch(`http://localhost:3000/users?id=${id}`)
    const userId = await response.json()
    console.log(userId)

    const divTheUser = document.getElementById('divLoadUser')
    for(let i = 0; i < userId.length; i++){
        const h = document.createElement('h1')
        h.innerHTML = `Dobrodosli ${userId[i].firstName} ${userId[i].lastName}`
        divTheUser.appendChild(h)
        const p = document.createElement('p')
        p.innerHTML =
        `Id: ${userId[i].id}<br>
        Korisnicko Ime: ${userId[i].username}<br>
        Sifra: ${userId[i].password}<br>
        Telefon: ${userId[i].phoneNumber}<br>
        Adresa: ${userId[i].address}<br>
        Pol: ${userId[i].gender}<br>
        Admin: ${userId[i].admin}<br>`     
        divTheUser.appendChild(p)

    }
    const link = document.getElementById('link')
  
    const adAdd = document.createElement('a')
        adAdd.innerHTML = 'Dodaj Oglas'
        adAdd.style.cursor = 'pointer'
        adAdd.style.marginRight = '20px'
        adAdd.style.borderRadius = '5px'
        adAdd.style.padding = '5px'
        adAdd.style.color = 'white'
        adAdd.style.backgroundColor = 'green'

        adAdd.addEventListener('click', function(){
            window.open(`./ad_add.html?users=${id}`, '_self')
        })
        link.appendChild(adAdd)
    
        const allAds = document.createElement('a')
        allAds.innerHTML = 'Svi Oglasi'
        allAds.style.marginRight = '20px'
        allAds.style.borderRadius = '5px'
        allAds.style.padding = '5px'
        allAds.style.color = 'white'
        allAds.style.backgroundColor = 'green'
        allAds.style.cursor = 'pointer'
        allAds.addEventListener('click', function(){
            window.open(`./ads.html?users=${id}`, '_self')
        })
        link.appendChild(allAds)
    
}
loadUser();

// zbog filtriranja, ovaj kod iz fje loadAds sam izvukao u posebnu fju showAds
// ova fja kao parametar prima oglase koje treba da prikaze
async function showAds(userAds) {
    // brisanje prethodnog sadrzaja, zbog filtriranja
    const divTitle = document.getElementById('divTitle')
    divTitle.innerHTML = ''
    const divImg = document.getElementById('divImg')
    divImg.innerHTML = ''
    const divDescription = document.getElementById('divDescription')
    divDescription.innerHTML = ''
    const divPrice = document.getElementById('divPrice')
    divPrice.innerHTML = ''
    const divLikes = document.getElementById('divLikes')
    divLikes.innerHTML = ''
    const divReviews = document.getElementById('divReviews')
    divReviews.innerHTML = ''
    const divRating = document.getElementById('divRating')
    divRating.innerHTML = ''
    const divCategory = document.getElementById('divCategory')
    divCategory.innerHTML = ''
    const divDeleteAds = document.getElementById('divDeleteAds')
    divDeleteAds.innerHTML = ''
    const divEditAds = document.getElementById('divEditAds')
    divEditAds.innerHTML = ''

    for(let i = 0; i < userAds.length; i++){
        divTitle.style.display = 'flex';
        
        const pTitle = document.createElement('p')
        pTitle.innerHTML = userAds[i].title
        pTitle.style.objectFit = 'contain';
        pTitle.style.width = '100%'
        pTitle.style.padding = '0'
        pTitle.style.margin = '0'
        divTitle.appendChild(pTitle)

        const imgAds = document.createElement('img')
        imgAds.src = userAds[i].image
        imgAds.style.height = '120px'
        imgAds.style.width = '100%'
        imgAds.style.border = '1px solid gray'
        imgAds.style.objectFit = 'cover';
        divImg.style.display = 'flex';
        divImg.appendChild(imgAds)
    
   
        divDescription.style.display = 'flex';
        const pDesc = document.createElement('p')
        pDesc.innerHTML = `Opis oglasa: <br>${userAds[i].description}`
        pDesc.style.objectFit = 'cover';
        pDesc.style.fontSize = '15px'
        pDesc.style.border = '1px solid gray'
        pDesc.style.width = '100%'
        pDesc.style.margin = '0';
        pDesc.style.padding = '0';
        divDescription.appendChild(pDesc)
       
    
        divPrice.style.display = 'flex';
        
        const pPrice = document.createElement('p')
        pPrice.innerHTML = `Cena: ${userAds[i].price}e`
        pPrice.style.objectFit = 'cover';
        pPrice.style.fontSize = '15px'
        pPrice.style.border = '1px solid gray'
        pPrice.style.width = '100%'
        pPrice.style.margin = '0';
        pPrice.style.padding = '0';
        divPrice.appendChild(pPrice)

    
        divLikes.style.display = 'flex';
        const pLikes = document.createElement('p')
        pLikes.innerHTML = `Likes: ${userAds[i].likes}`
        pLikes.style.objectFit = 'cover';
        pLikes.style.fontSize = '15px'
        pLikes.style.border = '1px solid gray'
        pLikes.style.width = '100%'
        pLikes.style.margin = '0';
        pLikes.style.padding = '0';
        divLikes.appendChild(pLikes)
        
    
        divReviews.style.display = 'flex';
        const pRev = document.createElement('p')
        pRev.innerHTML = `Oglas Posetilo: ${userAds[i].reviews} korisnika`
        pRev.style.objectFit = 'cover';
        pRev.style.fontSize = '15px'
        pRev.style.border = '1px solid gray'
        pRev.style.width = '100%'
        pRev.style.margin = '0';
        pRev.style.padding = '0';
        divReviews.appendChild(pRev)

    
        divRating.style.display = 'flex';
        const pRating = document.createElement('p')
    

        let suma = 0
    // ovde ne moze i kao brojacka promenljiva, jer vec imas jednu petlju po i, moze npr. j
    for (let j = 0; j < userAds[i].rating.length; j++) {
            //console.log(i);
            suma += userAds[i].rating[j]
    }
    let averageRev
    if (userAds[i].rating.length != 0) {
        averageRev = suma / userAds[i].rating.length
        //console.log(averageRev);
    } else {
        averageRev = 0
    }
        pRating.innerHTML = ` ${averageRev} Ocena oglsa`
        pRating.style.objectFit = 'cover';
        pRating.style.fontSize = '15px'
        pRating.style.border = '1px solid gray'
        pRating.style.width = '100%'
        pRating.style.margin = '0';
        pRating.style.padding = '0';
        divRating.appendChild(pRating)
   
    // const response = await fetch(`http://localhost:3000/categories?id=${userAds[i].categoryId}`)
    // ovo vraca jednu kategoriju, jedan objekat, ne niz - to sam ti pisao na slacku, radi i tvoj nacin, ali evo da vidis na sta sam mislio
    const response = await fetch(`http://localhost:3000/categories/${userAds[i].categoryId}`)
    const adsCategories = await response.json()
    console.log(adsCategories)


   
    divCategory.style.display = 'flex';
     //for(let i = 0; i < adsCategories.length; i++){ // i onda ovde nemas for petlju
        const pCate = document.createElement('p')
         //pCate.innerHTML = ` ${adsCategories[i].name}:`
        pCate.innerHTML = ` ${adsCategories.name}:`
        pCate.style.objectFit = 'cover';
        pCate.style.fontSize = '15px'
        pCate.style.color = 'green'
        pCate.style.border = '1px solid green'
        pCate.style.width = '100%'
        pCate.style.margin = '0';
        pCate.style.padding = '0';
        divCategory.appendChild(pCate)
        // }
     }

    for(let i = 0; i < userAds.length; i++){
        
        divDeleteAds.style.display = 'flex';
        const delAdsBtn = document.createElement('button')
        delAdsBtn.style.width = '100%'
        delAdsBtn.innerHTML = `Izbriši Oglas: ${userAds[i].title}`
        delAdsBtn.style.backgroundColor = 'red'
        delAdsBtn.style.color = 'white'
        delAdsBtn.style.padding = '10px'
        delAdsBtn.style.margin = '10px'
        delAdsBtn.style.fontSize = '10px'
        delAdsBtn.style.cursor = 'pointer'
        delAdsBtn.style.borderRadius = '5px'
        delAdsBtn.addEventListener('click', async function(){
            console.log(userAds[i].id)
            await fetch(`http://localhost:3000/ads/${userAds[i].id}`, {
            method: 'DELETE'
            })
        
        })
        divDeleteAds.appendChild(delAdsBtn)

    }

    for(let i = 0; i < userAds.length; i++){
    
    divEditAds.style.display = 'flex';
    const editAdsBtn = document.createElement('button')
    editAdsBtn.style.width = '100%'
    editAdsBtn.innerHTML = `Izmeni Oglas: ${userAds[i].title}`
    editAdsBtn.style.backgroundColor = 'green'
    editAdsBtn.style.color = 'white'
    editAdsBtn.style.padding = '5px'
    editAdsBtn.style.margin = '10px'
    editAdsBtn.style.fontSize = '10px'
    editAdsBtn.style.cursor = 'pointer'
    editAdsBtn.style.borderRadius = '2px'
    editAdsBtn.addEventListener('click',  function(){
        // kod azuriranja, stranici treba da preneses kroz query string id oglasa i id usera
        // userAds[i].id je id oglasa, a id usera je vrednost promenljive id
      
        window.open(`./ad_edit.html?id=${userAds[i].id}&userId=${id}`,'_self')

        })
        divEditAds.appendChild(editAdsBtn)

    }
                   
}

async function loadAds() {
    const response = await fetch(`http://localhost:3000/ads?userId=${id}`)
    const userAds = await response.json()
    console.log(userAds)

    // ovde pozivamo fju napisano iznad 
    await showAds(userAds)



const responseSelectCategories = await fetch('http://localhost:3000/categories')
    const selectCategories = await responseSelectCategories.json()
    console.log(selectCategories)



    const categorySelect = document.getElementById('categorySelect')
    const optionAll = document.createElement('option')
        optionAll.value = 'all'
        optionAll.innerHTML = 'Sve Kategorije'
        categorySelect.appendChild(optionAll)

    for(let i = 0; i < selectCategories.length; i++){
        const option = document.createElement('option')
        option.value = selectCategories[i].id
        console.log(option.value);
        option.innerHTML = selectCategories[i].name
        categorySelect.appendChild(option)
    };


    document.getElementById('filterAds').addEventListener('click', async function () {
        const categoryValue = categorySelect.value;
        console.log(categoryValue);
        if (categoryValue == 'all') {
            
            console.log(userAds);
            // ovde sada da bi se ponovo prikazali svi oglasi, samo treba da pozovemo fju showAds
            showAds(userAds)
        } else {
            // radimo filtriranje
            const filteredAds = userAds.filter(ad => ad.categoryId == categoryValue)
            // da bi se prikazali filtrirani, opet samo pozivamo fju showAds
            await showAds(filteredAds)
        }
    });
    

}
loadAds()