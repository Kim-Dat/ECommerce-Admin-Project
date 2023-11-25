import React from "react";
import CustomInput from "../components/CustomInput";
const Resetpassword = () => {
    return (
        <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className="text-center">Reset Password</h3>
                <p className="text-center">please enter your new password</p>
                <form action="">
                    <CustomInput type={"password"} i_id={"pass"} label={"New Password"} />
                    <CustomInput type={"password"} i_id={"confirm-password"} label={"Confirm Password"} />
                    <button type="submit" className="btn btn-warning w-100">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Resetpassword;
