
import './App.css'
import OtpInput from './components/OtpInput'

function App() {
  const hanldeOnSubmit = (otp: any) =>{
    console.log('hanldeOnSubmit', otp)
  };

  return (
    <>
      <OtpInput length={4} onChange={hanldeOnSubmit} />
    </>
  )
}

export default App
