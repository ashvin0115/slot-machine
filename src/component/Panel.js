const Panel = (props) => {

  return (
    <>
      <div className='flex items-center justify-around py-10 border mb-10'>
        {
          props.panel.map((item, index) => <button key={index} className='border border-[#000] w-[100px] rounded-sm'>{item}</button>)
        }
      </div>
    </>
  )
}

export default Panel;