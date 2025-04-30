import { Outlet } from 'react-router-dom'
import HeaderBar from './components/HeaderBar'
const App = () => {
  return (
    <div className='bg-white shadow-md rounded-lg'>
      <HeaderBar />
      <div className='py-10'>
        <Outlet />
      </div>
    </div >

  )
}

export default App