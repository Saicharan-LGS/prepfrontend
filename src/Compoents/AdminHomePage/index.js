import ProductList from '../adminOrders'
import AdminOrdersRejected from './AdminOrdersRejected'

import {Component} from 'react'

const tabList=[
    {
        id:"0",
        name:"ProductList",

    },
    {
        id:"1",
        name:"ProductList1"
    },
    {
        id:"2",
        name:"ProductList2"
    }
]



class AdminHomePage extends Component{

    state={
        activeProductTab:tabList[0].id
    }

    onClickChangeActiveTab=(e)=>{
        console.log(e.target.value)
        this.setState({activeProductTab:e.target.key})
    }

    render(){
        const {activeProductTab} = this.state
        return(
            <>
            <div>
                <h1>Orders</h1>
                {tabList.map(eachProduct=>(
                    <li key={eachProduct.id} value={eachProduct.id} onClick={this.onClickChangeActiveTab}>{eachProduct.name}</li>
                ))}
            </div>
            <div>
              { activeProductTab==="0" && <ProductList/> }
              {activeProductTab==="1" && <AdminOrdersRejected/>}

            </div>
            </>
        )
    }
}
export default AdminHomePage