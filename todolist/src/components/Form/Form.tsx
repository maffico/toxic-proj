'use client'

import React from 'react'

import { useState, useEffect } from "react";
import Link from 'next/link'
import styles from "./Form.module.scss"
import DeleteBtn from '@/components/DeleteBtn/DeleteBtn'
import { Todo } from "@/type";
import { useRouter } from "next/navigation";


const Form = (props: {
    isEdit: boolean;
    todoId: number;
}) => { 
    const [isCompleted, setIsCompleted] = useState(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [textareaValue, setTextareaValue] = useState<string>("");
    const [todo, setTodo] = useState<Todo[]>([]);
    const router = useRouter()
    
    const clearInput = () => {
        setInputValue("");
        setTextareaValue("");
    }

useEffect(() => {
    if (props.isEdit && props.todoId !== null) {

        const fetchTodo = async () => {
        try {
          const response = await fetch(`/api/todos/${props.todoId}`);
          const todo = await response.json();
          setTodo(todo);
          setIsCompleted(todo.completed);
        } catch (error) {
          console.error(error);
        }
      };

      fetchTodo();

    }
  }, [props.todoId]);
  

    const addOrEditTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const newTodo = {
            title: props.isEdit ? todo?.title || '' : inputValue,
            descr: props.isEdit ? todo?.descr || '' : textareaValue || '',
            completed: isCompleted,
        };

        try {
            const url = props.isEdit ? `/api/todos/${props.todoId}` : '/api/todos'
            const method = props.isEdit ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method: method,
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(newTodo),
            });
        
            if (response.ok) {
                router.push("/");
                clearInput()
            } else {
                console.error("Cannot save data");
            }
            } catch (error) {
            console.error(error);
            }
        };

  return (
    <main className={`container ${styles.edit}`}>
        <div>
            <Link onClick={clearInput} className={`btn ${styles.backBtn}`} href="/">
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512" fill="#456e90"><path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z"/></svg>
                Back
            </Link>
            <h1 className="heading">{props.isEdit ? 'Editing' : 'Creating'}</h1>
        </div>
        <form className={styles.form} 
        onSubmit={(e) => addOrEditTodo(e)}
        >
            <div className={styles.formInputs}>
                <span>Title</span>
                <input 
                    type="text" placeholder="What is your goal?" required 
                    value={props.isEdit ? todo?.title || '' : inputValue} 
                    onChange={(e) => props.isEdit ? setTodo((prev) => ({ ...prev!, title: e.target.value })) : setInputValue(e.target.value)} 
                />
            </div>
            <div className={styles.formInputs}>
                <span>Description</span>
                <textarea 
                    placeholder="Enter description here" rows ="10" cols="50"
                    value={props.isEdit ? todo?.descr || '' : textareaValue}
                    onChange={(e) => props.isEdit ? setTodo((prev) => ({ ...prev!, descr: e.target.value })) : setTextareaValue(e.target.value)} 
                ></textarea>
            </div>
            <div className={styles.formBtns}>
                <a onClick={() => setIsCompleted((prev) => !prev)} className={styles.statusBtn} href='#'>
                    <div id="firstTick" className={`${isCompleted ? styles.ticked : ''} ${styles.tick}`}>
                        <div className={styles.tickBox}>
                            <svg className={styles.tickMark} xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="512" height="512" fill="white"><path d="M7.8,21.425A2.542,2.542,0,0,1,6,20.679L.439,15.121,2.561,13,7.8,18.239,21.439,4.6l2.122,2.121L9.6,20.679A2.542,2.542,0,0,1,7.8,21.425Z"/></svg>
                        </div>
                    </div>
                    I archieved it!
                </a>
                <div>
                    {props.isEdit && <DeleteBtn todoId={props.todoId} editPage={true} />}
                    <Link onClick={clearInput} href="/" className="btn">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512" fill="#456e90"><path d="M16,8a1,1,0,0,0-1.414,0L12,10.586,9.414,8A1,1,0,0,0,8,9.414L10.586,12,8,14.586A1,1,0,0,0,9.414,16L12,13.414,14.586,16A1,1,0,0,0,16,14.586L13.414,12,16,9.414A1,1,0,0,0,16,8Z"/><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"/></svg>
                        Cancel
                    </Link>
                    <button type="submit" className={`btn ${styles.formSubmit}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="512" height="512" fill="#456e90"><path d="M7.8,21.425A2.542,2.542,0,0,1,6,20.679L.439,15.121,2.561,13,7.8,18.239,21.439,4.6l2.122,2.121L9.6,20.679A2.542,2.542,0,0,1,7.8,21.425Z"/></svg>
                        Save
                    </button>
                </div>
            </div>
        </form>
    </main>
  )
}

export default Form