import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '../../../firebase/admin';

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization') || req.headers.get('Authorization');
    if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
      return NextResponse.json({ error: 'Missing Authorization Bearer token' }, { status: 401 });
    }
    const idToken = authHeader.split(' ')[1];

    const decoded = await adminAuth.verifyIdToken(idToken);
    const callerUid = decoded.uid;

    // Check caller role in Firestore
    const callerSnap = await adminDb.doc(`users/${callerUid}`).get();
    if (!callerSnap.exists) {
      return NextResponse.json({ error: 'Caller profile not found' }, { status: 403 });
    }
    const callerData = callerSnap.data() as any;
    if (callerData?.rol !== 'Administrador') {
      return NextResponse.json({ error: 'Only Administrador can create users' }, { status: 403 });
    }

    const body = await req.json();
    const { Nombre, Apellido, Rut, email, password, rol } = body || {};

    if (!Nombre || !Apellido || !Rut || !email || !password || !rol) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (rol !== 'Corredor' && rol !== 'Administrador') {
      return NextResponse.json({ error: 'Invalid rol' }, { status: 400 });
    }

    // Create Auth user via Admin SDK (does not affect current session)
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: `${Nombre} ${Apellido}`.trim(),
      disabled: false,
    });

    const newUid = userRecord.uid;
    const profile = {
      uid: newUid,
      Nombre,
      Apellido,
      Rut,
      email,
      rol,
      FechaCreacion: new Date().toISOString(),
      creadoPor: callerUid,
    };

    await adminDb.doc(`users/${newUid}`).set(profile, { merge: true });

    return NextResponse.json({ uid: newUid }, { status: 201 });
  } catch (err: any) {
    console.error('admin/create-user error', err);
    return NextResponse.json({ error: err?.message || 'Internal error' }, { status: 500 });
  }
}
