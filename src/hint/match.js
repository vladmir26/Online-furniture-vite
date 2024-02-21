//@ts-nocheck

/**
 * @typedef mockProduct
 * @prop {number} id
 * @prop {string} title
 * @prop {number} price
 * @prop {string} brand
 * @prop {string} category
 * @prop {string} images
 */

/**
 * Add mock data to main product from API
 * @param {mockProduct} mockProduct 
 * @param {*} products 
 */
export function addMockDataToProduct(mockProduct, products) {
  
    mockProduct.forEach(product => {
      console.log('++++++')
      const productTemplate = {
        "id": product.id,
        "mock": true,
        "title": product.title,
        "description": "",
        "price": product.price,
        "discountPercentage": 0,
        "rating": 0,
        "stock": 0,
        "brand": product.brand,
        "category": product.category,
        "thumbnail": "",
        "images": [ product.images ],
      }
      products.push(productTemplate)
    })
  }
