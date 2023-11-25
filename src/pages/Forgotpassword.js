import React from 'react'
import CustomInput from "../components/CustomInput";
const Forgotpassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className="text-center">Forgot Password</h3>
                <p className="text-center">please enter your register email to get reset password</p>
                <form action="">
                    <CustomInput type={"text"} i_id={"email"} label={"Email address"} />
                    <button type="submit" className="btn btn-warning w-100" >
                        Send link
                    </button>
                </form>
            </div>
        </div>
  )
}

export default Forgotpassword
