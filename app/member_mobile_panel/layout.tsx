'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/app/components/Sidebar'

export default function MemberLayout({ children }) {
    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar role="member" />
            <div className="flex-1 ml-64 p-10 font-sans">
                {children}
            </div>
        </div>
    )
}
