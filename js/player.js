//Loading

setInterval(()=>{
    document.getElementById('loading').style.display = 'none'
}, 1000*10)

document.addEventListener('DOMContentLoaded', ()=>{

    //Person Movements
    addEventListener('keydown', (e)=>{

        const person = document.getElementById('person')
        const key = e.keyCode

        //walking
        //up
        if(key == 87){
            const positionValue = parseInt(getComputedStyle(person).top.replace('px', ''))
            const position = positionValue - 4 + 'px'

            person.style.animation = 'walking-back .6s infinite'
            person.style.top = position
        }

        //down
        if(key == 83){
            const positionValue = parseInt(getComputedStyle(person).top.replace('px', ''))
            const position = positionValue + 4 + 'px'
            person.style.animation = 'walking-front .6s infinite'
            person.style.top = position
        }

        //left
        if(key == 65){
            const positionValue = parseInt(getComputedStyle(person).left.replace('px', ''))
            const position = positionValue - 4 + 'px'

            person.style.animation = 'walking-left .6s infinite'
            person.style.left = position

        }
        

        //right
        if(key == 68){
            const positionValue = parseInt(getComputedStyle(person).left.replace('px', ''))
            const position = positionValue + 4 + 'px'

            person.style.animation = 'walking-right .6s infinite'
            person.style.left = position
        }

        //Limits
        const positionX = parseInt(getComputedStyle(person).left.replace('px', ''))
        const positionY = parseInt(getComputedStyle(person).top.replace('px', ''))
            
            //wall top
            if(key == 87 && positionY <= -36){
                person.style.top = '-36px'
            }

             //wall bottom
             if(key == 83 && positionY >= 350){
                 person.style.top = '350px'
             }

            //wall left
            if(key == 68 && positionX >= 450){
                person.style.left = '450px'
            }
        
            //wall right
            if(key == 65 && positionX <= 0){
                person.style.left = '0px'
            }
        
    //Interact Objects
            //exit bedroom
            if(positionX >= 360 && positionX <= 412 && positionY == 350){
                document.getElementById('exit').style.display = 'block'
            }else{
                document.getElementById('exit').style.display = 'none'
            }

            //open shelf of pictures
            if(positionX >= 68 && positionX <= 96 && positionY == -36){
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
            }

    })

    //Player stop movements
    addEventListener('keyup',(e)=>{
        const person = document.getElementById('person')
        const key = e.keyCode
         
        //up
         if(key == 87){

            person.style.backgroundImage = 'url(/../charater/back01.png)'
            person.style.animation = 'none'
        }
        //down
        if(key == 83){
            person.style.backgroundImage = 'url(/../charater/front01.png)'
            person.style.animation = 'none'

        }
        if(key == 65){
            person.style.backgroundImage = 'url(/../charater/left01.png)'
            person.style.animation = 'none'
        }
        //right
        if(key == 68){
            person.style.backgroundImage = 'url(/../charater/right01.png)'
            person.style.animation = 'none'
        }

    })
    
    //Movement with Mouse
    addEventListener('click', (e)=>{

        const player = document.getElementById('person')

        const rect = e. target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        //console.log('X: ' + x + ' e Y: ' + y)

    })
    //Objects effects

        //window timer
        const time = new Date().getHours()
        const bedroomWindow = document.getElementById('bedroom-window')
        if(time <= 5 && time >=0 || time <= 23 && time >= 18 ){
            bedroomWindow.style.backgroundImage = 'url(/../bedroom-scenery/windownight.png)'
        }

        //door exit
        document.getElementById('cancel-btn').addEventListener('click', ()=>{
            document.getElementById('exit').style.display = 'none'

        })

        document.getElementById('exit-btn').addEventListener('click', ()=>{
            localStorage.clear()
            location.reload()

        })

        //close cellphone
        document.getElementById('close-cellphone').addEventListener('click', ()=>{
            document.getElementById('cellphone').style.display = 'none'
        })

})

