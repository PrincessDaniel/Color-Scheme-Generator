const seedColor = document.getElementById("seed-color")
const colorSchemeMode = document.getElementById("color-scheme-mode")
const colorSchemeForm = document.getElementById("color-scheme-form")
const colorSchemeContainer = document.getElementById("color-scheme-container")
const copied = document.getElementById("copied")

colorSchemeForm.addEventListener("submit", function(e) {
    e.preventDefault()
    
    let containerHTML = ""
    
    const seedColorValue = seedColor.value.slice(1)
    
   fetch(`https://www.thecolorapi.com/scheme?hex=${seedColorValue}&mode=${colorSchemeMode.value}&count=5`)
        .then(response => response.json())
        .then(data => {
            const colors = data.colors
            colors.forEach(function(color) {
                containerHTML += `
                    <div class="color-box" data-hex="${color.hex.value}">
                        <div class="color-display" style="background-color: ${color.hex.value}"></div>
                        <p class="color-code">${color.hex.value}</p>
                    </div>
                `
            })
            colorSchemeContainer.innerHTML = containerHTML
        })

    
    // colorSchemeForm.reset()
})

document.addEventListener("click", function(e) {
    const box = e.target.closest(".color-box")
    
    if(!box) {
        return
    }
    else {
        const hex = box.dataset.hex        
        navigator.clipboard.writeText(hex)
            .then(() => {
                copied.hidden = false
                setTimeout(() => copied.hidden = true, 1000)
            })
            .catch(err => console.error("failed to copy"))
    }
})