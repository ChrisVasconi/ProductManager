import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Link } from "react-router-dom"

// if the data/information on the page is about one particular item
// i.e: update/details
//you do not need to use .map or .filter <- those are for arrays


const Details = () => {
    const [product, setProduct] = useState()
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(res => {

                setProduct(res.data)
            }
            )
            .catch(err => console.log(err))
    }, [id])

    const removeFromProductList = (deleteId) => {
        axios.delete(`http://localhost:8000/api/products/${deleteId}`)
            .then(res => navigate("/"))
            .catch(err => console.log(err))
    }



    return (
        <div>

            {product ?
                <div>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th> Title</th>
                                <th> Price</th>
                                <th> Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>

                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>

                            </tr>
                        </tbody>
                    </table>
                    <button className="btn btn-danger" onClick={e => removeFromProductList(product._id)}> Delete </button>
                </div> :
                <div></div>

            }

        </div >
    )
}

export default Details