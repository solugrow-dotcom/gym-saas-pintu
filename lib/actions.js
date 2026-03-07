import { supabase } from './supabase'

/**
 * Gym & User Actions
 */

export async function createGym({ name, ownerId }) {
    const { data: gym, error } = await supabase
        .from('gyms')
        .insert([{ name, owner_id: ownerId }])
        .select()
        .single()

    if (error) throw error

    // Link owner to the gym
    await supabase
        .from('users')
        .update({ gym_id: gym.id, role: 'gym_admin' })
        .eq('id', ownerId)

    return gym
}

export async function getUserProfile(userId) {
    const { data, error } = await supabase
        .from('users')
        .select('*, gyms(name)')
        .eq('id', userId)
        .single()
    if (error) throw error
    return data
}

/**
 * Member Management Actions
 */

export async function addMember({ gymId, name, phone, email, membershipPlan }) {
    const { data, error } = await supabase
        .from('members')
        .insert([{
            gym_id: gymId,
            name,
            phone,
            email,
            membership_plan: membershipPlan,
            status: 'active'
        }])
        .select()
        .single()

    if (error) throw error
    return data
}

export async function updateMember(id, updates) {
    const { data, error } = await supabase
        .from('members')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

    if (error) throw error
    return data
}

export async function deleteMember(id) {
    const { error } = await supabase
        .from('members')
        .delete()
        .eq('id', id)

    if (error) throw error
    return true
}

/**
 * Attendance & Payments Actions
 */

export async function recordAttendance({ memberId, gymId, status = 'present' }) {
    const { data, error } = await supabase
        .from('attendance')
        .insert([{ member_id: memberId, gym_id: gymId, status }])
        .select()
        .single()

    if (error) throw error
    return data
}

export async function recordPayment({ memberId, gymId, amount, method = 'cash' }) {
    const { data, error } = await supabase
        .from('payments')
        .insert([{ member_id: memberId, gym_id: gymId, amount, method }])
        .select()
        .single()

    if (error) throw error
    return data
}
/**
 * Subscription Actions
 */

export async function createSubscription({ gymId, plan, method = 'upi' }) {
    const { data, error } = await supabase
        .from('subscriptions')
        .insert([{
            gym_id: gymId,
            plan,
            status: 'pending',
            payment_method: method
        }])
        .select()
        .single()

    if (error) throw error
    return data
}

export async function activateSubscription(gymId, plan) {
    const startDate = new Date()
    const expiryDate = new Date()
    expiryDate.setMonth(startDate.getMonth() + 1) // 1 month subscription

    const { data, error } = await supabase
        .from('subscriptions')
        .update({
            status: 'active',
            start_date: startDate.toISOString().split('T')[0],
            expiry_date: expiryDate.toISOString().split('T')[0]
        })
        .eq('gym_id', gymId)
        .eq('status', 'pending')
        .select()
        .single()

    if (error) throw error
    return data
}

export async function getSubscription(gymId) {
    const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('gym_id', gymId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

    // If no row found, return null instead of throwing for easier check
    if (error && error.code === 'PGRST116') return null
    if (error) throw error
    return data
}
