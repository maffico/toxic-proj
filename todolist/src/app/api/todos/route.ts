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

export async function GET() {
    const todos = await readFile();
    return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        if (!body.title || typeof body.title !== 'string') {
            return NextResponse.json({ error: 'Invalid title' }, { status: 400 });
        }

        const todos = await readFile();
        const newTodo: Todo = {
            id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
            title: body.title,
            descr: body.descr || '',
            completed: body.completed || false,
        };
        
        todos.push(newTodo);
        await fs.writeFile(dataFilePath, JSON.stringify(todos, null, 2));

        return NextResponse.json(newTodo);
    } catch (error) {
        return NextResponse.json(error);
    }
}


