//@ts-nocheck
export function addMockDataToProduct(mockProduct, products) {
  
    mockProduct.forEach(product => {
      console.log('++++++')
      const productTemplate = {
        "id": products.length,
        "title": product.title,
        "description": "",
        "price": product.price,
        "discountPercentage": 0,
        "rating": 0,
        "stock": 0,
        "brand": product.brand,
        "category": product.category,
        "thumbnail": product.images,
        "images": [ product.images,
        ]
      }
      products.push(productTemplate)
    })
  }
  