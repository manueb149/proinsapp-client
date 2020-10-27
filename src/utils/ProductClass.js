class ProductClass {
    constructor(name, category_id, brand_id, price, description, user_id, id){
        this[id]= {
            name: name,
            category: category_id,
            brand: brand_id,
            price: price,
            description: description,
            user: user_id
        }
    }
}

module.exports = { ProductClass}