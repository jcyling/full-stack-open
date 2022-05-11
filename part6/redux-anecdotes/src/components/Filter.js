const Filter = () => {
  const handleChange = (event) => {
    const text = event.target.value
    return text
  }

  const style = {
    marginBottom: 10
  }
  return (
    <div style={style}>
      <span>Filter: </span>
      <input 
        type="text"
        onChange={handleChange}
      />
    </div>
  )
}

export default Filter