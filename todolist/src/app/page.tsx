'use client'

import Link from "next/link";
import styles from "./page.module.scss";
import Task from "@/components/Task/Task";
import { Todo } from "@/type"
import { useEffect, useState } from "react";

export default function Home() {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);

  const getTodos = async (): Promise<Todo[]> => {
    const tasks = await fetch("/api/todos")
      .then((res) => res.json())
      .catch((error) => console.error(error));
      return tasks;
  }
  const fetchData = async () => {
    const allTodos = await getTodos();
    setAllTodos(allTodos);  
  };
  
  useEffect(() => {
    fetchData();
    const intervalFetching = setInterval(fetchData, 200);
      return () => clearInterval(intervalFetching);
  }, []);

  if (allTodos){
    return (
      <main className="container">
        <h1 className="heading"> <span>Just do it</span> list </h1>
        <Link href="/create" className="btn">
          <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512" fill="#456e90"><path d="M23,11H13V1a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1V11H1a1,1,0,0,0-1,1H0a1,1,0,0,0,1,1H11V23a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13H23a1,1,0,0,0,1-1h0A1,1,0,0,0,23,11Z"/></svg>
          Add your goal
        </Link>
        <div className={styles.taskGrid}>
          {allTodos.map((todo) => (
              <Task key={todo.id} {...todo} />
            ))}
        </div>
        { (allTodos.length === 0 && allTodos) && 
        <h1 className={styles.noTodos}>Time to start!</h1>
        }
      </main>
    );
  }  
}
