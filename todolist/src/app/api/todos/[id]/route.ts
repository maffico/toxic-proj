import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { Todo } from "@/type"   

const dataFilePath = path.join(process.cwd(), "src", "data", "todos.json");

async function readFile() {
    try {
        const fileContent = await fs.readFile(dataFilePath, 'utf-8');
        const todos: Todo[] = JSON.parse(fileContent);
        return todos;
    } catch (error) {
        console.error(error);
        throw new Error('Unable to read todos file.');
    }
}

async function writeFile(todos: Todo[]): Promise<void> {
    try {
      await fs.writeFile(dataFilePath, JSON.stringify(todos, null, 2), 'utf-8');
    } catch (error) {
      console.error(error);
      throw new Error('Unable to write todos file.');
    }
  }

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const todos = await readFile();
      const id = parseInt(params.id, 10);

      const todoById = todos.find((todo) => todo.id === id);
  
      if (todoById) {
        return NextResponse.json(todoById);
      } else {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 });
      }
    } catch (error) {
      console.error('Error fetching task:', error);
      return NextResponse.json(error);
    }
  }

  export async function DELETE(request: NextRequest) {
    const { pathname } = new URL(request.url);
    const id = parseInt(pathname.split('/').pop() || '', 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }
  
    try {
      const todos = await readFile();
      const updatedTodos = todos.filter(todo => todo.id !== id);
  
      if (todos.length === updatedTodos.length) {
        return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
      }
  
      await writeFile(updatedTodos);
      return NextResponse.json(updatedTodos);
    } catch (error) {
      return NextResponse.json(error);
    }
  }

  export async function PUT(request: NextRequest) {
    try {
      const { pathname } = new URL(request.url);
      const id = parseInt(pathname.split('/').pop() || '', 10);
      
      if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
      }
  
      const updatedData = await request.json();
      const todos = await readFile();
      const index = todos.findIndex((todo) => todo.id === id);
      
      if (index === -1) {
        return NextResponse.json({ error: 'Todo is not found' }, { status: 404 });
      }
      todos[index] = { ...todos[index], ...updatedData };
  
      await writeFile(todos);
      
      return NextResponse.json(todos[index]);
    } catch (error) {
      console.error(error);
      return NextResponse.json(error);
    }
  }