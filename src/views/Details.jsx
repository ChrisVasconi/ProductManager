import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Navigate, useParams } from 'react-router-dom'
import DisplayTable from '../components/DisplayTable'

const Details = () => {
    const [product, setProduct] = useState()
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http:localhost:8000/api/products/${id}`)
            .then(res => product(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/products/${id}`)
            .then(res => product("/"))
            .catch(err => console.log(err))
    }

    return (
        <div>
            {
                <div>
                    product ?
                    <h1>Title{product.title}</h1>
                    <h1>Price{product.price}</h1>
                    <h1>Description{product.description}</h1>
                    <button onClick={handleDelete}> Delete </button>
                </div>
            }
        </div>
    )
}

export default Details