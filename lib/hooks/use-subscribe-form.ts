/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import useSWRMutation from 'swr/mutation'

export type SubscriberFormData = {
  name: string
  email: string
}
async function subscribeFunc(url: string, { arg }: { arg: SubscriberFormData }) {
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ email: arg.email, name: arg.name }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
export function useSubscribeForm() {
  const { trigger, isMutating, error } = useSWRMutation('/api/subscribe', subscribeFunc)

  return {
    trigger,
    error,
    isMutating,
  }
}
