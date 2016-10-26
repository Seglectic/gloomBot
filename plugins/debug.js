module.exports = gloom => {

    gloom.addListener('error', msg => {
        console.log(msg)
    })
}
