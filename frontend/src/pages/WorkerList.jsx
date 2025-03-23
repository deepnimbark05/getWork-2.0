import React from 'react'
import Header from '../components/Header'
import WorkerCard from '../components/WorkerCard'
const WorkerList = () => {
  return (
    <div class='bg-amber-500  p-2'>
        <Header/>
        <div class="m-4 flex flex items-center justify-between">
          <div class=""> 
            <button class="bg-blue-600 text-white font-bold py-2 px-4 rounded">Sort by</button>
          </div>
          <div class="font-bold text-gray-700">
            1927 results
          </div>
        </div>
        <hr className="border-t-2 border-white my-4" />
        <div class=" flex justify-center place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <WorkerCard/>
        <WorkerCard/>
        <WorkerCard/>
        <WorkerCard/>
        <WorkerCard/>
        <WorkerCard/>
        <WorkerCard/>
        <WorkerCard/>
        <WorkerCard/>
        <WorkerCard/>
        <WorkerCard/>
        </div>

        



    </div>
  )
}

export default WorkerList