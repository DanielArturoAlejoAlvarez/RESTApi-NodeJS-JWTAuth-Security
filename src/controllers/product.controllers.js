import Product from '../models/Product'

export const getProducts = async (req,res)=>{
    const products = await Product.find()
    return res.json(products)
}

export const getProduct = async (req,res)=>{
    const { idProduct } = req.params
    const product = await Product.findById(idProduct)
    return res.json(product)
}

export const saveProduct = async (req,res)=>{
    const {name,price,stock,category,imgURL,status} = req.body
    const newProduct = new Product({name,price,stock,category,imgURL,status})
    const product = await newProduct.save()

    return res.status(201).json(
        {
            msg: 'Product saved successfully!',
            product
        }
    )
}

export const updateProduct = async (req,res)=>{
    const { idProduct } = req.params
    const updProduct = await Product.findByIdAndUpdate(idProduct, req.body, {new: true})
    return res.status(200).json({
        msg: 'Product updated successfully!',
        product: updProduct
    })
}

export const deleteProduct = async (req,res)=>{
    const { idProduct } = req.params
    await Product.findByIdAndDelete(idProduct)
    return res.status(201).json({
        msg: 'Product deleted successfully!'
    })
}