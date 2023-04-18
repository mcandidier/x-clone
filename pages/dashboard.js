  
import React from 'react'
import {withAuthAndPermission} from '../components/Auth';


function Dashboard() {
  return (
    <div>dashboard</div>
  )
}

export default withAuthAndPermission(Dashboard, ['view-dashboard']);
