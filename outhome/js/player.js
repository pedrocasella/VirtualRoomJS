    //Person Movements
    addEventListener('keydown', (e)=>{
        const scenary = document.getElementById('outhome')
        const person = document.getElementById('person')
        const key = e.keyCode

        //walking
        //up
        if(key == 87){
            const sceneryValue = parseInt(getComputedStyle(scenary).backgroundPositionY.replace('px', ''))
            const positionValue = parseInt(getComputedStyle(person).top.replace('px', ''))
            const position = positionValue - 2 + 'px'
            const scenaryPosition = sceneryValue + 2 + 'px'

            person.style.backgroundImage = 'url(./../charater/walkingback.gif)'
            person.style.top = position
            scenary.style.backgroundPositionY = scenaryPosition
        }

        //down
        if(key == 83){
            const sceneryValue = parseInt(getComputedStyle(scenary).backgroundPositionY.replace('px', ''))
            const positionValue = parseInt(getComputedStyle(person).top.replace('px', ''))
            const position = positionValue + 2 + 'px'
            const scenaryPosition = sceneryValue - 2 + 'px'

            person.style.backgroundImage = 'url(./../charater/walkingfront.gif)'
            person.style.top = position
            scenary.style.backgroundPositionY = scenaryPosition
        }

        //left
        if(key == 65){
            const sceneryValue = parseInt(getComputedStyle(scenary).backgroundPositionX.replace('px', ''))
            const positionValue = parseInt(getComputedStyle(person).left.replace('px', ''))
            const position = positionValue - 2 + 'px'
            const scenaryPosition = sceneryValue + 2 + 'px'

            person.style.backgroundImage = 'url(./../charater/walkingleft.gif)'
            person.style.left = position
            scenary.style.backgroundPositionX = scenaryPosition
        }
        

        //right
        if(key == 68){
            const sceneryValue = parseInt(getComputedStyle(scenary).backgroundPositionX.replace('px', ''))
            const positionValue = parseInt(getComputedStyle(person).left.replace('px', ''))
            const position = positionValue + 2 + 'px'
            const scenaryPosition = sceneryValue - 2 + 'px'

            person.style.backgroundImage = 'url(./../charater/walkingright.gif)'
            person.style.left = position
            scenary.style.backgroundPositionX = scenaryPosition
        }

    
    
            //Limits for locate
            const positionWorldX = parseInt(getComputedStyle(scenary).backgroundPositionX.replace('px', ''))
            const positionWorldY = parseInt(getComputedStyle(scenary).backgroundPositionY.replace('px', ''))
                        //world top
                        if(key == 87 && positionWorldY >= 0){
                            scenary.style.backgroundPositionY = '0px'
                        }

                        //world bottom
                        if(key == 83 && positionWorldY <= -28){
                            scenary.style.backgroundPositionY = '-28px'
                        }
            
                        //world left
                        if(key == 65 && positionWorldX >= -2){
                            scenary.style.backgroundPositionX = '-2px'
                        }

                        //wall right
                        if(key == 68 && positionWorldX <= -424){
                            scenary.style.backgroundPositionX = '-424px'
                        }
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
