
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
 import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
 import { getDatabase, ref, set, push, onValue, child, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";



 const firebaseConfig = {
    apiKey: "AIzaSyAEuHA_ublHg2YKSiNv4EBZFDv6S0OTIBg",
    authDomain: "virtual-bedroom.firebaseapp.com",
    databaseURL: "https://virtual-bedroom-default-rtdb.firebaseio.com",
    projectId: "virtual-bedroom",
    storageBucket: "virtual-bedroom.appspot.com",
    messagingSenderId: "303432228539",
    appId: "1:303432228539:web:2b0c460feb4ce14255539e"
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
      const db = getDatabase();
      const dbRef = ref(getDatabase());
      get(child(dbRef, `user/${localStorage.getItem('uid')}`)).then((snapshot) => {
        if (snapshot.exists()) {
          
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
  setTimeout(login, 1000*8)

  
//Pictures

  //send image to shelf
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

  //add image in shelf
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
  setTimeout(addImage, 1000*6)

  //exit to shelf
  document.getElementById('return-btn').addEventListener('click', ()=>{

    document.getElementById('pictures').style.display = 'none'
  })

//Messages

  const db = getDatabase()
    onValue(ref(db, 'user/globalMessages'), (snapshot) => {  
      snapshot.forEach((snapshot)=>{
        const data = snapshot.val();
        const key = snapshot.key
        document.getElementById('messages-box').innerHTML += "<ul class='message'><li class='nameCtt'>" + data.sender + "</li><li class='sendedMessage'>" + data.message + "</li></ul><hr>"
       
      })
    });

    document.getElementById('sendMenssage-btn').addEventListener('click', ()=>{
      if(document.getElementById('message-input').value == ''){
        alert('Message not sended!')
      }else{
        const message = document.getElementById('message-input').value
        const messageRef = ref(db, 'user/globalMessages')
        const messagePush = push(messageRef)
        document.getElementById('messages-box').innerHTML = ''
        set(messagePush, {
          sender: localStorage.getItem('name'),
          message: message,
        })
        document.getElementById('message-input').value = ''
      }

    })
})