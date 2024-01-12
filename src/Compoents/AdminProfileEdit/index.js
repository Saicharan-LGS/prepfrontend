import { ImCancelCircle } from 'react-icons/im'


function AdminProfileEdit({onClose}){


    

    return(
        <>
        <ImCancelCircle onClick={onClose} style={{fontSize:"24px", color:"#212d45",cursor:"pointer",marginBottom:"10px"}}/>

        <div className="customer-profile-edit-main-container">
            <div className="customer-profile-edit-sub-container">
                <h1 className="customer-profile-edit-heading">Update Profile</h1>
            <div className="customer-profile-edit-input-container">
                <label className="customer-profile-edit-name">Name</label>
                <input type="text" name="name" className="customer-profile-edit-input-field" placeholder="Enter your Name"/>
            </div>
            <div className="customer-profile-edit-input-container">
                <label className="customer-profile-edit-name">Mobile No</label>
                <input type="number" name="number" className="customer-profile-edit-input-field" placeholder='Enter Mobile Number'/>
            </div>
            <div className="customer-profile-edit-input-container">
                <label className="customer-profile-edit-name">Address</label>
                <input type="text" name="address" className="customer-profile-edit-input-field" placeholder='Enter your Address'/>
            </div>
            <div className="customer-profile-edit-input-container">
                <label className="customer-profile-edit-name">Profile Pic</label>
                <input type="file" className="customer-profile-edit-file"/>
            </div>
            <button className="customer-profile-edit-button">Update</button>
            </div>
        </div>
        </>
    )
}
export default AdminProfileEdit