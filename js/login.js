
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
 import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
 import { getDatabase, ref, set, push, onValue, child, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";



 const firebaseConfig = {
   apiKey: "AIzaSyCS9U3iZnhoBqk0i3IsrBV0K0taPT3KPPA",
   authDomain: "casella-virtualroom.firebaseapp.com",
   databaseURL: "https://casella-virtualroom-default-rtdb.firebaseio.com",
   projectId: "casella-virtualroom",
   storageBucket: "casella-virtualroom.appspot.com",
   messagingSenderId: "788596858173",
   appId: "1:788596858173:web:8809da5605133f82983954",
   measurementId: "G-0FB878B2Y8",
   databaseURL: "https://casella-virtualroom-default-rtdb.firebaseio.com/",
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const provider = new GoogleAuthProvider();
 const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', ()=>{

  //Login
  function result(){
    const auth = getAuth(app);
    getRedirectResult(auth)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user)
      localStorage.setItem('uid', user.uid)
      localStorage.setItem('name', user.displayName)
    }).catch((error) => {
      
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  function login(){
    if(localStorage.getItem('uid') != null){
      console.log('logged') 
      const db = getDatabase();
      const dbRef = ref(getDatabase());
      get(child(dbRef, `user/${localStorage.getItem('uid')}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          set(ref(db, 'user/' + localStorage.getItem('uid')), {
            id: localStorage.getItem('uid'),
            name: localStorage.getItem('name'),
          });
        }
      }).catch((error) => {
        console.error(error);
      });
  
      const nameDiv = document.createElement('div')
      const nameId = document.createAttribute('id')
      nameId.value = 'name'
      nameDiv.setAttributeNode(nameId)
      document.getElementById('person').appendChild(nameDiv)
      nameDiv.innerHTML = localStorage.getItem('name')

    }else{
        signInWithRedirect(auth, provider);
    }
  }

  setTimeout(result, 100*1)
  setTimeout(login, 1000*4)

  
//Pictures

  document.getElementById('picture-shelf').addEventListener('click',()=>{
    document.getElementById('pictures').style.display = 'block'
    setInterval(()=>{
      var file = document.getElementById('image-input').files[0]
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        localStorage.setItem('image', reader.result)
        document.getElementById('add-image').style.backgroundImage = 'url(' + reader.result + ')'
      }
    }, 1000*3)

  })

  document.getElementById('send-image-btn').addEventListener('click', ()=>{
    const db = getDatabase();
    const imageRef = ref(db, 'user/' + localStorage.getItem('uid') + '/images')
    const pushImage = push(imageRef)
    document.getElementById('image-area').innerHTML = ''
    set(pushImage, {
      file: localStorage.getItem('image'),
    });

    setTimeout(()=>{
      localStorage.removeItem('image')
    }, 1000*2)

  })

  function addImage(){
    const db = getDatabase();
    const imageRef = ref(db, 'user/' + localStorage.getItem('uid') + '/images')
    onValue(imageRef, (snapshot) => {
      const data = snapshot.val();
      snapshot.forEach((childSnapshot)=>{
        const key = childSnapshot.key
        const data = childSnapshot.val()
        const imageArea = document.getElementById('image-area')
        const li = document.createElement('li')
        const liId = document.createAttribute('id')
        liId.value = 'li-image'
        li.setAttributeNode(liId)
        imageArea.appendChild(li)
        const img = document.createElement('img')
        img.src = data.file
        li.appendChild(img)
      });
    });
  }
  setTimeout(addImage, 1000*4)

  document.getElementById('return-btn').addEventListener('click', ()=>{

    document.getElementById('pictures').style.display = 'none'
  })


})