"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

/**
 * Perfil de usuario completo con información de Firestore
 */
export interface UserProfile {
  uid: string;
  email: string;
  Nombre: string;
  Apellido: string;
  Rut: string;
  rol: 'Corredor' | 'Administrador';
  FechaCreacion?: Date;
}

/**
 * Context de autenticación
 */
interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  error: null,
});

/**
 * Hook para acceder al contexto de autenticación
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}

/**
 * Provider de autenticación
 * Maneja el estado de autenticación y carga el perfil del usuario desde Firestore
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        setError(null);
        
        if (firebaseUser) {
          // Usuario autenticado, cargar perfil desde Firestore
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const profile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || userData.email,
              Nombre: userData.Nombre,
              Apellido: userData.Apellido,
              Rut: userData.Rut,
              rol: userData.rol,
              FechaCreacion: userData.FechaCreacion?.toDate(),
            };
            
            setUserProfile(profile);
            setUser(firebaseUser);
            console.log('[AUTH SUCCESS] Usuario autenticado:', profile.email, '| Rol:', profile.rol);
          } else {
            console.error('[AUTH ERROR] Perfil de usuario no encontrado en Firestore');
            setError('Perfil de usuario no encontrado');
            setUserProfile(null);
            setUser(null);
          }
        } else {
          // Usuario no autenticado
          setUser(null);
          setUserProfile(null);
          console.log('[AUTH] Usuario no autenticado');
        }
      } catch (err) {
        console.error('Error cargando perfil de usuario:', err);
        setError('Error al cargar el perfil');
        setUserProfile(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}
