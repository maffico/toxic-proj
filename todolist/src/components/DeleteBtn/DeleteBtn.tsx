'use client'

import React from 'react'
import styles from "./DeleteBtn.module.scss"
import { useRouter } from "next/navigation"

const DeleteBtn = (props: {
  todoId: number,
  editPage: boolean
}) => {
  const router = useRouter()

  const deleteTodo = async () => {
    try {
      const response = await fetch(`/api/todos/${props.todoId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        if(props.editPage){
          router.push('/')
        // } else{
        //   window.location.reload()
        }
      } else {
        console.error('Failed to delete the todo');
      }
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <button onClick={deleteTodo} className={`btn ${styles.delBtn}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512" fill="#456e90"><g id="_01_align_center" data-name="01 align center"><path d="M22,4H17V2a2,2,0,0,0-2-2H9A2,2,0,0,0,7,2V4H2V6H4V21a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V6h2ZM9,2h6V4H9Zm9,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V6H18Z"/><rect x="9" y="10" width="2" height="8"/><rect x="13" y="10" width="2" height="8"/></g></svg>
        Delete
    </button>
  )
}

export default DeleteBtn