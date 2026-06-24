import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { email, password } = await req.json();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Signup error: User already exists', email);
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }
    
    // Dynamic role assignment
    const role = email === 'admin@demo.com' ? 'admin' : 'user';
    
    const user = await User.create({ email, password, role });
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    console.error('Signup exception caught:', error);
    return NextResponse.json({ error: 'Failed to register' }, { status: 400 });
  }
}
