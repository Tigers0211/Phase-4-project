
import './ColorGenerator.css'

function ColorGenerator(){


function handleChange (e) {
    var compColors = require('complementary-colors');
    const color = new compColors(e.target.value)
    const setOfColors = color.square()
    console.log(setOfColors)
    const first = setOfColors[1]
    const second = setOfColors[2]
    const third = setOfColors[3]
    const firstColor= first.r
    document.documentElement.style.setProperty('--color-one', firstColor )
    const secondColor= first.g
    document.documentElement.style.setProperty('--color-two', secondColor )
    const thirdColor = first.b
    document.documentElement.style.setProperty('--color-three', thirdColor )
    const first2Color= second.r
    document.documentElement.style.setProperty('--color-2one', first2Color )
    const second2Color= second.g
    document.documentElement.style.setProperty('--color-2two', second2Color )
    const third2Color = second.b
    document.documentElement.style.setProperty('--color-2three', third2Color )
    const first3Color= second.r
    document.documentElement.style.setProperty('--color-3one', first3Color )
    const second3Color= second.g
    document.documentElement.style.setProperty('--color-3two', second3Color )
    const third3Color = second.b
    document.documentElement.style.setProperty('--color-3three', third3Color )


   
}
    
    return(
        <div>
            <div>
            <label for="input">Select Color:</label>
            <input onChange ={handleChange} type="color" id ="input" name = "color"  className="color" ></input>
            <label for="input"></label>
            <input type="color" id ="input" name = "color"  className="color" ></input>
            </div>
            <div className="color" id = "color2" >

            </div >
            <div className= "color" id = "color3" >

            </div>
            <div className= "color" id = "color4" >

            </div>
        </div>
        
    )
}

export default ColorGenerator;