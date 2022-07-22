import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DisplayTable from '../components/DisplayTable'


const Dashboard = () => {
    const [productList, setProductList] = useState([])
    const [refresh, setRefresh] = useState(true)
    //used to update list when an item is deleted from the list

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products`)
            .then(res => { setProductList(res.data) })
            .catch(err => console.log(err))
    }, [refresh])

    const removeFromProductList = (deleteId) => {
        axios.delete(`http://localhost:8000/api/products/${deleteId}`)
            .then(res => setRefresh(!refresh))
            //!refresh === changing refresh from the opposite of what it was true/false
            .catch(err => console.log(err))
    }

    const refreshPage = () => {
        setRefresh(!refresh)
    }


    return (
        <div>
            <DisplayTable productList={productList} updateProductList={removeFromProductList} refreshPage={refreshPage} />

        </div>
    )
}

export default Dashboard;