'use client'

import { useEffect, useState } from 'react'
import { videoQueue } from '@/lib/queue'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function ProcessingPage() {
  const [jobs, setJobs] = useState([])
  
  useEffect(() => {
    const fetchJobs = async () => {
      const active = await videoQueue.getActive()
      const waiting = await videoQueue.getWaiting()
      const completed = await videoQueue.getCompleted()
      
      setJobs([...active, ...waiting, ...completed])
    }
    
    fetchJobs()
    const interval = setInterval(fetchJobs, 5000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Processing Queue</h1>
      <div className="grid gap-4">
        {jobs.map(job => (
          <Card key={job.id} className="p-4">
            <div className="flex justify-between items-center">
              <h3>Job #{job.id}</h3>
              <span className="capitalize">{job.status}</span>
            </div>
            <Progress value={job.progress} className="mt-2" />
          </Card>
        ))}
      </div>
    </div>
  )
}
