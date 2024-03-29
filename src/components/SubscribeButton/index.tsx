import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe.js'
import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string
}
//3 lugares para utilizar secret keys
//getServerSideProps (SSR)
//getStaticProps (SSG)
//API routes
export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()

  async function handleSubscribe() {
    if (!session) {
      signIn('github')

      return
      //criação da checkout session
    }

    if (session.activeSubscription) {
      router.push('/posts')
      return
    }

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({ sessionId })
    } catch (err) {
      alert(err.message)
    }
  }
  return (
    <button
      className={styles.subscribeButton}
      type='button'
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}
