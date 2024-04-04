async function registerUser() {
  
    const name = document.getElementById('input-name').value
    const surname = document.getElementById('input-surname').value;
    const phoneNumber = Number(document.getElementById('input-phoneNumber').value)
    const adresa = document.getElementById('input-adresa').value;
    const username = document.getElementById('input-username').value
    const password = document.getElementById('input-password').value;
    const confirmPassword = document.getElementById('input-confirmPassword').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const admin = document.getElementById('admin').checked;
    console.log(username,password, confirmPassword, gender, admin);
        
      const responseFirst = await fetch('http://localhost:3000/users');
      const logName = await responseFirst.json();
      console.log(logName);
    
      const endUser = logName.find(user => user.username === username);
    
    if (endUser) {
      return alert('Korisnicko ime je zauzeto, odaberite drugo');
    }
     
    
    if (!username || !password || !confirmPassword || !gender) {
      return alert('Molimo popunite sve podatke!');
        
    }

    // stavio sam 3 zbog laksih provera
    if (username.length < 3 || password.length < 3) {
      return alert('Korisnicko Ime i Sifra moraju imati najmanje 3 karaktera!');
        
    }

    if (password != confirmPassword) {
      return alert('Ponovite Sifru!');
        
    }

  const responseSecond = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        name: name,
        surname: surname,
        phoneNumber: phoneNumber,
        adresa: adresa,
        username: username,
        password: password,
        gender: gender ? gender.value: '',
        admin: admin
        })
        
    })
    const users = await responseSecond.json()
    console.log(users)

    window.open('./index.html', '_self')
    
}



