import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DisplayTable from '../components/DisplayTable'


const Dashboard = () => {
    const [productList, setProductList] = useState([])
    const [refresh, setRefresh] = useState(true)
    useEffect(() => {
        axios.get(`http://localhost:8000/api/products`)
            .then(res => {

                // console.log(res)
                setProductList(res.data)
            })
            .catch(err => console.log(err))
    }, [refresh, productList])

    const removeFromProductList = (deleteId) => {
        const filteredList = productList.filter((eachProduct, i) => {
            return (
                eachProduct._id == deleteId
            )
        })
        setProductList(filteredList)
    }



    return (
        <div>
            <DisplayTable productList={productList} updateProductList={removeFromProductList} />
        </div>
    )
}

export default Dashboard;