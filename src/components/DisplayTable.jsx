import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import { useParams, Navigate, useNavigate } from "react-router-dom"



const DisplayTable = (props) => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    const { id } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(res => {
                const product = res.data
                setTitle(product.title)
                setPrice(product.price)
                setDescription(product.description)
            })
            .catch(err => console.log(err))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/products/add', { title, price, description })
            .then(res => Navigate("/dashboard"))
            .catch(err => console.log(err))
    }

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/products/${id}`)
            .then(res => Navigate("/"))
            .catch(err => console.log(err))
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
                                    <td><Link to={`/product/${id}`}>{product.title}</Link></td>

                                    <td>{product.price}</td>

                                    <td>{product.description}</td>
                                    <button onClick={handleDelete}> Delete </button>
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