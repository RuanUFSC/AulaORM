const verifyFields = (body, requiredFields) => {
    for (const field of requiredFields) {
        if (!body?.[field]) {
            throw `Field ${field} is required`
        }
    }
    return true
}

export { verifyFields }