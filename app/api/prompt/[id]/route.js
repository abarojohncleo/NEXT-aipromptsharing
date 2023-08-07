import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";

// GET
export const GET = async (request, {params}) => {
  console.log('params on get prompt', params)
  try {
    if (!params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return new Response('Item not found', {status: 400})
    }

    await connectToDb();

    const prompt = await Prompt.findById(params.id).populate('creator');
    if(!prompt) {
      return new Response('Prompt not found', {status:404})
    }

    return new Response(JSON.stringify(prompt), {status: 200})
  } catch (error) {
    return new Response(`Failed to fetch prompts: ${error}`, {status: 500})
  }
}

// Update 
export const PUT = async(request, {params}) => {
  const {prompt, tag} = await request.json();
  try {
    if (!params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return new Response('Item not found', {status: 400})
    }

    await connectToDb();
    const existingPrompt = await  Prompt.findById(params.id)
    if(!existingPrompt) {
      return new Response("Prompt not found", {status:404})
    }

    existingPrompt.prompt = prompt 
    existingPrompt.tag = tag

    await existingPrompt.save()

    return new Response(JSON.stringify(existingPrompt), {status:200})
  } catch (error) {
    return new Response('Failed to updated prompt', {status:500})
  }
}

// DELETE
export const DELETE = async(request, {params}) => {
  try {
    if (!params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return new Response('Item not found', {status: 400})
    }
    await connectToDb();
    await Prompt.findByIdAndRemove(params.id)

    return new Response('Prompt deleted', {status:200})
  } catch (error) {
    return new Response('Failed to delete prompt', {status:500})
  }
}