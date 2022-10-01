import React from "react"
import WithPermission from "../../app/layout/WithPermissions"


const Dashboard = () => {
	return (
		
			<WithPermission roleRequired="ADMIN" message="Only Admin can view this">
				<h1>Dashboard</h1>
			</WithPermission>
	
	)
}

export default Dashboard