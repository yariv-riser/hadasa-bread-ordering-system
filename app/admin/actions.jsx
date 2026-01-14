'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const filePath = path.join(process.cwd(), 'data.json');

async function getItems() {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

export async function saveItem(formData) {
  const items = await getItems();
  const id = formData.get('id');
  const name = formData.get('name');
  const price = Number(formData.get('price'));

  if (id) {
    // Update existing
    const index = items.findIndex(item => item.id === id);
    items[index] = {
      ...items[index],
      name,
      price,
      updatedAt: new Date().toISOString()
    };
  } else {
    // Add new
    items.push({
      id: Date.now().toString(),
      name,
      price,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  await fs.writeFile(filePath, JSON.stringify(items, null, 2));
  revalidatePath('/admin');
}

export async function deleteItem(id) {
  const items = await getItems();
  const filtered = items.filter(item => item.id !== id);
  await fs.writeFile(filePath, JSON.stringify(filtered, null, 2));
  revalidatePath('/admin');
}