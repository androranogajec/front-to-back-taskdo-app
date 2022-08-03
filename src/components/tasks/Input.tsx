import React from 'react'

function Input(props: any) {
  return (
     <form onSubmit={props.handlePost}>
        <input
          value={props.currentTask}
          //@ts-ignore
          variant="outlined"
          required={true}
          onChange={props.handleInputChange}
          placeholder="Post something"
        />
        <button type="submit">Post</button>
      </form>
  )
}

export default Input