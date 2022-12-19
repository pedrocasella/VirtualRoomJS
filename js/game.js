document.addEventListener('DOMContentLoaded', ()=>{

    //Person Movements
    addEventListener('keydown', (e)=>{

        const person = document.getElementById('person')
        const key = e.keyCode

        //up
        if(key == 87){
            const positionValue = parseInt(getComputedStyle(person).top.replace('px', ''))
            const position = positionValue - 4 + 'px'

            console.log(position)
            person.style.top = position
        }

        //down
        if(key == 83){
            const positionValue = parseInt(getComputedStyle(person).top.replace('px', ''))
            const position = positionValue + 4 + 'px'

            console.log(position)
            person.style.top = position
        }

        //left
        if(key == 68){
            const positionValue = parseInt(getComputedStyle(person).left.replace('px', ''))
            const position = positionValue + 4 + 'px'

            console.log(position)
            person.style.left = position
        }

        //right
        if(key == 65){
            const positionValue = parseInt(getComputedStyle(person).left.replace('px', ''))
            const position = positionValue - 4 + 'px'

            console.log(position)
            person.style.left = position

        }

        //Limits
        const positionX = parseInt(getComputedStyle(person).left.replace('px', ''))
        const positionY = parseInt(getComputedStyle(person).top.replace('px', ''))
            
            //wall top
            console.log(positionY)
            if(key == 87 && positionY <= 0){
                person.style.top = '0px'
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
        
        console.log(key)

    })

    //Objects effects

        //window timer
        const time = new Date().getHours()
        const bedroomWindow = document.getElementById('bedroom-window')
        if(time <= 5 && time >=0 || time <= 23 && time >= 18 ){
            bedroomWindow.style.backgroundImage = 'url(./../bedroom-scenery/window-night.png)'
        }

})

