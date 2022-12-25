//Loading 

setTimeout(()=>{
    document.getElementById('loading').style.display = 'none'
}, 1000*10)

//Loading Scenery

    //cellphone loading
    if(localStorage.getItem('cellphone') == 'in hand'){
        document.getElementById('bedside-table').style.backgroundImage = 'url(./../bedroom-scenery/bedsidetable.png)'
        document.getElementById('cellphone-icon').style.display = 'block'
    }else{
        document.getElementById('bedside-table').style.backgroundImage = 'url(./../bedroom-scenery/bedsidetablewithcellphone.png)'
        document.getElementById('cellphone-icon').style.display = 'none'
    }

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
            
            person.style.backgroundImage = 'url(./../charater/walkingback.gif)'
            person.style.top = position
        }

        //down
        if(key == 83){
            const positionValue = parseInt(getComputedStyle(person).top.replace('px', ''))
            const position = positionValue + 4 + 'px'

            person.style.backgroundImage = 'url(./../charater/walkingfront.gif)'
            person.style.top = position
        }

        //left
        if(key == 65){
            const positionValue = parseInt(getComputedStyle(person).left.replace('px', ''))
            const position = positionValue - 4 + 'px'

            person.style.backgroundImage = 'url(./../charater/walkingleft.gif)'
            person.style.left = position

        }
        

        //right
        if(key == 68){
            const positionValue = parseInt(getComputedStyle(person).left.replace('px', ''))
            const position = positionValue + 4 + 'px'

            person.style.backgroundImage = 'url(./../charater/walkingright.gif)'
            person.style.left = position
        }

        //Limits
        const positionX = parseInt(getComputedStyle(person).left.replace('px', ''))
        const positionY = parseInt(getComputedStyle(person).top.replace('px', ''))

            //Wall
                //wall top
                if(key == 87 && positionY <= -36){
                    person.style.top = '-36px'
                }

                //wall bottom
                if(key == 83 && positionY >= 350){
                    person.style.top = '350px'
                }
            
                //wall left
                if(key == 65 && positionX <= -12){
                    person.style.left = '-12px'
                }

                //wall right
                if(key == 68 && positionX >= 450){
                    person.style.left = '450px'
                }

            //Bedside table
                //bedside table up
                if(key == 87 && positionY <= 140 && positionY >= 100 && positionX >= -12 && positionX <= 16){
                    person.style.top = '140px'
                }

                //bedside table down
                if(key == 83 && positionY >= 100 && positionY <= 136 && positionX >= -12 && positionX <= 16 ){
                    person.style.top = '100px'
                    
                }
                    //zindex person in bedside table
                    const zindexBedsideTable = positionY >= 76 && positionY <= 110 && positionX >= -16 && positionX <= 16
                    if(key == 87 && zindexBedsideTable|| key == 83 && zindexBedsideTable|| key == 65 && zindexBedsideTable|| key == 68 && zindexBedsideTable || zindexBedsideTable){
                        person.style.zIndex = '1'
                    }else{
                        person.style.zIndex = '9'
                    }

                //bedside left
                if(key == 65 && positionX <= 20 && positionY <= 136 && positionY >= 104){
                    person.style.left = '20px'
                }

        
        //Interact Objects
                //exit bedroom
                if(positionX >= 360 && positionX <= 412 && positionY == 350){
                    document.getElementById('exit').style.display = 'block'
                }else{
                    document.getElementById('exit').style.display = 'none'
                }

                //open shelf of pictures
                if(key == 32 && positionX >= 68 && positionX <= 96 && positionY == -36){
                    document.getElementById('pictures').style.display = 'block'
                    setInterval(()=>{
                    console.clear()
                    var file = document.getElementById('image-input').files[0]
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        localStorage.setItem('image', reader.result)
                        document.getElementById('add-image').style.backgroundImage = 'url(' + reader.result + ')'
                    }
                    }, 1000*3)
                }

                //picup cellphone or put cellphone in bedside table

                if(key == 32 && positionX <= 20 && positionY <= 136 && positionY >= 112 ||key == 32 && positionY <= 140 && positionY >= 100 && positionX >= -12 && positionX <= 16 || key == 32 && positionY >= 100 && positionY <= 136 && positionX >= -12 && positionX <= 16){
                    if(localStorage.getItem('cellphone') == "in table"){
                         document.getElementById('bedside-table').style.backgroundImage = "url(./../bedroom-scenery/bedsidetable.png)"
                         localStorage.setItem('cellphone', 'in hand')
                         document.getElementById('cellphone-icon').style.display = 'block'
                    }else{
                        document.getElementById('bedside-table').style.backgroundImage = "url(./../bedroom-scenery/bedsidetablewithcellphone.png)"
                        localStorage.setItem('cellphone', 'in table')
                        document.getElementById('cellphone-icon').style.display = 'none'
                    }
                }
                    //on cellphone
                    document.getElementById('cellphone-icon').addEventListener('click', ()=>{
                        document.getElementById('cellphone').style.display = 'block'
                    })
    })

    //Player stop movements
    addEventListener('keyup',(e)=>{
        const person = document.getElementById('person')
        const key = e.keyCode
         
        //up
         if(key == 87){

            person.style.backgroundImage = 'url(./../charater/back01.png)'
        }
        //down
        if(key == 83){
            person.style.backgroundImage = 'url(./../charater/front01.png)'

        }
        if(key == 65){
            person.style.backgroundImage = 'url(./../charater/left01.png)'
        }
        //right
        if(key == 68){
            person.style.backgroundImage = 'url(./../charater/right01.png)'
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
            bedroomWindow.style.backgroundImage = 'url(./../bedroom-scenery/windownight.png)'
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

