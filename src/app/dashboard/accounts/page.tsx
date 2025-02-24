'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Upload } from 'lucide-react'

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAccounts()
  }, [])

  async function loadAccounts() {
    const { data, error } = await supabase
      .from('accounts')
      .select(`
        *,
        branding_settings(*)
      `)
    if (data) setAccounts(data)
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Linked Accounts</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map(account => (
          <Card key={account.id} className="p-4">
            <h3 className="font-semibold">{account.account_name}</h3>
            <div className="mt-4">
              <h4 className="text-sm font-medium">Branding Settings</h4>
              {/* Branding settings form */}
              <div className="mt-2 space-y-2">
                <Input type="file" accept="image/*" />
                <select className="w-full">
                  <option value="top-left">Top Left</option>
                  <option value="top-right">Top Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-right">Bottom Right</option>
                </select>
                <Button size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Update Branding
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
