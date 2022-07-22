import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import { useParams, Navigate, useNavigate } from "react-router-dom"



const DisplayTable = (props) => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")




    const navigate = useNavigate()



    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/products/add', { title, price, description })
            .then(res => props.refreshPage())
            .catch(err => console.log(err))

    }

    const removeFromProductList = (id) => {
        props.updateProductList(id)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label> Title </label>
                    <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div>
                    <label> Price </label>
                    <input type="text" name="price" onChange={(e) => setPrice(e.target.value)} />
                </div>

                <div>
                    <label> Description </label>
                    <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type="submit"> Create </button>

            </form>


            <table>
                <thead>
                    <tr>
                        <th> Title </th>
                        <th> Price </th>
                        <th> Description </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.productList.map((product, i) => {
                            return (
                                <tr>
                                    <td><Link to={`/details/${product._id}`}>{product.title}</Link></td>

                                    <td>{product.price}</td>

                                    <td>{product.description}</td>
                                    <button className="btn btn-danger" onClick={e => removeFromProductList(product._id)}> Delete </button>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div >
    )
}



//value= is for edits
export default DisplayTable