import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as zod from 'zod'

import { useSubscribeForm, type SubscriberFormData } from '@/lib/hooks/use-subscribe-form'

import { Button } from './ui/button'
import { Input } from './ui/input'

const scbSchema = zod.object({
  name: zod.string(),
  email: zod.string().email({ message: 'Invalid email address' }),
})

export default function SubscriberForm() {
  const { isMutating, trigger } = useSubscribeForm()

  const { handleSubmit, register } = useForm<zod.infer<typeof scbSchema>>({
    defaultValues: {
      name: '',
      email: '',
    },
    resolver: zodResolver(scbSchema),
  })
  const onSubmit = (data: SubscriberFormData) => {
    trigger(data)
      .then(() => {
        toast.success('Subscribed successfully!')
      })
      .catch(() => {
        console.error('Subscription failed')
      })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-20 w-full bg-[#DAF3F4] p-8 font-[Manrope]"
    >
      <p className="text-2xl text-[#202222]">Get latest updates from Ai+Di</p>
      <p className="mt-1 text-lg text-[#525757]">
        Our email packed with AI, humanity, and conscious living insights and case studies
      </p>
      <Input
        placeholder="*Your name here*"
        className="ring-none focus-visible:ring-none mt-4 h-16 text-[#202222]"
        {...register('name')}
      />
      <Input
        type="email"
        placeholder="*Your email here*"
        className="ring-none focus-visible:ring-none mt-4 h-16 text-[#202222]"
        {...register('email')}
      />
      <Button
        disabled={isMutating}
        type="submit"
        className="mt-4 h-16 w-full bg-[#C7C3C3] text-white hover:bg-[#00C8B3]"
      >
        Submit
      </Button>
    </form>
  )
}
