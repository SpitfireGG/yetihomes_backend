"use client"
import { useRouter } from 'next/navigation'

const page = () => {

  const route = useRouter()
  return (
    route.push('/auth/login')
  )
}

export default page