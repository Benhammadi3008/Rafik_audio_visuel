import React, { useEffect, useState } from "react";
import OrderTab from '../../component/Admin/OrderTab';
import axios from 'axios'

function MainDash() {
    
    return (
        <div class="h-full w-full flex flex-col my-1 " >

            <div className="flex justify-center">
                <div class="w-full h-12 bg-gradient-to-r to-indigo-400 from-red-400 rounded-lg shadow-md sm:mr-2 mr-0 sm:mb-0 mb-4 text-center text-white flex justify-center items-center">
                    <p class="text-2xl mx-2">Mes commandes</p>
                </div>
            </div>
            <div className="my-4 inline-block">
                <OrderTab />
            </div>
        </div >
    )
}
export default MainDash;