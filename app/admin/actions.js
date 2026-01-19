'use server';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function saveItem(formData) {
  const id = formData.get('id');
  const name = formData.get('name');
  const price = Number(formData.get('price'));

  if (id) {
    await supabase.from('products').update({ name, price }).eq('id', id);
  } else {
    await supabase.from('products').insert([{ name, price }]);
  }

  revalidatePath('/admin');
  revalidatePath('/');
}

export async function deleteItem(id) {
  await supabase.from('products').delete().eq('id', id);
  revalidatePath('/admin');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/login');
}