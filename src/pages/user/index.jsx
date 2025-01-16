import Header from "../../components/Header"




const User = () => {

    return (


        <div className="flex flex-col items-center justify-center w-[50sw] p-[5%] sm:p-[10%]">
            
            <Header title="User Information"/>
            <div className="w-full bg-[#434957] flex flex-col sm:flex-row p-8 gap-16">
                
                {/* right section */}
                <div className=" flex flex-col gap-4">
                    <img src="../../assets/imageform.svg" alt="" />
                </div>


                {/* left section */}
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <span className="text-xl">first Name :   </span>
                        <h1 className="text-3xl text-start font-semibold ">User Name</h1>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <span className="text-xl">last name :   </span>
                        <h1 className="text-3xl text-start font-semibold ">User Name</h1>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <span className="text-xl">Role  :   </span>
                        <h1 className="text-3xl text-start font-semibold ">User Name</h1>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <span className="text-xl">country :   </span>
                        <h1 className="text-3xl text-start font-semibold ">User Name</h1>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <span className="text-xl">email :   </span>
                        <h1 className="text-3xl text-start font-semibold ">User Name</h1>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <span className="text-xl">phone :   </span>
                        <h1 className="text-3xl text-start font-semibold ">User Name</h1>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <span className="text-xl">speciality :   </span>
                        <h1 className="text-3xl text-start font-semibold ">User Name</h1>
                    </div>
                </div>
            </div>


        </div>
    )
}


export default User