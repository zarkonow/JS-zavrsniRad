const search = window.location.search 
console.log(search)
const params = search.split('=') 
const id = params[1]
console.log(id)



async function loadAds() {
    const responseAds = await fetch(`http://localhost:3000/ads`);
    const userAds = await responseAds.json();
    const table = document.getElementById('table');

    

    for (let i = 0; i < userAds.length; i++) {
        const tr = document.createElement('tr');
        tr.style.border = '1px solid blue';
    
        const titleTd = document.createElement('td');
        titleTd.innerHTML = `${userAds[i].title.substring(0, 6)}...`;
        tr.appendChild(titleTd);

        const btnAboutAd = document.createElement('button');
        btnAboutAd.textContent = 'Saznaj Vise';
        btnAboutAd.addEventListener('click', async function() {
            
            userAds[i].reviews++
            await fetch(`http://localhost:3000/ads/${userAds[i].id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userAds[i])
                

            })

            window.location.href = `./ad_info.html?adsId=${userAds[i].id}&userId=${userAds[i].userId}`;
        })

        const tdBtn = document.createElement('td');
        tdBtn.appendChild(btnAboutAd);
        tr.appendChild(tdBtn);
        table.appendChild(tr);

        const imgTd = document.createElement('td');
        const img = document.createElement('img');
        img.src = userAds[i].image;
        img.style.height = '50px';
        img.style.width = '50px';
        img.style.objectFit = 'contain';
        imgTd.appendChild(img);
        tr.appendChild(imgTd);
        table.appendChild(tr);

        const td = document.createElement('td')

        td.style.border = '1px solid blue'
        td.innerHTML = `${userAds[i].description.substring(0, 30)}...`
        tr.appendChild(td);

        const priceTd = document.createElement('td')
        priceTd.style.border = '1px solid blue';
        priceTd.innerHTML = `Cena: <br>${userAds[i].price}`
        tr.appendChild(priceTd);

        const likesTd = document.createElement('td')
        likesTd.style.border = '1px solid blue'
        likesTd.innerHTML = `Likes: <br>${userAds[i].likes}`
        tr.appendChild(likesTd);

        const revTd = document.createElement('td')
        revTd.style.border = '1px solid blue'
        revTd.innerHTML = `Pregledi: <br>${userAds[i].reviews}`
        tr.appendChild(revTd);

        let suma = 0;
        for(let j = 0; j < userAds[i].rating.length; j++) {
            suma += userAds[i].rating[j];
        }
        let averageRev;
        if (userAds[i].rating.length != 0) {
            averageRev = suma / userAds[i].rating.length;
            //console.log(averageRev);
        } else {
            averageRev = 0;
        }
        const avgTd = document.createElement('td');
        avgTd.style.border = '1px solid blue';
        avgTd.innerHTML = `Ocena Oglasa: <br>${averageRev.toFixed(1)}`;
        tr.appendChild(avgTd);

        const resCategories = await fetch(`http://localhost:3000/categories/${userAds[i].categoryId}`);
        const userCate = await resCategories.json();
        //console.log(userCate);

        const tdCat = document.createElement('td');
        tdCat.style.border = '1px solid blue';
        tdCat.innerHTML = `Kategorija: <br>${userCate.name}`
        tr.appendChild(tdCat);

        const responsUsers = await fetch(`http://localhost:3000/users/${userAds[i].userId}`)
                const user = await responsUsers.json()
                //console.log(user)
        
                const tdUsers = document.createElement('td')
                tdUsers.style.border = '1px solid blue'
                tdUsers.innerHTML = `Oglas Korisnika: <br>${user.username}`
                tr.appendChild(tdUsers)
    }

    
    const responseSelectCategories = await fetch('http://localhost:3000/categories');
    const selectCategories = await responseSelectCategories.json();
    const categorySelect = document.getElementById('select');

    for (let i = 0; i < selectCategories.length; i++) {
        const category = selectCategories[i];
        const option = document.createElement('option');
        option.value = category.id;
        option.innerHTML = category.name;
        categorySelect.appendChild(option);
    }

   
    document.getElementById('filterAds').addEventListener('click', async function() {
        const minPrice = Number(document.getElementById('minPrice').value);
        const maxPrice = Number(document.getElementById('maxPrice').value);
        
        
        const categoryValue = categorySelect.value;
        let filteredAds = userAds.filter(ad => ad.categoryId == categoryValue)
        console.log(filteredAds);

        for (let i = 0; i < filteredAds.length; i++) { 
        let price = filteredAds[i].price
        console.log(price);
                    if(minPrice =='' && maxPrice == ''){
                        return alert('Popunite Sva Polja')
                    }
                    
                   if ( price >= minPrice && price <= maxPrice) {
                        let name = filteredAds[i].title
                        console.log(name);
                   }


                }
        const selectSort = document.getElementById('selectSort').value;
        const selectWay = document.getElementById('selectWay').value;
        console.log(selectSort, selectWay);
        if (selectSort == 'price') {
            if (selectWay == 'ASC') {
                filteredAds.sort((a, b) => a.price - b.price);
            } else {
                filteredAds.sort((a, b) => b.price - a.price);
            }
        } else if (selectSort === 'likes') {
            if (selectWay === 'ASC') {
                filteredAds.sort((a, b) => a.likes - b.likes);
            } else {
                filteredAds.sort((a, b) => b.likes - a.likes);
            }
        } else if (selectSort === 'reviews') {
            if (selectWay === 'ASC') {
                filteredAds.sort((a, b) => a.reviews - b.reviews);
            } else {
                filteredAds.sort((a, b) => b.reviews - a.reviews);
            }
        } else if (selectSort == 'rating') {
            if (selectWay == 'ASC') {
                averageRev.sort((a, b) => a.rating - b.rating )
            } else {
                averageRev.sort((a, b) => b.rating - a.rating )
            }
        }

        
        const displayFiltered = document.getElementById('displayFiltered');
        displayFiltered.innerHTML = '';

        if (filteredAds.length == 0) {
            alert('Nema Takvh oglasa');
            return;
        }

        for (let i = 0; i < filteredAds.length; i++) {
            const a = document.createElement('a');
            a.addEventListener('click', async function() {
    
                filteredAds[i].reviews++
                await fetch(`http://localhost:3000/ads/${filteredAds[i].id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(filteredAds[i])
                    
            
                })
            
                window.location.href = `./ad_info.html?adId=${filteredAds[i].id}&userId=${filteredAds[i].userId}`;
            })
            
            // a.innerHTML = `${filteredAds[i].title}<br>`;
            // a.style.textDecoration = 'underline';
            // a.style.cursor = 'pointer'
            // a.style.color = 'orange';
            // displayFiltered.appendChild(a);
        }
        showAds(filteredAds)
    });
    
    
}
loadAds();


async function showAds(userAds) {
    const table = document.getElementById('table');
    table.innerHTML = ''
    for (let i = 0; i < userAds.length; i++) {
        const tr = document.createElement('tr');
        tr.style.border = '1px solid blue';

        const titleTd = document.createElement('td');
        titleTd.innerHTML = `${userAds[i].title.substring(0, 6)}...`;
        tr.appendChild(titleTd);

        const btnAboutAd = document.createElement('button');
        btnAboutAd.textContent = 'Saznaj Vise';
        btnAboutAd.addEventListener('click', async function() {
            
            userAds[i].reviews++
            await fetch(`http://localhost:3000/ads/${userAds[i].id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userAds[i])
                

            })

            window.location.href = `./ad_info.html?adsId=${userAds[i].id}&userId=${userAds[i].userId}`;
        })

        const tdBtn = document.createElement('td');
        tdBtn.appendChild(btnAboutAd);
        tr.appendChild(tdBtn);
        table.appendChild(tr);

        const imgTd = document.createElement('td');
        const img = document.createElement('img');
        img.src = userAds[i].image;
        img.style.height = '50px';
        img.style.width = '50px';
        img.style.objectFit = 'contain';
        imgTd.appendChild(img);
        tr.appendChild(imgTd);
        table.appendChild(tr);

        const td = document.createElement('td')

        td.style.border = '1px solid blue'
        td.innerHTML = `${userAds[i].description.substring(0, 30)}...`
        tr.appendChild(td);

        const priceTd = document.createElement('td')
        priceTd.style.border = '1px solid blue';
        priceTd.innerHTML = `Cena: <br>${userAds[i].price}`
        tr.appendChild(priceTd);

        const likesTd = document.createElement('td')
        likesTd.style.border = '1px solid blue'
        likesTd.innerHTML = `Likes: <br>${userAds[i].likes}`
        tr.appendChild(likesTd);

        const revTd = document.createElement('td')
        revTd.style.border = '1px solid blue'
        revTd.innerHTML = `Pregledi: <br>${userAds[i].reviews}`
        tr.appendChild(revTd);

        let suma = 0;
        for(let j = 0; j < userAds[i].rating.length; j++) {
            suma += userAds[i].rating[j];
        }
        let averageRev;
        if (userAds[i].rating.length != 0) {
            averageRev = suma / userAds[i].rating.length;
            //console.log(averageRev);
        } else {
            averageRev = 0;
        }
        const avgTd = document.createElement('td');
        avgTd.style.border = '1px solid blue';
        avgTd.innerHTML = `Ocena Oglasa: <br>${averageRev.toFixed(1)}`;
        tr.appendChild(avgTd);

        const resCategories = await fetch(`http://localhost:3000/categories/${userAds[i].categoryId}`);
        const userCate = await resCategories.json();
        //console.log(userCate);

        const tdCat = document.createElement('td');
        tdCat.style.border = '1px solid blue';
        tdCat.innerHTML = `Kategorija: <br>${userCate.name}`
        tr.appendChild(tdCat);

        const responsUsers = await fetch(`http://localhost:3000/users/${userAds[i].userId}`)
                const user = await responsUsers.json()
                //console.log(user)
        
                const tdUsers = document.createElement('td')
                tdUsers.style.border = '1px solid blue'
                tdUsers.innerHTML = `Oglas Korisnika: <br>${user.username}`
                tr.appendChild(tdUsers)
    }
}


