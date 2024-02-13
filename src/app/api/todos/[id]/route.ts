import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import * as yup from 'yup';
interface Segments {
  params: { id: string }
}

export async function GET(request: Request, {params }: Segments) {
  const {id} = params ?? ''
  const todo = await prisma.todo.findUnique({ where: { id }})

  if(!todo) return NextResponse.json({message: `No existe la tarea Nº ${id}`}, {status : 404});
  return NextResponse.json(todo);
}


const putSchema = yup.object({
  completed: yup.boolean().optional(),
  description: yup.string().optional(),
})
export async function PUT(request: Request, {params }: Segments) {
  const {id} = params ?? ''
  const todo = await prisma.todo.findUnique({ where: { id }})

  if(!todo) return NextResponse.json({message: `No existe la tarea Nº ${id}`}, {status : 404});

  try {
    const { completed, description } = await putSchema.validate( await request.json() );
    const updatedTodo = await prisma.todo.update({
      where: {id},
      data: { completed, description}
    })
    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, {status: 400});
  }
}