export async function requestProducts() {
    return await fetch('https://dummyjson.com/products')
    .then((res) => res.json())
    .then((res) => {
      console.log('fetch request from Catalog-product')
      return res.products;
    })
    .catch(console.log);
}


export async function requestProductNext(counter, limit) {
    return await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${counter * limit}`)
    .then((res) => res.json())
    .then((res) => {
        return res
    })
    .catch(console.log);
}