import { supabase } from '@/lib/supabase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, StateStorage } from 'zustand/middleware'

type UserProfile = {
  id: string
  email: string
  username: string
  btc_amount: number
  btc_address: string
  created_at?: string
}

type AuthState = {
  user: UserProfile | null
  session: any | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  restoreSession: () => Promise<void>
  signUp: (email: string, password: string, username: string) => Promise<void>
  updateUser: (fields: Partial<Pick<UserProfile, 'btc_amount' | 'btc_address'>>) => Promise<void>
}

// Type pour les données persistées
type PersistedAuthState = Pick<AuthState, 'session' | 'user'>

const storage: StateStorage = {
  getItem: async (name) => {
    const value = await AsyncStorage.getItem(name)
    return value ? JSON.parse(value) : null
  },
  setItem: async (name, value) => {
    // Conversion explicite en string
    await AsyncStorage.setItem(name, JSON.stringify(value))
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name)
  },
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isLoading: false,

      signIn: async (email, password) => {
        set({ isLoading: true })
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })
          if (error) throw error

          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.user.id)
            .single()

          if (!userData) throw new Error('User profile not found')

          set({
            user: {
              id: userData.id,
              email: userData.email,
              username: userData.username,
              btc_amount: userData.btc_amount,
              btc_address: userData.btc_address, // Utilisation du nom corrigé
            },
            session: data.session,
            isLoading: false,
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

signUp: async (email, password, username) => {
  set({ isLoading: true })
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    })
    if (error) throw error
    if (!data.user) throw new Error('User creation failed')

    await supabase.from('users').insert({
      id: data.user.id,
      email,
      username,
      btc_amount: 0,
      btc_address: '',
      created_at: new Date().toISOString(),
    })

    await get().restoreSession()
    set({ isLoading: false })
  } catch (error) {
    set({ isLoading: false })
    throw error
  }
},


      updateUser: async (fields) => {
        set({ isLoading: true })
        try {
          const currentUser = get().user
          if (!currentUser) throw new Error('User not authenticated')

          const { error } = await supabase
            .from('users')
            .update(fields)
            .eq('id', currentUser.id)

          if (error) throw error

          set({
            user: {
              ...currentUser,
              ...fields,
            },
            isLoading: false,
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      signOut: async () => {
        set({ isLoading: true })
        try {
          await supabase.auth.signOut()
          set({ user: null, session: null, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

// authStore.ts
restoreSession: async () => {
  set({ isLoading: true })
  try {
    const { data, error } = await supabase.auth.getSession()

    if (error || !data.session) {
      set({ user: null, session: null })
      return
    }

    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.session.user.id)
      .single()

    if (!userData) {
      set({ user: null, session: null })
      return
    }

    set({
      user: {
        id: userData.id,
        email: userData.email,
        username: userData.username,
        btc_amount: userData.btc_amount,
        btc_address: userData.btc_address,
      },
      session: data.session,
    })
  } catch (error) {
    set({ user: null, session: null })
  } finally {
    // ✅ Important : toujours désactiver le chargement
    set({ isLoading: false })
  }
},


   }),
    {
      name: 'auth-storage',
      // @ts-ignore
      storage,
      serialize: (state: any) => JSON.stringify(state), // Sérialisation explicite
      deserialize: (str: string) => JSON.parse(str),      // Désérialisation explicite
      // @ts-expect-error - we only want to persist session and user
      partialize: (state) => ({
        session: state.session,
        user: state.user
      }),
onRehydrateStorage: () => (state) => {
  return {
    ...state,
    isLoading: false,
  }
}

    }
  )
)